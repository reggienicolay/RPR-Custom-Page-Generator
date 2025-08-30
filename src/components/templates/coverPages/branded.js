export default function branded({ formData, logos, theme = { primary: '#667eea', secondary: '#764ba2', accent: '#ff6b6b', text: '#111827', textLight: '#6b7280', white: '#ffffff' }, selectedBackground }) {
  const titleLine1 = (formData.reportType || 'Neighborhood Report').split(' ')[0] || 'Neighborhood';
  const titleLine2 = (formData.reportType || 'Neighborhood Report').replace(titleLine1, '').trim() || 'Report';
  
  // Use new background system for hero circle, fallback to old coverImage
  const hero = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos.coverImage || '');

  return `
    <div class="page" style="background:#fff; width:8.5in; height:11in; position:relative; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:1.25in 1in 0.25in 1in;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          ${logos.companyLogo
            ? `<img src="${logos.companyLogo}" alt="Company Logo" style="height:1.25rem; object-fit:contain;">`
            : `<div style="font-weight:900; letter-spacing:0.25rem; font-size:1.25rem; color:${theme.text};">${(formData.companyName || 'COMPANY NAME').toUpperCase()}</div>`
          }
        </div>
        <div style="color:${theme.textLight}; font-size:0.95rem; font-weight:500;">${formData.reportType || 'Report Name'}</div>
      </div>

      <div style="padding:0 1in; color:${theme.textLight}; font-size:1.35rem; font-weight:300;">${formData.propertyAddress || 'Livermore, California'}</div>

      <!-- Main content area with better positioning -->
      <div style="position:relative; padding:1.25in 1in 0 1in; min-height:400px;">
        <!-- Large title positioned to avoid circle -->
        <div style="width:60%; font-size:5.25rem; line-height:0.9; font-weight:900; color:${theme.text};">
          ${titleLine1}<br/>${titleLine2}
        </div>

        <!-- Hero circle positioned on right side -->
        ${hero ? `
          <div style="position:absolute; right:0; top:50%; transform:translateY(-50%); width:400px; height:400px;">
            <div style="position:absolute; inset:-20px; border-radius:50%; background:${theme.primary}; opacity:0.1;"></div>
            <div style="position:absolute; inset:-10px; border-radius:50%; background:${theme.secondary}; opacity:0.08;"></div>
            <div style="width:100%; height:100%; border-radius:50%; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.15); position:relative; z-index:2;">
              <img src="${hero}" alt="cover" style="width:100%; height:100%; object-fit:cover; object-position:center;"/>
            </div>
          </div>
        ` : `
          <!-- Fallback design when no image -->
          <div style="position:absolute; right:0; top:50%; transform:translateY(-50%); width:400px; height:400px;">
            <div style="position:absolute; inset:-20px; border-radius:50%; background:${theme.primary}; opacity:0.1;"></div>
            <div style="position:absolute; inset:-10px; border-radius:50%; background:${theme.secondary}; opacity:0.08;"></div>
            <div style="width:100%; height:100%; border-radius:50%; background:linear-gradient(135deg, ${theme.primary}, ${theme.secondary}); display:flex; align-items:center; justify-content:center; flex-direction:column; box-shadow:0 12px 40px rgba(0,0,0,0.15); position:relative; z-index:2;">
              <div style="color:${theme.white}; font-size:2.5rem; font-weight:100; margin-bottom:0.5rem; opacity:0.8;">PROPERTY</div>
              <div style="color:${theme.white}; font-size:1.2rem; font-weight:300; letter-spacing:0.15em; opacity:0.6;">REPORT</div>
            </div>
          </div>
        `}
      </div>

      <!-- Agent info positioned below main content -->
      <div style="padding:0 1in; margin-top:1rem; display:flex; gap:1.25rem; align-items:flex-start; position:relative; z-index:3;">
        <div style="width:84px; height:84px; border-radius:14px; overflow:hidden; border:1px solid #e5e7eb; background:#f3f4f6; display:flex; align-items:center; justify-content:center;">
          ${logos.agentPhoto
            ? `<img src="${logos.agentPhoto}" alt="Agent" style="width:100%; height:100%; object-fit:cover;">`
            : `
              <svg width="84" height="84" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.3"/>
                    <stop offset="60%" stop-color="${theme.secondary}" stop-opacity="0.5"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="12" fill="url(#g1)"/>
                <path d="M0,44 Q16,36 32,44 T64,44 V64 H0 Z" fill="${theme.accent}" opacity="0.6"/>
                <path d="M0,48 Q20,40 32,48 T64,48 V64 H0 Z" fill="${theme.primary}" opacity="0.8"/>
              </svg>`
          }
        </div>
        <div>
          <div style="font-size:1.1rem; color:${theme.text}; font-weight:500; margin-bottom:0.15rem;">${formData.agentName || 'Agent Name 1'}</div>
          <div style="font-size:0.95rem; color:${theme.primary}; margin-bottom:0.35rem;">${formData.agentTitle || 'REALTOR®'}</div>
          <div style="font-size:0.85rem; color:${theme.textLight}; margin-bottom:0.15rem;">Arizona Real Estate License #${formData.licenseNumber || '122343'}</div>
          <div style="font-size:0.9rem; color:${theme.textLight}; margin-bottom:0.1rem;">${formData.agentPhone || '(713) 456-1235'}</div>
          <div style="font-size:0.9rem; color:${theme.textLight}; margin-bottom:0.1rem;">${formData.agentEmail || 'email@metrorealty.com'}</div>
          <div style="font-size:0.9rem; color:${theme.primary};">https://metrorealty.com</div>
        </div>
      </div>

      <!-- Reduced height waves -->
      <div style="position:absolute; left:0; right:0; bottom:0; height:30%; pointer-events:none;">
        <svg viewBox="0 0 1600 700" preserveAspectRatio="none" style="width:100%; height:100%; display:block;">
          <path d="M0 400 C 300 320 550 480 800 440 C 1050 400 1250 460 1600 400 L 1600 700 L 0 700 Z" fill="${theme.primary}" opacity="0.3"/>
          <path d="M0 440 C 280 360 560 520 840 480 C 1120 440 1360 520 1600 480 L 1600 700 L 0 700 Z" fill="${theme.secondary}" opacity="0.35"/>
          <path d="M0 490 C 320 410 640 570 960 530 C 1280 490 1440 570 1600 540 L 1600 700 L 0 700 Z" fill="${theme.accent}" opacity="0.25"/>
          <path d="M0 540 C 360 460 720 600 1080 560 C 1440 520 1520 600 1600 580 L 1600 700 L 0 700 Z" fill="${theme.primary}" opacity="0.2"/>
        </svg>
      </div>

      <!-- Footer positioned higher -->
      <div style="position:absolute; bottom:2rem; left:1rem; right:1rem; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:${theme.textLight};">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <img src="src/assets/logo-black-color.svg" alt="RPR Logo" style="height:28px; width:auto; object-fit:contain;"/>
        </div>
        <div>Copyright 2025 Realtors Property Resource® LLC. All Rights Reserved.</div>
      </div>
    </div>
  `;
}