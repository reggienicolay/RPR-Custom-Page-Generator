// services/pdfService.js

// Default PDF generation options
export const DEFAULT_PDF_OPTIONS = {
  margin: 0,
  image: { type: 'jpeg', quality: 1 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  },
  jsPDF: { 
    unit: 'px', 
    orientation: 'portrait' 
  },
  pagebreak: { mode: ['css', 'legacy'] },
};

// Page dimensions
export const PAGE_DIMENSIONS = {
  WIDTH: 816,
  HEIGHT: 1056
};

/**
 * Generates a PDF from HTML content
 * @param {string} htmlContent - The HTML content to convert to PDF
 * @param {string} filename - The filename for the generated PDF
 * @param {Object} options - PDF generation options (optional)
 * @param {Object} dimensions - Page dimensions (optional)
 * @returns {Promise<void>}
 */
export const generatePDF = async (
  htmlContent, 
  filename, 
  options = {}, 
  dimensions = PAGE_DIMENSIONS
) => {
  try {
    // Dynamic import of html2pdf
    const { default: html2pdf } = await import('html2pdf.js');
    
    // Create hidden container for rendering
    const container = document.createElement('div');
    Object.assign(container.style, {
      position: 'fixed',
      inset: '0',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '-1',
      width: dimensions.WIDTH + 'px',
      height: dimensions.HEIGHT + 'px',
      background: '#ffffff',
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    });

    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // Find the page element or use container
    const pageEl = container.querySelector('.page') || container;
    
    // Wait for render
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));

    // Merge options with defaults
    const pdfOptions = {
      ...DEFAULT_PDF_OPTIONS,
      ...options,
      filename,
      html2canvas: {
        ...DEFAULT_PDF_OPTIONS.html2canvas,
        ...options.html2canvas,
        width: dimensions.WIDTH,
        height: dimensions.HEIGHT,
        windowWidth: dimensions.WIDTH,
        windowHeight: dimensions.HEIGHT,
      },
      jsPDF: {
        ...DEFAULT_PDF_OPTIONS.jsPDF,
        ...options.jsPDF,
        format: [dimensions.WIDTH, dimensions.HEIGHT],
      }
    };

    // Generate and save PDF
    await html2pdf().set(pdfOptions).from(pageEl).save();

    // Clean up container
    document.body.removeChild(container);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Generates a filename for RPR documents
 * @param {string} categoryName - The category name
 * @param {string} fallbackName - Fallback name if no specific data available
 * @param {Object} formData - Form data containing property/agent info
 * @returns {string} Generated filename
 */
export const generateRPRFilename = (categoryName, fallbackName = 'Document', formData = {}) => {
  const sanitize = (str) => str.replace(/[^a-zA-Z0-9]/g, '-');
  
  const categoryPart = categoryName ? sanitize(categoryName.replace(/\s+/g, '-')) : 'RPR';
  const dataPart = formData.propertyAddress || formData.agentName || fallbackName;
  
  return `RPR-${categoryPart}-${sanitize(dataPart)}.pdf`;
};

/**
 * Convenience function specifically for RPR document generation
 * @param {string} htmlContent - The HTML content
 * @param {Object} currentCategory - The current category object
 * @param {Object} formData - Form data
 * @param {Object} customOptions - Custom PDF options
 * @returns {Promise<void>}
 */
export const generateRPRPDF = async (htmlContent, currentCategory, formData, customOptions = {}) => {
  const filename = generateRPRFilename(currentCategory?.name, 'Document', formData);
  return generatePDF(htmlContent, filename, customOptions);
};