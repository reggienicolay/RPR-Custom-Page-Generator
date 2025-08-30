// templateCategories.js
export const TEMPLATE_CATEGORIES = {
  'cover-pages': {
    name: 'Cover Pages',
    description: 'Professional title pages for RPR reports',
    icon: 'FileText',
    fields: [
      'propertyAddress',
      'reportType',
      'reportSubheadline',
      'reportDate',
      'backgroundImage',
      'price',
      'bedrooms',
      'bathrooms',
      'sqft',
      'agentName',
      'agentTitle',
      'agentPhone',
      'agentEmail',
      'licenseNumber',
      'companyName',
      'companyLogo',
      'agentPhoto'
    ],
    templates: ['modern', 'classic', 'hero', 'branded', 'elegant', 'minimalist', 'modernSplit', 'listingPresentation']
  },
  'agent-bios': {
    name: 'Agent Bios',
    description: 'Professional agent biography pages',
    icon: 'User',
    fields: [
      'agentName',
      'agentTitle',
      'backgroundImage',
      'agentPhone',
      'agentEmail',
      'licenseNumber',
      'agentExperience',
      'agentBio',
      'agentSpecialties',
      'agentAwards',
      'agentEducation',
      'agentPhoto',
      'companyName',
      'companyLogo'
    ],
    templates: ['bio-standard', 'bio-modern', 'bio-detailed', 'agent-architect']
  },
  'testimonials': {
    name: 'Testimonials',
    description: 'Client testimonial showcase pages',
    icon: 'MessageSquare',
    fields: [
      'clientName',
      'clientLocation',
      'testimonialText',
      'propertyType',
      'saleDate',
      'rating',
      'clientPhoto',
      'propertyImage',
      'agentName',
      'companyName',
      'companyLogo'
    ],
    templates: ['testimonialCards', 'testimonialFeatured', 'testimonialGrid', 'testimonialClean']
  },
  'fact-sheets': {
    name: 'Fact Sheets',
    description: 'Property and market data sheets',
    icon: 'BarChart3',
    fields: [
      'propertyAddress',
      'price',
      'bedrooms',
      'bathrooms',
      'sqft',
      'lotSize',
      'yearBuilt',
      'propertyType',
      'propertyFeatures',
      'neighborhoodStats',
      'marketTrends',
      'propertyImages',
      'agentName',
      'companyName',
      'companyLogo'
    ],
    templates: ['fact-sheet-detailed', 'fact-sheet-summary', 'fact-sheet-comparison']
  }
};

// Field definitions with validation and UI metadata
export const FIELD_DEFINITIONS = {
  // Property fields
  propertyAddress: {
    label: 'Property Address',
    type: 'text',
    placeholder: '123 Main Street, Phoenix, AZ 85001',
    section: 'property'
  },
  price: {
    label: 'Price',
    type: 'text',
    placeholder: '$450,000',
    section: 'property'
  },
  bedrooms: {
    label: 'Bedrooms',
    type: 'number',
    placeholder: '3',
    section: 'property'
  },
  bathrooms: {
    label: 'Bathrooms',
    type: 'number',
    placeholder: '2.5',
    section: 'property'
  },
  sqft: {
    label: 'Square Feet',
    type: 'text',
    placeholder: '2,100',
    section: 'property'
  },
  lotSize: {
    label: 'Lot Size',
    type: 'text',
    placeholder: '0.25 acres',
    section: 'property'
  },
  yearBuilt: {
    label: 'Year Built',
    type: 'number',
    placeholder: '2015',
    section: 'property'
  },
  propertyType: {
    label: 'Property Type',
    type: 'select',
    options: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Land', 'Commercial'],
    section: 'property'
  },
  propertyFeatures: {
    label: 'Property Features',
    type: 'textarea',
    placeholder: 'Pool, granite countertops, hardwood floors...',
    section: 'property'
  },

  // Agent fields
  agentName: {
    label: 'Agent Name',
    type: 'text',
    placeholder: 'John Smith',
    section: 'agent'
  },
  agentTitle: {
    label: 'Agent Title',
    type: 'text',
    placeholder: 'REALTOR®',
    section: 'agent'
  },
  agentPhone: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '(555) 123-4567',
    section: 'agent'
  },
  agentEmail: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'agent@company.com',
    section: 'agent'
  },
  licenseNumber: {
    label: 'License Number',
    type: 'text',
    placeholder: '122343',
    section: 'agent'
  },
  agentBio: {
    label: 'Agent Biography',
    type: 'textarea',
    placeholder: 'Tell your story and highlight your expertise...',
    section: 'agent'
  },
  agentExperience: {
    label: 'Years of Experience',
    type: 'number',
    placeholder: '10',
    section: 'agent'
  },
  agentSpecialties: {
    label: 'Specialties',
    type: 'textarea',
    placeholder: 'Luxury homes, first-time buyers, investment properties...',
    section: 'agent'
  },
  agentAwards: {
    label: 'Awards & Recognition',
    type: 'textarea',
    placeholder: 'Top Producer 2023, Million Dollar Club...',
    section: 'agent'
  },
  agentEducation: {
    label: 'Education & Certifications',
    type: 'textarea',
    placeholder: 'MBA, CRS, GRI...',
    section: 'agent'
  },

  // Company fields
  companyName: {
    label: 'Company Name',
    type: 'text',
    placeholder: 'Metro Realty',
    section: 'company'
  },

  // Report fields
  backgroundImage: {
  label: 'Background Image',
  type: 'background',
  section: 'report'
  },
  
  reportType: {
    label: 'Report Title',
    type: 'text',
    placeholder: 'Report TItle Name',
    section: 'report'
  },

  reportSubheadline: {
    label: 'Report Subheadline',
    type: 'text',
    placeholder: 'from listed to sold',
    section: 'report'
  },

  reportDate: {
    label: 'Report Date',
    type: 'date',
    section: 'report'
  },

  // Client/Testimonial fields
  clientName: {
    label: 'Client Name',
    type: 'text',
    placeholder: 'Sarah Johnson',
    section: 'client'
  },
  clientLocation: {
    label: 'Client Location',
    type: 'text',
    placeholder: 'Phoenix, AZ',
    section: 'client'
  },
  testimonialText: {
    label: 'Testimonial',
    type: 'textarea',
    placeholder: 'Working with [Agent] was an amazing experience...',
    section: 'client'
  },
  rating: {
    label: 'Rating',
    type: 'select',
    options: ['5', '4', '3', '2', '1'],
    section: 'client'
  },
  saleDate: {
    label: 'Sale Date',
    type: 'date',
    section: 'client'
  },

  // Market data fields
  neighborhoodStats: {
    label: 'Neighborhood Statistics',
    type: 'textarea',
    placeholder: 'Median home price: $425,000, Average days on market: 28...',
    section: 'market'
  },
  marketTrends: {
    label: 'Market Trends',
    type: 'textarea',
    placeholder: 'Home values up 8% year over year...',
    section: 'market'
  },

  // Image fields
  coverImage: {
    label: 'Cover Image',
    type: 'image',
    section: 'report'
  },
  agentPhoto: {
    label: 'Agent Photo',
    type: 'image',
    section: 'agent'
  },
  companyLogo: {
    label: 'Company Logo',
    type: 'image',
    section: 'company'
  },
  clientPhoto: {
    label: 'Client Photo',
    type: 'image',
    section: 'images'
  },
  propertyImage: {
    label: 'Property Image',
    type: 'image',
    section: 'images'
  },
  propertyImages: {
    label: 'Property Images',
    type: 'multiple-images',
    section: 'images'
  }
};

// Section definitions for organizing form fields
export const FIELD_SECTIONS = {
  property: { name: 'Property Information', icon: 'Home' },
  agent: { name: 'Agent Information', icon: 'User' },
  company: { name: 'Company Information', icon: 'Building' },
  report: { name: 'Report Details', icon: 'FileText' },
  client: { name: 'Client Information', icon: 'Users' },
  market: { name: 'Market Data', icon: 'TrendingUp' },
  images: { name: 'Images & Media', icon: 'Image' }
};