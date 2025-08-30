// components/BackgroundPicker.jsx
import React, { useState, useMemo } from 'react';
import { X, Upload, Search, Image as ImageIcon, Star } from 'lucide-react';
import { 
  BACKGROUND_CATEGORIES, 
  getBackgroundsByCategory, 
  searchBackgrounds, 
  getFeaturedBackgrounds 
} from '../services/backgroundService';

const BackgroundPicker = ({ 
  isOpen, 
  onClose, 
  onSelectBackground, 
  onUploadBackground, 
  currentBackground 
}) => {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBackground, setHoveredBackground] = useState(null);

  // Get backgrounds based on active category or search
  const displayedBackgrounds = useMemo(() => {
    if (searchQuery.trim()) {
      return searchBackgrounds(searchQuery);
    }
    
    if (activeCategory === 'featured') {
      return getFeaturedBackgrounds();
    }
    
    return getBackgroundsByCategory(activeCategory);
  }, [activeCategory, searchQuery]);

  const handleBackgroundSelect = (background) => {
    onSelectBackground({
      id: background.id,
      url: background.fullSize,
      thumbnail: background.thumbnail,
      name: background.name,
      type: 'gallery'
    });
    onClose();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUploadBackground({
          id: `upload-${Date.now()}`,
          url: e.target.result,
          thumbnail: e.target.result,
          name: file.name,
          type: 'upload'
        });
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Choose Background</h2>
              <p className="text-sm text-gray-600">Select from our gallery or upload your own</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close background picker"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search and Upload */}
        <div className="flex items-center gap-4 p-6 border-b bg-gray-50">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search backgrounds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Upload Button */}
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div className="flex items-center gap-1 p-6 border-b bg-gray-50">
            <button
              onClick={() => setActiveCategory('featured')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'featured'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Featured
            </button>
            
            {BACKGROUND_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        )}

        {/* Background Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {displayedBackgrounds.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No backgrounds found' : 'No backgrounds available'}
              </h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try a different search term' : 'Upload your own image to get started'}
              </p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {displayedBackgrounds.length} background{displayedBackgrounds.length !== 1 ? 's' : ''}
                  {searchQuery && ` found for "${searchQuery}"`}
                </p>
              </div>

              {/* Background grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayedBackgrounds.map(background => (
                  <div
                    key={background.id}
                    className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-300 cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredBackground(background)}
                    onMouseLeave={() => setHoveredBackground(null)}
                    onClick={() => handleBackgroundSelect(background)}
                  >
                    {/* Background image */}
                    <img
                      src={background.thumbnail}
                      alt={background.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback for missing images
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback placeholder */}
                    <div 
                      className="absolute inset-0 bg-gray-200 items-center justify-center hidden"
                      style={{ display: 'none' }}
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Current selection indicator */}
                    {currentBackground?.id === background.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                    
                    {/* Background name */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium truncate">
                        {background.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Preview Panel */}
        {hoveredBackground && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img
                  src={hoveredBackground.thumbnail}
                  alt={hoveredBackground.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{hoveredBackground.name}</h4>
                <p className="text-sm text-gray-600">
                  {BACKGROUND_CATEGORIES.find(cat => cat.id === hoveredBackground.categoryId)?.description || 'Custom background'}
                </p>
              </div>
              <button
                onClick={() => handleBackgroundSelect(hoveredBackground)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundPicker;