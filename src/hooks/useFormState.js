// hooks/useFormState.js
import { useState } from 'react';

export const useFormState = () => {
  // Dynamic form data - stores all possible fields
  const [formData, setFormData] = useState({
    // Initialize with test data for development
    reportDate: new Date().toISOString().split('T')[0],
    reportType: 'Market Activity Report',
    agentTitle: 'REALTOR®',
    agentName: 'John Smith',
    agentPhone: '(555) 123-4567',
    agentEmail: 'john@metroerealty.com',
    licenseNumber: '12345678',
    companyName: 'Metro Realty Group',
    propertyAddress: '123 Maple Street, Phoenix, AZ 85001',
    price: '$450,000',
    bedrooms: '3',
    bathrooms: '2.5',
    sqft: '2,100',
    lotSize: '0.25 acres',
    yearBuilt: '2015',
    propertyType: 'Single Family',
    agentBio: 'With over 10 years of experience in the Phoenix real estate market, I specialize in helping families find their perfect home. My commitment to exceptional service and deep market knowledge has made me a trusted advisor to hundreds of satisfied clients.',
    agentExperience: '10',
    agentSpecialties: 'Luxury homes, first-time buyers, investment properties',
    agentAwards: 'Top Producer 2023, Million Dollar Club, Five Star Professional Award'
  });

  // Image state - dynamic based on category needs
  const [images, setImages] = useState({});
  
  // Background state
  const [selectedBackground, setSelectedBackground] = useState(null);
  
  // Testimonials state - pre-filled with test data
  const [testimonials, setTestimonials] = useState([
    {
      id: Date.now(),
      clientName: 'Sarah Johnson',
      clientLocation: 'Phoenix, AZ',
      testimonialText: 'Working with John was an amazing experience. He guided us through every step of the home buying process with professionalism and expertise. His attention to detail and commitment to finding us the perfect home was outstanding.',
      propertyType: 'Single Family',
      saleDate: '2024-01-15',
      rating: '5',
      clientPhoto: null,
      propertyImage: null
    },
    {
      id: Date.now() + 1,
      clientName: 'Mike & Jennifer Rodriguez',
      clientLocation: 'Scottsdale, AZ',
      testimonialText: 'Outstanding service! John helped us sell our home quickly and for more than we expected. His marketing strategy and negotiation skills are top-notch. We highly recommend him to anyone looking for a dedicated real estate professional.',
      propertyType: 'Condo',
      saleDate: '2024-02-03',
      rating: '5',
      clientPhoto: null,
      propertyImage: null
    },
    {
      id: Date.now() + 2,
      clientName: 'David Chen',
      clientLocation: 'Tempe, AZ',
      testimonialText: 'As a first-time homebuyer, I was nervous about the process. John made everything smooth and stress-free. His knowledge of the local market and patience in answering all my questions made all the difference.',
      propertyType: 'Townhouse',
      saleDate: '2024-03-12',
      rating: '5',
      clientPhoto: null,
      propertyImage: null
    }
  ]);

  // Theme state
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [customColors, setCustomColors] = useState({});

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (themeKey) => {
    setSelectedTheme(themeKey);
    setCustomColors({});
  };

  const handleCustomColorChange = (colorKey, value) => {
    setCustomColors(prev => ({ ...prev, [colorKey]: value }));
  };

  // Background handlers
  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background);
  };

  const handleBackgroundRemove = () => {
    setSelectedBackground(null);
  };

  // Reset functions for development
  const resetAll = () => {
    setFormData({
      reportDate: new Date().toISOString().split('T')[0],
      reportType: 'Market Activity Report',
      agentTitle: 'REALTOR®'
    });
    setTestimonials([{
      id: Date.now(),
      clientName: '',
      clientLocation: '',
      testimonialText: '',
      propertyType: '',
      saleDate: '',
      rating: '5',
      clientPhoto: null,
      propertyImage: null
    }]);
    setImages({});
    setSelectedTheme('default');
    setCustomColors({});
    setSelectedBackground(null);
  };

  return {
    // State
    formData,
    setFormData,
    images,
    setImages,
    testimonials,
    setTestimonials,
    selectedTheme,
    customColors,
    selectedBackground,
    
    // Handlers
    handleInputChange,
    handleThemeChange,
    handleCustomColorChange,
    handleBackgroundSelect,
    handleBackgroundRemove,
    
    // Reset functions
    resetAll
  };
};