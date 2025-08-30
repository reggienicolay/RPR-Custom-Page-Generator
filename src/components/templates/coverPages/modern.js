export default function modern({ formData, logos, theme = { primary: '#667eea', secondary: '#764ba2', accent: '#ff6b6b', text: '#333', textLight: '#666', white: '#ffffff' }, selectedBackground }) {
  // DEBUG: Let's see what we're getting
  console.log('selectedBackground object:', selectedBackground);
  
  // Use new background system for hero section, fallback to old coverImage
  const hero = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos?.coverImage || '');
  console.log('Final hero URL:', hero);

  
  // Page background stays simple
  const pageStyle = `background: ${theme.white}; position: relative;`;
  
  return `
    <div class="page" style="${pageStyle}">
      
      <!-- header -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:2rem;">
        <div style="display:flex;align-items:center;">
          ${logos?.companyLogo ? `<img src="${logos.companyLogo}" alt="Company Logo" style="height:2.5rem;margin-right:1rem;object-fit:contain;">` : ''}
          <h1 style="font-size:2rem;font-weight:900;letter-spacing:.1rem;margin:0;color:${theme.text};">${formData?.companyName || 'METRO REALTY'}</h1>
        </div>
        <div style="text-align:right;color:${theme.textLight};font-size:1.25rem;font-weight:300;margin-top:.5rem;">
          ${formData?.reportType || ''}
        </div>
      </div>

      <!-- subhead -->
      <div style="padding:0 2rem 1.5rem 2rem;">
        <h2 style="font-size:1.5rem;color:${theme.textLight};font-weight:300;margin:0;">${formData?.propertyAddress || 'Livermore, California'}</h2>
      </div>

      <!-- hero -->
      <div style="margin:0 2rem 2rem 2rem;">
        <div style="height:20rem;border-radius:1rem;position:relative;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1);background:${hero ? 'transparent' : `linear-gradient(to bottom,${theme.primary} 0%,${theme.primary} 60%,${theme.secondary} 60%,${theme.accent} 100%)`};">
          ${hero ? `<img src="${hero}" alt="Cover" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>` : ''}
          <div style="position:absolute;bottom:0;left:0;right:0;height:8rem;">
            <svg style="width:100%;height:100%;" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path d="M0,60 C100,20 200,80 400,30 L400,100 L0,100 Z" fill="${theme.secondary}" opacity="0.8"/>
              <path d="M0,80 C150,40 250,90 400,50 L400,100 L0,100 Z" fill="${theme.accent}" opacity="0.9"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- agent card -->
      <div style="display:flex;gap:1.5rem;padding:0 2rem;margin-bottom:2rem;">
        <div style="flex:1;background:${theme.white};border-radius:.5rem;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:1.5rem;border:1px solid #f0f0f0;">
          <div style="width:5rem;height:5rem;border-radius:.5rem;margin-bottom:1rem;overflow:hidden;${logos?.agentPhoto ? '' : `background:linear-gradient(to bottom,${theme.primary} 60%,${theme.secondary} 60%);`}">
            ${logos?.agentPhoto ? `<img src="${logos.agentPhoto}" style="width:100%;height:100%;object-fit:cover;">` : ''}
          </div>
          <h3 style="font-size:1.125rem;font-weight:400;color:${theme.text};margin:0 0 .25rem 0;">${formData?.agentName || 'Agent Name 1'}</h3>
          <div style="color:${theme.primary};font-size:.875rem;margin-bottom:.5rem;font-weight:500;">${formData?.agentTitle || 'REALTOR®'}</div>
          <div style="color:${theme.textLight};font-size:.875rem;margin-bottom:.25rem;">Arizona Real Estate License #${formData?.licenseNumber || '122343'}</div>
          <div style="color:${theme.textLight};font-size:.875rem;margin-bottom:.25rem;">${formData?.agentPhone || '(713) 456-1235'}</div>
          <div style="color:${theme.textLight};font-size:.875rem;margin-bottom:.25rem;">${formData?.agentEmail || 'email@metrorealty.com'}</div>
          <div style="color:${theme.primary};font-size:.875rem;">https://metrorealty.com</div>
        </div>
      </div>

      <!-- footer -->
      <div style="position:absolute;bottom:2rem;left:2rem;right:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;">
            <div style="width:2rem;height:2rem;background:${theme.text};border-radius:.25rem;display:flex;align-items:center;justify-content:center;margin-right:.5rem;">
              <span style="color:${theme.white};font-weight:bold;font-size:.75rem;">RPR</span>
            </div>
          </div>
          <div style="text-align:right;font-size:.75rem;color:${theme.textLight};">
            <div>Copyright 2025 Realtors Property Resource® LLC. All Rights Reserved.</div>
            <div>Information is not guaranteed. Equal Housing Opportunity.</div>
          </div>
          <div style="width:1.5rem;height:1.5rem;background:${theme.text};border-radius:.25rem;"></div>
        </div>
      </div>
    </div>
  `;
}