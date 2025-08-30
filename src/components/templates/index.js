// Import all template categories
import * as coverPageTemplates from './coverPages';
import * as agentBioTemplates from './agentBios';
import * as testimonialTemplates from './testimonials';
// Import other categories as you create them
// import * as factSheetTemplates from './factSheets';

// Template mapping by ID - this is what your component expects
const TEMPLATES = {
  // Cover Pages
  modern: coverPageTemplates.modern,
  classic: coverPageTemplates.classic,
  hero: coverPageTemplates.hero,
  branded: coverPageTemplates.branded,
  elegant: coverPageTemplates.elegant,
  minimalist: coverPageTemplates.minimalist,
  modernSplit: coverPageTemplates.modernSplit,
  listingPresentation: coverPageTemplates.listingPresentation,
  
  // Agent Bios
  'bio-standard': agentBioTemplates.bioStandard,
  'bio-modern': agentBioTemplates.bioModern,
  'bio-detailed': agentBioTemplates.bioDetailed,
  'agent-architect': agentBioTemplates.agentArchitect,
  
 // Testimonials
  'testimonialCards': testimonialTemplates.testimonialCards,
  'testimonialFeatured': testimonialTemplates.testimonialFeatured,
  'testimonialGrid': testimonialTemplates.testimonialGrid,
  testimonialClean: testimonialTemplates.testimonialClean, // Added missing template
  
  // Fact Sheets (placeholder for future implementation)
  'fact-sheet-detailed': ({ formData, logos, theme }) => '<div class="page">Fact Sheet Detailed - Coming Soon</div>',
  'fact-sheet-summary': ({ formData, logos, theme }) => '<div class="page">Fact Sheet Summary - Coming Soon</div>',
  'fact-sheet-comparison': ({ formData, logos, theme }) => '<div class="page">Fact Sheet Comparison - Coming Soon</div>',
};

// Helper function to get templates by category
export const getTemplatesByCategory = (category) => {
  const categoryMaps = {
    'cover-pages': [
      'modern', 'classic', 'hero', 'branded', 'elegant', 'minimalist', 'modernSplit', 'listing-presentation'
    ],
    'agent-bios': [
      'bio-standard', 'bio-modern', 'bio-detailed', 'agent-architect'
    ],
    'testimonials': [
      'testimonial-cards', 'testimonial-featured', 'testimonial-grid'
    ],
    'fact-sheets': [
      'fact-sheet-detailed', 'fact-sheet-summary', 'fact-sheet-comparison'
    ]
  };
  
  const templateKeys = categoryMaps[category] || [];
  return templateKeys.reduce((acc, key) => {
    if (TEMPLATES[key]) {
      acc[key] = TEMPLATES[key];
    }
    return acc;
  }, {});
};

// Helper function to check if template exists
export const templateExists = (templateId) => {
  return !!TEMPLATES[templateId];
};

// Helper function to render a template
export const renderTemplate = (templateId, data) => {
  const template = TEMPLATES[templateId];
  if (!template) {
    return '<div class="page">Template not found</div>';
  }
  
  try {
    return template(data);
  } catch (error) {
    console.error(`Error rendering template ${templateId}:`, error);
    return '<div class="page">Template rendering error</div>';
  }
};

// Default export - this is what your component imports
export default TEMPLATES;