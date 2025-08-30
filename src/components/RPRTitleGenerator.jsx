import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { Download, Upload, Eye, FileText, User, Home, Building, X, Image as ImageIcon, MessageSquare, BarChart3, Users, TrendingUp } from 'lucide-react';
import TEMPLATES from './templates';
import { THEME_PRESETS } from './templates/themes';
import { TEMPLATE_CATEGORIES, FIELD_DEFINITIONS, FIELD_SECTIONS } from './templateCategories';
import FormSections from './FormSections';
import DocumentPreview from './DocumentPreview';
import ThemeSelector from './ThemeSelector';
import BackgroundSelector from './BackgroundSelector';
import { useImageUpload } from "../hooks/useImageUpload";
import { useFormState } from "../hooks/useFormState";
import { generateRPRPDF, PAGE_DIMENSIONS } from "../services/pdfService";

// Icon mapping for dynamic icons
const ICON_MAP = {
  FileText, User, Home, Building, MessageSquare, BarChart3, Users, TrendingUp, Image: ImageIcon
};

const RPRTitleGenerator = () => {
  // Core UI state (not form data)
  const [selectedCategory, setSelectedCategory] = useState('cover-pages');
  const [selectedLayout, setSelectedLayout] = useState('modern');
  const [showPreview, setShowPreview] = useState(true);

  // Form state hook
  const {
    formData,
    setFormData,
    images,
    setImages,
    testimonials,
    setTestimonials,
    selectedTheme,
    customColors,
    selectedBackground,
    handleInputChange,
    handleThemeChange,
    handleCustomColorChange,
    handleBackgroundSelect,
    handleBackgroundRemove,
    resetAll
  } = useFormState();

  // Memoized current category info
  const currentCategory = useMemo(() =>
    TEMPLATE_CATEGORIES[selectedCategory],
    [selectedCategory]
  );

  const availableTemplates = useMemo(() =>
    currentCategory?.templates || [],
    [currentCategory]
  );

  // Image upload hook
  const { fileInputRefs, handleImageUpload, clearImage } = useImageUpload(
    selectedCategory,
    currentCategory,
    testimonials,
    setTestimonials,
    setImages,
    FIELD_DEFINITIONS
  );

  // Reset layout when category changes
  useEffect(() => {
    if (availableTemplates.length > 0 && !availableTemplates.includes(selectedLayout)) {
      setSelectedLayout(availableTemplates[0]);
    }
  }, [selectedCategory, availableTemplates, selectedLayout]);

  // Memoized theme calculation
  const getCurrentTheme = useMemo(() => {
    const baseTheme = THEME_PRESETS[selectedTheme] || THEME_PRESETS.default;
    return { ...baseTheme, ...customColors };
  }, [selectedTheme, customColors]);

  // Memoized fields by section calculation
  const getFieldsBySection = useMemo(() => {
    // Skip testimonial fields since we handle them separately
    if (selectedCategory === 'testimonials') {
      return {};
    }

    const categoryFields = currentCategory?.fields || [];
    const sections = {};

    categoryFields.forEach(fieldKey => {
      const fieldDef = FIELD_DEFINITIONS[fieldKey];
      if (!fieldDef) return;

      const sectionKey = fieldDef.section;
      if (!sections[sectionKey]) {
        sections[sectionKey] = [];
      }
      sections[sectionKey].push({ key: fieldKey, ...fieldDef });
    });

    return sections;
  }, [selectedCategory, currentCategory]);

  // Page size and preview logic
  const previewHostRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (!previewHostRef.current) return;
    const el = previewHostRef.current;
    const compute = () => {
      const containerWidth = el.clientWidth || 1;
      setPreviewScale(containerWidth / PAGE_DIMENSIONS.WIDTH);
    };
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    compute();
    return () => ro.disconnect();
  }, []);

  // Memoized template generation
  // In your RPRTitleGenerator component, change this line:
  const generateFullHTML = useCallback(() => {
    const tpl = TEMPLATES[selectedLayout];
    const combinedData = { ...formData, ...images };

    return tpl ? tpl({
      formData: combinedData,
      logos: images,
      theme: getCurrentTheme,
      testimonials: selectedCategory === 'testimonials' ? testimonials : [],
      selectedBackground: selectedBackground  // Change from 'background:' to 'selectedBackground:'
    }) : '<div class="page">Template not implemented</div>';
  }, [selectedLayout, formData, images, getCurrentTheme, selectedCategory, testimonials, selectedBackground]);

  const previewHTML = useMemo(() => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: 8.5in 11in; margin: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; }
          .page { width: 8.5in; height: 11in; position: relative; background: #fff; }
        </style>
      </head>
      <body>
        ${generateFullHTML()}
      </body>
    </html>`;
  }, [generateFullHTML]);

  // Memoized PDF generation handler
  const handleGeneratePDF = useCallback(async () => {
    try {
      await generateRPRPDF(generateFullHTML(), currentCategory, formData);
    } catch (error) {
      alert('❌ Sorry, there was an error generating the PDF.');
    }
  }, [generateFullHTML, currentCategory, formData]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RPR Custom Page Generator</h1>
                <p className="text-gray-600">Create professional custom page inserts for RPR Reports</p>
              </div>
            </div>

            {/* Reset Button for Development */}
            <button
              onClick={() => {
                if (confirm('Reset all form data to defaults? This cannot be undone.')) {
                  resetAll();
                }
              }}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Clear all form data"
            >
              Reset All
            </button>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Document Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(TEMPLATE_CATEGORIES).map(([key, category]) => {
                const IconComponent = ICON_MAP[category.icon];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${selectedCategory === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex items-center mb-2">
                      {IconComponent && <IconComponent className="w-5 h-5 text-blue-600 mr-2" />}
                      <span className="font-semibold text-gray-900">{category.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Template Style</h3>
            <div className="flex flex-wrap gap-3">
              {availableTemplates.map((templateKey) => (
                <button
                  key={templateKey}
                  onClick={() => setSelectedLayout(templateKey)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedLayout === templateKey
                      ? 'btn-template text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {templateKey.replace(/-/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <ThemeSelector
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
              customColors={customColors}
              onCustomColorChange={handleCustomColorChange}
              themePresets={THEME_PRESETS}
            />

            <BackgroundSelector
              selectedBackground={selectedBackground}
              onBackgroundSelect={handleBackgroundSelect}
              onBackgroundRemove={handleBackgroundRemove}
            />

            <FormSections
              selectedCategory={selectedCategory}
              fieldsBySection={getFieldsBySection}
              testimonials={testimonials}
              onTestimonialsChange={setTestimonials}
              fileInputRefs={fileInputRefs}
              onImageUpload={handleImageUpload}
              onImageClear={clearImage}
              formData={formData}
              images={images}
              onInputChange={handleInputChange}
            />
          </div>

          <DocumentPreview
            showPreview={showPreview}
            previewHTML={previewHTML}
            previewScale={previewScale}
            previewHostRef={previewHostRef}
            currentTheme={getCurrentTheme}
            selectedTheme={selectedTheme}
            THEME_PRESETS={THEME_PRESETS}
            generatePDF={handleGeneratePDF}
            PAGE_W={PAGE_DIMENSIONS.WIDTH}
            PAGE_H={PAGE_DIMENSIONS.HEIGHT}
            selectedCategory={selectedCategory}
            selectedLayout={selectedLayout}
            customColors={customColors}
            formData={formData}
            images={images}
            testimonials={testimonials}
            selectedBackground={selectedBackground}
          />
        </div>
      </div>
    </div>
  );
};

export default RPRTitleGenerator;