import React from 'react';
import { MessageSquare, ChevronDown, Upload, X, FileText, User, Home, Building, BarChart3, Users, TrendingUp, Image as ImageIcon } from 'lucide-react';
import TestimonialBuilder from './TestimonialBuilder';
import { FIELD_SECTIONS } from './templateCategories';

// Icon mapping for dynamic icons
const ICON_MAP = {
  FileText, User, Home, Building, MessageSquare, BarChart3, Users, TrendingUp, Image: ImageIcon
};

// AccordionSection component (copied from main component)
function AccordionSection({ icon: Icon, title, children, defaultOpenLg = true }) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
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
      <button 
        type="button" 
        onClick={() => setOpen(o => !o)} 
        className="w-full flex items-center justify-between gap-2 mb-4 text-left"
      >
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

// UploadThumb component (copied from main component)
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

// DynamicField component (copied from main component)
function DynamicField({ fieldKey, fieldDef, value, onChange, fileInputRefs, onImageUpload, onImageClear }) {
  const { label, type, placeholder, options } = fieldDef;

  if (type === 'image') {
    return (
      <UploadThumb
        label={value ? `Change ${label}` : `Upload ${label}`}
        imageSrc={value}
        onPick={() => fileInputRefs.current[fieldKey]?.current?.click()}
        onClear={() => onImageClear(fieldKey)}
        fileRef={fileInputRefs.current[fieldKey]}
        onChange={(e) => onImageUpload(fieldKey, e)}
        aspectRatio={fieldKey === 'companyLogo' ? 2 : 1}
      />
    );
  }

  if (type === 'textarea') {
    const wordCount = value ? value.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    const isAgentBio = fieldKey === 'agentBio';
    
    return (
      <div>
        <textarea
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className={`form-input resize-y w-full ${isAgentBio ? '!min-h-[250px] h-64' : 'min-h-[100px]'}`}
          rows={isAgentBio ? 10 : 4}
          style={isAgentBio ? { minHeight: '250px', height: '256px' } : {}}
        />
        {isAgentBio && (
          <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
            <span>Tell your professional story and highlight your expertise</span>
            <span className={`${wordCount > 300 ? 'text-amber-600' : ''} ${wordCount > 500 ? 'text-red-600' : ''}`}>
              {wordCount} words
            </span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'select') {
    return (
      <select
        value={value || ''}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        className="form-input"
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options?.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(fieldKey, e.target.value)}
      className="form-input"
    />
  );
}

// Main FormSections Component
const FormSections = ({
  selectedCategory,
  fieldsBySection,
  testimonials,
  onTestimonialsChange,
  fileInputRefs,
  onImageUpload,
  onImageClear,
  formData,
  images,
  onInputChange
}) => {
  // Handle testimonials category separately
  if (selectedCategory === 'testimonials') {
    return (
      <AccordionSection icon={MessageSquare} title="Client Testimonials">
        <TestimonialBuilder
          testimonials={testimonials}
          onTestimonialsChange={onTestimonialsChange}
          fileInputRefs={fileInputRefs}
          onImageUpload={onImageUpload}
          onImageClear={onImageClear}
        />
      </AccordionSection>
    );
  }

  // Handle regular form fields for other categories
  return (
    <>
      {Object.entries(fieldsBySection).map(([sectionKey, fields]) => {
        const sectionInfo = FIELD_SECTIONS[sectionKey];
        const SectionIcon = ICON_MAP[sectionInfo?.icon];
        
        return (
          <AccordionSection 
            key={sectionKey}
            icon={SectionIcon} 
            title={sectionInfo?.name || sectionKey}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => {
                const isFullWidth = field.type === 'textarea' || field.type === 'multiple-images';
                
                return (
                  <div 
                    key={field.key}
                    className={isFullWidth ? 'w-full md:col-span-2' : ''}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <DynamicField
                      fieldKey={field.key}
                      fieldDef={field}
                      value={field.type === 'image' ? images[field.key] : formData[field.key]}
                      onChange={onInputChange}
                      fileInputRefs={fileInputRefs}
                      onImageUpload={onImageUpload}
                      onImageClear={onImageClear}
                    />
                  </div>
                );
              })}
            </div>
          </AccordionSection>
        );
      })}
    </>
  );
};

export default FormSections;