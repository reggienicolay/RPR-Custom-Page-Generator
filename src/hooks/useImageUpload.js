// hooks/useImageUpload.js
import React, { useRef, useEffect } from 'react';

export const useImageUpload = (selectedCategory, currentCategory, testimonials, setTestimonials, setImages, FIELD_DEFINITIONS) => {
  const fileInputRefs = useRef({});

  // Create and manage file input refs for image fields
  useEffect(() => {
    // Guard against undefined currentCategory
    if (!currentCategory) return;
    
    const imageFields = currentCategory.fields?.filter(field => 
      FIELD_DEFINITIONS[field]?.type === 'image' || FIELD_DEFINITIONS[field]?.type === 'multiple-images'
    ) || [];
    
    // Start with existing refs to preserve them
    const newRefs = { ...fileInputRefs.current };
    
    // Regular image fields (company logo, agent photo, etc.)
    imageFields.forEach(field => {
      if (!newRefs[field]) {
        newRefs[field] = React.createRef();
      }
    });
    
    // Testimonial image fields (dynamic based on testimonial count)
    if (selectedCategory === 'testimonials' && testimonials) {
      testimonials.forEach((_, index) => {
        [`clientPhoto_${index}`, `propertyImage_${index}`].forEach(field => {
          if (!newRefs[field]) {
            newRefs[field] = React.createRef();
          }
        });
      });
    }
    
    fileInputRefs.current = newRefs;
  }, [selectedCategory, currentCategory, testimonials, FIELD_DEFINITIONS]);

  const handleImageUpload = (type, event) => {
    const file = event?.target?.files && event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      
      // Check if this is a testimonial image
      if (type.startsWith('clientPhoto_') || type.startsWith('propertyImage_')) {
        const [imageType, indexStr] = type.split('_');
        const index = parseInt(indexStr);
        const field = imageType === 'clientPhoto' ? 'clientPhoto' : 'propertyImage';
        
        // Update the testimonial data directly
        setTestimonials(prev => prev.map((testimonial, i) => 
          i === index ? { ...testimonial, [field]: dataURL } : testimonial
        ));
      } else {
        // Regular image upload (company logo, agent photo, etc.)
        setImages(prev => ({ ...prev, [type]: dataURL }));
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (type) => {
    // Check if this is a testimonial image
    if (type.startsWith('clientPhoto_') || type.startsWith('propertyImage_')) {
      const [imageType, indexStr] = type.split('_');
      const index = parseInt(indexStr);
      const field = imageType === 'clientPhoto' ? 'clientPhoto' : 'propertyImage';
      
      // Clear the testimonial image
      setTestimonials(prev => prev.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: null } : testimonial
      ));
    } else {
      // Regular image clear
      setImages(prev => ({ ...prev, [type]: null }));
    }
    
    // Clear the file input
    if (fileInputRefs.current[type]?.current) {
      fileInputRefs.current[type].current.value = '';
    }
  };

  return {
    fileInputRefs,
    handleImageUpload,
    clearImage
  };
};