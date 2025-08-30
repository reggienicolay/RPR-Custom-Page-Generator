import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Download, Upload, Eye, FileText, User, Home, Building, ChevronDown, X, Image as ImageIcon, Palette } from 'lucide-react';
import TEMPLATES from './templates';
import { THEME_PRESETS } from './templates/themes';

// Small helper: responsive accordion section
function AccordionSection({ icon: Icon, title, children, defaultOpenLg = true }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const sync = () => setOpen(defaultOpenLg ? mql.matches : false);
    sync();
    if (mql.addEventListener) mql.addEventListener('change', sync);
    else mql.addListener(sync);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', sync);
      else mql.removeListener(sync);
    };
  }, [defaultOpenLg]);

  return (
    <div className="card">
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-2 mb-4 text-left">
        <span className="inline-flex items-center text-lg font-semibold text-gray-800">
          {Icon ? <Icon className="w-5 h-5 mr-2 text-blue-600" /> : null}
          {title}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

// Reusable upload-with-thumbnail control
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

// Theme Selector Component
function ThemeSelector({ selectedTheme, onThemeChange, customColors, onCustomColorChange }) {
  const [showCustom, setShowCustom] = useState(false);
  
  return (
    <AccordionSection icon={Palette} title="Brand Colors">
      {/* Preset themes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {Object.entries(THEME_PRESETS).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTheme === key ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex space-x-1 mb-2">
              <div className="w-4 h-4 rounded" style={{ background: theme.primary }}></div>
              <div className="w-4 h-4 rounded" style={{ background: theme.secondary }}></div>
              <div className="w-4 h-4 rounded" style={{ background: theme.accent }}></div>
            </div>
            <div className="text-xs font-medium">{theme.name}</div>
          </button>
        ))}
      </div>
      
      {/* Custom colors toggle */}
      <button
        onClick={() => setShowCustom(!showCustom)}
        className="text-sm text-blue-600 hover:text-blue-700 mb-3"
      >
        {showCustom ? 'Hide' : 'Show'} Custom Colors
      </button>
      
      {/* Custom color pickers */}
      {showCustom && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Primary</label>
            <input
              type="color"
              value={customColors.primary || THEME_PRESETS[selectedTheme]?.primary || '#667eea'}
              onChange={(e) => onCustomColorChange('primary', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Secondary</label>
            <input
              type="color"
              value={customColors.secondary || THEME_PRESETS[selectedTheme]?.secondary || '#764ba2'}
              onChange={(e) => onCustomColorChange('secondary', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Accent</label>
            <input
              type="color"
              value={customColors.accent || THEME_PRESETS[selectedTheme]?.accent || '#ff6b6b'}
              onChange={(e) => onCustomColorChange('accent', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        </div>
      )}
    </AccordionSection>
  );
}

const RPRTitleGenerator = () => {
  const [selectedLayout, setSelectedLayout] = useState('modern');
  // Add theme state
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [customColors, setCustomColors] = useState({});
  
  const [formData, setFormData] = useState({
    propertyAddress: '',
    mlsNumber: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    agentName: '',
    agentTitle: 'REALTOR®',
    agentPhone: '',
    agentEmail: '',
    licenseNumber: '',
    companyName: '',
    companyTagline: '',
    reportDate: new Date().toISOString().split('T')[0],
    reportType: 'Market Activity Report'
  });

  const [logos, setLogos] = useState({
    companyLogo: null,
    agentPhoto: null,
    coverImage: null,
  });

  const [showPreview, setShowPreview] = useState(true);
  const fileInputRefs = {
    companyLogo: useRef(null),
    agentPhoto: useRef(null),
    coverImage: useRef(null),
  };

  const layouts = {
    modern: { name: 'Modern' },
    classic: { name: 'Classic' },
    branded: { name: 'Branded' },
    minimalist: { name: 'Minimal' },
    hero: { name: 'Hero' },
    elegant: { name: 'Elegant' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (type, event) => {
    const file = event?.target?.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogos(prev => ({ ...prev, [type]: e.target.result }));
    reader.readAsDataURL(file);
  };

  const clearImage = (type) => {
    setLogos(prev => ({ ...prev, [type]: null }));
    if (fileInputRefs[type]?.current) fileInputRefs[type].current.value = '';
  };

  // Theme handlers
  const handleThemeChange = (themeKey) => {
    setSelectedTheme(themeKey);
    setCustomColors({}); // Reset custom colors when switching themes
  };

  const handleCustomColorChange = (colorKey, value) => {
    setCustomColors(prev => ({ ...prev, [colorKey]: value }));
  };

  // Get current theme with custom overrides
  const getCurrentTheme = () => {
    const baseTheme = THEME_PRESETS[selectedTheme] || THEME_PRESETS.default;
    return { ...baseTheme, ...customColors };
  };

  // Page size in CSS pixels (8.5in × 11in at ~96 DPI)
  const PAGE_W = 816;
  const PAGE_H = 1056;

  const previewHostRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (!previewHostRef.current) return;
    const el = previewHostRef.current;
    const compute = () => {
      const containerWidth = el.clientWidth || 1;
      setPreviewScale(containerWidth / PAGE_W);
    };
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    compute();
    return () => ro.disconnect();
  }, []);

  // Updated to pass theme to templates
  function generateFullHTML() {
    const tpl = TEMPLATES[selectedLayout];
    const theme = getCurrentTheme();
    return tpl ? tpl({ formData, logos, theme }) : '<div class="page">Template not implemented</div>';
  }

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
  }, [selectedLayout, formData, logos, selectedTheme, customColors]);

  const generatePDF = async () => {
    try {
      const { default: html2pdf } = await import('html2pdf.js');

      const container = document.createElement('div');
      Object.assign(container.style, {
        position: 'fixed',
        inset: '0',
        opacity: '0',
        pointerEvents: 'none',
        zIndex: '-1',
        width: PAGE_W + 'px',
        height: PAGE_H + 'px',
        background: '#ffffff',
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      });

      container.innerHTML = generateFullHTML();
      document.body.appendChild(container);

      const pageEl = container.querySelector('.page') || container;
      await new Promise((r) => requestAnimationFrame(() => r()));

      const filename = `RPR-Title-Page-${(formData.propertyAddress || 'Property')
        .replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;

      const opts = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: PAGE_W,
          height: PAGE_H,
          windowWidth: PAGE_W,
          windowHeight: PAGE_H,
        },
        jsPDF: { unit: 'px', format: [PAGE_W, PAGE_H], orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf().set(opts).from(pageEl).save();
      document.body.removeChild(container);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('❌ Sorry, there was an error generating the PDF.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RPR Title Page Generator</h1>
              <p className="text-gray-600">Create professional title pages matching RPR report style</p>
            </div>
          </div>

          {/* Layout Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Layout Style</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(layouts).map(([key, layout]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLayout(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLayout === key ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {layout.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main grid: 12 columns; form 7, preview 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Fields (accordion sections) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Theme Selector */}
            <ThemeSelector
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
              customColors={customColors}
              onCustomColorChange={handleCustomColorChange}
            />

            {/* Cover Image */}
            <AccordionSection icon={ImageIcon} title="Cover Image">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UploadThumb
                  label={logos.coverImage ? 'Change Cover Image' : 'Upload Cover Image'}
                  imageSrc={logos.coverImage}
                  onPick={() => fileInputRefs.coverImage.current?.click()}
                  onClear={() => clearImage('coverImage')}
                  fileRef={fileInputRefs.coverImage}
                  onChange={(e) => handleImageUpload('coverImage', e)}
                />
                <div className="border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  {logos.coverImage ? (
                    <img src={logos.coverImage} alt="Cover preview" className="w-full h-40 object-cover" />
                  ) : (
                    <div className="text-gray-400 text-sm p-4">No image selected</div>
                  )}
                </div>
              </div>
            </AccordionSection>

            {/* Property */}
            <AccordionSection icon={Home} title="Property Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Property Address" className="form-input"
                  value={formData.propertyAddress} onChange={(e) => handleInputChange('propertyAddress', e.target.value)} />
                <input type="text" placeholder="MLS Number" className="form-input"
                  value={formData.mlsNumber} onChange={(e) => handleInputChange('mlsNumber', e.target.value)} />
                <input type="text" placeholder="Price (e.g., $450,000)" className="form-input"
                  value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="Beds" className="form-input"
                    value={formData.bedrooms} onChange={(e) => handleInputChange('bedrooms', e.target.value)} />
                  <input type="text" placeholder="Baths" className="form-input"
                    value={formData.bathrooms} onChange={(e) => handleInputChange('bathrooms', e.target.value)} />
                  <input type="text" placeholder="Sq Ft" className="form-input"
                    value={formData.sqft} onChange={(e) => handleInputChange('sqft', e.target.value)} />
                </div>
              </div>
            </AccordionSection>

            {/* Agent */}
            <AccordionSection icon={User} title="Agent Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Agent Name" className="form-input"
                  value={formData.agentName} onChange={(e) => handleInputChange('agentName', e.target.value)} />
                <input type="text" placeholder="Title (e.g., REALTOR®)" className="form-input"
                  value={formData.agentTitle} onChange={(e) => handleInputChange('agentTitle', e.target.value)} />
                <input type="text" placeholder="Phone Number" className="form-input"
                  value={formData.agentPhone} onChange={(e) => handleInputChange('agentPhone', e.target.value)} />
                <input type="email" placeholder="Email Address" className="form-input"
                  value={formData.agentEmail} onChange={(e) => handleInputChange('agentEmail', e.target.value)} />
                <input type="text" placeholder="License Number" className="form-input"
                  value={formData.licenseNumber} onChange={(e) => handleInputChange('licenseNumber', e.target.value)} />
                <div>
                  <UploadThumb
                    label={logos.agentPhoto ? 'Change Photo' : 'Upload Agent Photo'}
                    imageSrc={logos.agentPhoto}
                    onPick={() => fileInputRefs.agentPhoto.current?.click()}
                    onClear={() => clearImage('agentPhoto')}
                    fileRef={fileInputRefs.agentPhoto}
                    onChange={(e) => handleImageUpload('agentPhoto', e)}
                  />
                </div>
              </div>
            </AccordionSection>

            {/* Company */}
            <AccordionSection icon={Building} title="Company Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Company Name" className="form-input"
                  value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} />
                <input type="text" placeholder="Report Type" className="form-input"
                  value={formData.reportType} onChange={(e) => handleInputChange('reportType', e.target.value)} />
                <div className="md:col-span-2">
                  <UploadThumb
                    label={logos.companyLogo ? 'Change Company Logo' : 'Upload Company Logo'}
                    imageSrc={logos.companyLogo}
                    onPick={() => fileInputRefs.companyLogo.current?.click()}
                    onClear={() => clearImage('companyLogo')}
                    fileRef={fileInputRefs.companyLogo}
                    onChange={(e) => handleImageUpload('companyLogo', e)}
                    aspectRatio={2}
                  />
                </div>
              </div>
            </AccordionSection>
          </div>

          {/* Preview and Actions */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6 self-start">
            <div className="card">
              <div className="space-y-3">
                <button onClick={generatePDF} className="btn-secondary w-full">
                  <Download className="w-4 h-4" />
                  <span>Generate PDF</span>
                </button>
              </div>
            </div>

            {showPreview && (
              <div className="card">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">Preview</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-xs text-gray-500">Theme:</div>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 rounded" style={{ background: getCurrentTheme().primary }}></div>
                    <div className="w-4 h-4 rounded" style={{ background: getCurrentTheme().secondary }}></div>
                    <div className="w-4 h-4 rounded" style={{ background: getCurrentTheme().accent }}></div>
                  </div>
                  <div className="text-xs text-gray-500">{THEME_PRESETS[selectedTheme]?.name}</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="w-full shadow-sm rounded overflow-hidden bg-white" ref={previewHostRef}>
                    <div
                      style={{
                        width: Math.round(PAGE_W * previewScale),
                        height: Math.round(PAGE_H * previewScale),
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <iframe
                        title="RPR Title Page Preview"
                        key={
                          selectedLayout +
                          '|' + selectedTheme +
                          '|' + JSON.stringify(customColors) +
                          '|' + (formData.companyName ?? '') +
                          '|' + (formData.propertyAddress ?? '') +
                          '|' + (formData.reportType ?? '') +
                          '|' + (logos.companyLogo ? '1' : '0') +
                          (logos.agentPhoto ? '1' : '0') +
                          (logos.coverImage ? '1' : '0')
                        }
                        srcDoc={previewHTML}
                        style={{
                          width: PAGE_W + 'px',
                          height: PAGE_H + 'px',
                          border: 0,
                          transform: `scale(${previewScale})`,
                          transformOrigin: 'top left',
                          display: 'block',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPRTitleGenerator;