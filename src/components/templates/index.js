// Import all template categories
import * as coverPageTemplates from './coverPages';
import * as agentBioTemplates from './agentBios';
import * as testimonialTemplates from './testimonials';
import * as factSheetTemplates from './factsheets';

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
  'testimonialClean': testimonialTemplates.testimonialClean, 
  'expertInsights': testimonialTemplates.expertInsights,
  
  // Fact Sheets (
  'showingFactSheet': factSheetTemplates.showingFactSheet,
  'sellerMarketingPlan': factSheetTemplates.sellerMarketingPlan,
  'sellerProcess': factSheetTemplates.sellerProcess,
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
      'testimonial-cards', 'testimonial-featured', 'testimonial-grid', 'expert-insights'
    ],
    'fact-sheets': [
      'fact-sheet-detailed', 'fact-sheet-summary', 'fact-sheet-comparison', 'seller-process'
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