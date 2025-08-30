import React, { useState, useRef } from 'react';
import { Plus, Trash2, Star, Upload, X } from 'lucide-react';

// Reusable upload-with-thumbnail control (copied from main component)
function UploadThumb({ label, imageSrc, onPick, onClear, fileRef, onChange, aspectRatio = 1 }) {
  const hasImage = !!imageSrc;
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-14 rounded-lg border ${hasImage ? 'border-gray-300' : 'border-dashed border-gray-300'} bg-gray-50 overflow-hidden flex items-center justify-center`}
        style={{ height: `${56 / aspectRatio}px` }}
      >
        {hasImage ? (
          <img src={imageSrc} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <Upload className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <button
        type="button"
        onClick={onPick}
        className={`flex-1 p-3 border-2 ${hasImage ? 'border-gray-200' : 'border-dashed border-gray-300'} rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center space-x-2 bg-gray-50`}
      >
        <Upload className="w-4 h-4 text-gray-500" />
        <span className="text-gray-700">{label}</span>
      </button>
      {hasImage && (
        <button
          type="button"
          onClick={onClear}
          className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
          aria-label="Remove image"
          title="Remove"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  );
}

const TestimonialBuilder = ({ 
  testimonials, 
  onTestimonialsChange, 
  fileInputRefs, 
  onImageUpload, 
  onImageClear 
}) => {
  // Create a default testimonial structure
  const createEmptyTestimonial = () => ({
    id: Date.now() + Math.random(), // Unique ID for React keys
    clientName: '',
    clientLocation: '',
    testimonialText: '',
    propertyType: '',
    saleDate: '',
    rating: '5',
    clientPhoto: null,
    propertyImage: null
  });

  const addTestimonial = () => {
    const newTestimonial = createEmptyTestimonial();
    onTestimonialsChange([...testimonials, newTestimonial]);
  };

  const removeTestimonial = (index) => {
    if (testimonials.length > 1) {
      const updated = testimonials.filter((_, i) => i !== index);
      onTestimonialsChange(updated);
    }
  };

  const updateTestimonial = (index, field, value) => {
    const updated = testimonials.map((testimonial, i) => 
      i === index ? { ...testimonial, [field]: value } : testimonial
    );
    onTestimonialsChange(updated);
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star.toString())}
            className={`p-1 rounded transition-colors ${
              parseInt(rating) >= star 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Client Testimonials ({testimonials.length})
        </h3>
        <button
          type="button"
          onClick={addTestimonial}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id || index}
          className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
        >
          {/* Testimonial Header */}
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              Testimonial #{index + 1}
            </h4>
            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() => removeTestimonial(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                type="text"
                placeholder="Sarah Johnson"
                value={testimonial.clientName}
                onChange={(e) => updateTestimonial(index, 'clientName', e.target.value)}
                className="form-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Location
              </label>
              <input
                type="text"
                placeholder="Phoenix, AZ"
                value={testimonial.clientLocation}
                onChange={(e) => updateTestimonial(index, 'clientLocation', e.target.value)}
                className="form-input w-full"
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Testimonial Text
            </label>
            <textarea
              placeholder="Working with [Agent] was an amazing experience..."
              value={testimonial.testimonialText}
              onChange={(e) => updateTestimonial(index, 'testimonialText', e.target.value)}
              className="form-input w-full min-h-[100px] resize-y"
              rows={4}
            />
          </div>

          {/* Property Details and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                value={testimonial.propertyType}
                onChange={(e) => updateTestimonial(index, 'propertyType', e.target.value)}
                className="form-input w-full"
              >
                <option value="">Select type</option>
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Multi-Family">Multi-Family</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Date
              </label>
              <input
                type="date"
                value={testimonial.saleDate}
                onChange={(e) => updateTestimonial(index, 'saleDate', e.target.value)}
                className="form-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <StarRating
                rating={testimonial.rating}
                onRatingChange={(rating) => updateTestimonial(index, 'rating', rating)}
              />
            </div>
          </div>

          {/* Images - DEBUG AND FIXED SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Photo
              </label>
              {/* Debug info - remove this after testing */}
              <div className="text-xs text-gray-500 mb-1">
                Debug: clientPhoto_{index} ref exists: {fileInputRefs.current[`clientPhoto_${index}`] ? 'Yes' : 'No'}
              </div>
              <UploadThumb
                label={testimonial.clientPhoto ? 'Change Client Photo' : 'Upload Client Photo'}
                imageSrc={testimonial.clientPhoto}
                onPick={() => {
                  const ref = fileInputRefs.current[`clientPhoto_${index}`];
                  console.log(`Clicking clientPhoto_${index}:`, ref);
                  if (ref?.current) {
                    ref.current.click();
                  } else {
                    console.error(`No ref found for clientPhoto_${index}`);
                  }
                }}
                onClear={() => {
                  updateTestimonial(index, 'clientPhoto', null);
                  onImageClear(`clientPhoto_${index}`);
                }}
                fileRef={fileInputRefs.current[`clientPhoto_${index}`]}
                onChange={(e) => {
                  console.log(`Upload triggered for clientPhoto_${index}:`, e.target.files[0]);
                  onImageUpload(`clientPhoto_${index}`, e);
                }}
                aspectRatio={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Image
              </label>
              {/* Debug info - remove this after testing */}
              <div className="text-xs text-gray-500 mb-1">
                Debug: propertyImage_{index} ref exists: {fileInputRefs.current[`propertyImage_${index}`] ? 'Yes' : 'No'}
              </div>
              <UploadThumb
                label={testimonial.propertyImage ? 'Change Property Image' : 'Upload Property Image'}
                imageSrc={testimonial.propertyImage}
                onPick={() => {
                  const ref = fileInputRefs.current[`propertyImage_${index}`];
                  console.log(`Clicking propertyImage_${index}:`, ref);
                  if (ref?.current) {
                    ref.current.click();
                  } else {
                    console.error(`No ref found for propertyImage_${index}`);
                  }
                }}
                onClear={() => {
                  updateTestimonial(index, 'propertyImage', null);
                  onImageClear(`propertyImage_${index}`);
                }}
                fileRef={fileInputRefs.current[`propertyImage_${index}`]}
                onChange={(e) => {
                  console.log(`Upload triggered for propertyImage_${index}:`, e.target.files[0]);
                  onImageUpload(`propertyImage_${index}`, e);
                }}
                aspectRatio={1.5}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Helper Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Add multiple testimonials to create a comprehensive social proof page. 
          Different templates work better with different numbers of testimonials:
        </p>
        <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
          <li><strong>Featured:</strong> 1 testimonial with maximum impact</li>
          <li><strong>Cards:</strong> 2-3 testimonials in card layout</li>
          <li><strong>Grid:</strong> 4+ testimonials in organized grid</li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialBuilder;