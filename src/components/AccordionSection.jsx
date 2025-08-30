// components/AccordionSection.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionSection = ({ icon: Icon, title, children, defaultOpenLg = true }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const sync = () => setOpen(defaultOpenLg ? mql.matches : false);
    sync();
    
    if (mql.addEventListener) {
      mql.addEventListener('change', sync);
    } else {
      // Fallback for older browsers
      mql.addListener(sync);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', sync);
      } else {
        mql.removeListener(sync);
      }
    };
  }, [defaultOpenLg]);

  return (
    <div className="card">
      <button 
        type="button" 
        onClick={() => setOpen(o => !o)} 
        className="w-full flex items-center justify-between gap-2 mb-4 text-left"
        aria-expanded={open}
        aria-controls={`accordion-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="inline-flex items-center text-lg font-semibold text-gray-800">
          {Icon && <Icon className="w-5 h-5 mr-2 text-blue-600" />}
          {title}
        </span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      {open && (
        <div 
          id={`accordion-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="mt-2"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;