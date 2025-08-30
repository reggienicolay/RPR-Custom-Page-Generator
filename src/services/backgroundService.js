// services/backgroundService.js

// Background categories configuration
export const BACKGROUND_CATEGORIES = [
  { 
    id: 'real-estate', 
    name: 'Real Estate', 
    description: 'Professional property and architectural images',
    count: 20 
  },
  { 
    id: 'nature', 
    name: 'Nature', 
    description: 'Landscapes, skies, and natural scenes',
    count: 25 
  },
  { 
    id: 'abstract', 
    name: 'Abstract', 
    description: 'Clean patterns and geometric designs',
    count: 19 
  },
  { 
    id: 'business', 
    name: 'Business', 
    description: 'Professional and corporate backgrounds',
    count: 15 
  }
];

/**
 * Generates background image data for a category
 * @param {string} categoryId - The category ID
 * @param {number} count - Number of images to generate
 * @returns {Array} Array of background objects
 */
const generateBackgroundsForCategory = (categoryId, count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${categoryId}-${index + 1}`,
    categoryId,
    name: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} ${index + 1}`,
    thumbnail: `/backgrounds/${categoryId}/thumb_${String(index + 1).padStart(3, '0')}.jpg`,
    fullSize: `/backgrounds/${categoryId}/bg_${String(index + 1).padStart(3, '0')}.jpg`,
    tags: [categoryId],
    aspectRatio: '16:9'
  }));
};

/**
 * Gets all available backgrounds organized by category
 * @returns {Object} Object with categoryId as keys and background arrays as values
 */
export const getAllBackgrounds = () => {
  const backgrounds = {};
  
  BACKGROUND_CATEGORIES.forEach(category => {
    backgrounds[category.id] = generateBackgroundsForCategory(category.id, category.count);
  });
  
  return backgrounds;
};

/**
 * Gets backgrounds for a specific category
 * @param {string} categoryId - The category ID
 * @returns {Array} Array of background objects
 */
export const getBackgroundsByCategory = (categoryId) => {
  const category = BACKGROUND_CATEGORIES.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return generateBackgroundsForCategory(categoryId, category.count);
};

/**
 * Searches backgrounds across all categories
 * @param {string} query - Search query
 * @returns {Array} Array of matching background objects
 */
export const searchBackgrounds = (query) => {
  if (!query) return [];
  
  const allBackgrounds = getAllBackgrounds();
  const results = [];
  
  Object.values(allBackgrounds).forEach(categoryBackgrounds => {
    categoryBackgrounds.forEach(bg => {
      if (bg.name.toLowerCase().includes(query.toLowerCase()) ||
          bg.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
        results.push(bg);
      }
    });
  });
  
  return results;
};

/**
 * Gets a background by its ID
 * @param {string} backgroundId - The background ID
 * @returns {Object|null} Background object or null if not found
 */
export const getBackgroundById = (backgroundId) => {
  const allBackgrounds = getAllBackgrounds();
  
  for (const categoryBackgrounds of Object.values(allBackgrounds)) {
    const background = categoryBackgrounds.find(bg => bg.id === backgroundId);
    if (background) return background;
  }
  
  return null;
};

/**
 * Gets featured/recommended backgrounds
 * @param {number} limit - Number of backgrounds to return
 * @returns {Array} Array of featured background objects
 */
export const getFeaturedBackgrounds = (limit = 12) => {
  const allBackgrounds = getAllBackgrounds();
  const featured = [];
  
  // Pick a few from each category
  Object.values(allBackgrounds).forEach(categoryBackgrounds => {
    const categoryFeatured = categoryBackgrounds.slice(0, 3);
    featured.push(...categoryFeatured);
  });
  
  return featured.slice(0, limit);
};