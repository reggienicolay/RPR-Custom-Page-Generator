// components/BackgroundSelector.jsx
import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import AccordionSection from './AccordionSection';
import BackgroundPicker from './BackgroundPicker';

const BackgroundSelector = ({ 
  selectedBackground, 
  onBackgroundSelect, 
  onBackgroundRemove 
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleSelectBackground = (background) => {
    onBackgroundSelect(background);
  };

  const handleRemoveBackground = () => {
    onBackgroundRemove();
  };

  return (
    <>
      <AccordionSection icon={ImageIcon} title="Background Image">
        <div className="space-y-4">
          {/* Current Background Display */}
          {selectedBackground ? (
            <div className="relative">
              <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={selectedBackground.thumbnail}
                  alt={selectedBackground.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Background Info */}
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{selectedBackground.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedBackground.type === 'upload' ? 'Uploaded Image' : 'Gallery Image'}
                  </p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={handleRemoveBackground}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove background"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* No Background State */
            <div className="aspect-video w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-6">
              <ImageIcon className="w-8 h-8 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium mb-2">No background selected</p>
              <p className="text-sm text-gray-500 mb-4">Choose from our gallery or upload your own image</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowPicker(true)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              {selectedBackground ? 'Change Background' : 'Choose Background'}
            </button>
          </div>

          {/* Usage Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Background Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use high-resolution images (1920x1080 or larger) for best quality</li>
              <li>• Subtle patterns work better than busy images</li>
              <li>• Consider contrast with text - darker backgrounds may need light text</li>
              <li>• Real estate and professional themes work well for business documents</li>
            </ul>
          </div>
        </div>
      </AccordionSection>

      {/* Background Picker Modal */}
      <BackgroundPicker
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        onSelectBackground={handleSelectBackground}
        onUploadBackground={handleSelectBackground}
        currentBackground={selectedBackground}
      />
    </>
  );
};

export default BackgroundSelector;