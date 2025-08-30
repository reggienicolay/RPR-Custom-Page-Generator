// components/ThemeSelector.jsx
import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import AccordionSection from './AccordionSection';

const ThemeSelector = ({ selectedTheme, onThemeChange, customColors, onCustomColorChange, themePresets }) => {
  const [showCustom, setShowCustom] = useState(false);
  
  return (
    <AccordionSection icon={Palette} title="Brand Colors">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {Object.entries(themePresets).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTheme === key ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
            }`}
            aria-pressed={selectedTheme === key}
            aria-label={`Select ${theme.name} theme`}
          >
            <div className="flex space-x-1 mb-2" role="presentation">
              <div 
                className="w-4 h-4 rounded" 
                style={{ background: theme.primary }}
                aria-label={`Primary color: ${theme.primary}`}
              ></div>
              <div 
                className="w-4 h-4 rounded" 
                style={{ background: theme.secondary }}
                aria-label={`Secondary color: ${theme.secondary}`}
              ></div>
              <div 
                className="w-4 h-4 rounded" 
                style={{ background: theme.accent }}
                aria-label={`Accent color: ${theme.accent}`}
              ></div>
            </div>
            <div className="text-xs font-medium">{theme.name}</div>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => setShowCustom(!showCustom)}
        className="text-sm text-blue-600 hover:text-blue-700 mb-3"
        aria-expanded={showCustom}
        aria-controls="custom-colors-section"
      >
        {showCustom ? 'Hide' : 'Show'} Custom Colors
      </button>
      
      {showCustom && (
        <div 
          id="custom-colors-section"
          className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <label 
              htmlFor="primary-color"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Primary
            </label>
            <input
              id="primary-color"
              type="color"
              value={customColors.primary || themePresets[selectedTheme]?.primary || '#667eea'}
              onChange={(e) => onCustomColorChange('primary', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              aria-label="Select primary color"
            />
          </div>
          <div>
            <label 
              htmlFor="secondary-color"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Secondary
            </label>
            <input
              id="secondary-color"
              type="color"
              value={customColors.secondary || themePresets[selectedTheme]?.secondary || '#764ba2'}
              onChange={(e) => onCustomColorChange('secondary', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              aria-label="Select secondary color"
            />
          </div>
          <div>
            <label 
              htmlFor="accent-color"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Accent
            </label>
            <input
              id="accent-color"
              type="color"
              value={customColors.accent || themePresets[selectedTheme]?.accent || '#ff6b6b'}
              onChange={(e) => onCustomColorChange('accent', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              aria-label="Select accent color"
            />
          </div>
        </div>
      )}
    </AccordionSection>
  );
};

export default ThemeSelector;