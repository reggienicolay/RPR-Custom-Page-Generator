import React from 'react';
import { Download } from 'lucide-react';

const DocumentPreview = ({
  showPreview,
  previewHTML,
  previewScale,
  previewHostRef,
  currentTheme,
  selectedTheme,
  THEME_PRESETS,
  generatePDF,
  PAGE_W,
  PAGE_H,
  // Dependencies for the preview key
  selectedCategory,
  selectedLayout,
  customColors,
  formData,
  images,
  testimonials,
  selectedBackground  // Add this prop
}) => {
  return (
    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6 self-start">
      {/* PDF Generation Button */}
      <div className="card">
        <div className="space-y-3">
          <button onClick={generatePDF} className="btn-secondary w-full">
            <Download className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="card">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Preview</h3>
          
          {/* Theme Preview */}
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs text-gray-500">Theme:</div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 rounded" style={{ background: currentTheme.primary }}></div>
              <div className="w-4 h-4 rounded" style={{ background: currentTheme.secondary }}></div>
              <div className="w-4 h-4 rounded" style={{ background: currentTheme.accent }}></div>
            </div>
            <div className="text-xs text-gray-500">{THEME_PRESETS[selectedTheme]?.name}</div>
          </div>
          
          {/* Preview Container */}
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
                  title="RPR Document Preview"
                  key={
                    selectedCategory +
                    '|' + selectedLayout +
                    '|' + selectedTheme +
                    '|' + JSON.stringify(customColors) +
                    '|' + JSON.stringify(formData) +
                    '|' + JSON.stringify(images) +
                    '|' + JSON.stringify(testimonials) +
                    '|' + JSON.stringify(selectedBackground)  // Add this line
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
  );
};

export default DocumentPreview;