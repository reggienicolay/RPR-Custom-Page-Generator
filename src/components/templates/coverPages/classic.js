export default function classic({ formData, logos, theme = { primary: '#667eea', secondary: '#764ba2', accent: '#ff6b6b', text: '#2c3e50', textLight: '#666', white: '#ffffff' }, selectedBackground }) {
  // Use new background system for page background, fallback to old coverImage
  const hero = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos.coverImage || '');
  
  const backgroundImage = hero ? `url('${hero}')` : `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:1" />
          <stop offset="70%" style="stop-color:${theme.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${theme.accent};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1000" height="1000" fill="url(#skyGrad)"/>
      <g fill="${theme.accent}" opacity="0.3">
        <polygon points="0,700 200,300 400,500 600,200 800,400 1000,300 1000,1000 0,1000"/>
      </g>
      <g fill="${theme.primary}" opacity="0.4">
        <circle cx="150" cy="600" r="30"/>
        <circle cx="300" cy="650" r="25"/>
        <circle cx="500" cy="580" r="35"/>
      </g>
    </svg>
  `)}`;

  return `
    <div class="page" style="background-image: ${backgroundImage}; background-size: cover; background-position: center; position: relative; width: 8.5in; height: 11in;">
      
      <!-- Diagonal white overlay -->
      <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 68%; background: rgba(255,255,255,0.98); clip-path: polygon(0 30%, 100% 0%, 100% 100%, 0% 100%); box-shadow: 0 -10px 30px rgba(0,0,0,0.1);"></div>
      
      <!-- Main content area -->
      <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 68%; padding: 3rem 3rem 2rem 3rem; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Top section: Company logo -->
        <div style="margin-bottom: 1rem;">
          ${logos.companyLogo ? 
            `<img src="${logos.companyLogo}" alt="Company Logo" style="height: 3rem; object-fit: contain;">` : 
            `<div style="height: 3rem; width: 12rem; background: ${theme.text}; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; letter-spacing: 0.1em;">${(formData.companyName || 'COMPANY NAME').toUpperCase()}</div>`
          }
        </div>
        
        <!-- Middle section: Property address and title -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
          <h2 style="font-size: 1.4rem; font-weight: 300; color: ${theme.textLight}; margin: 0 0 1.5rem 0; letter-spacing: 0.05em;">
            ${formData.propertyAddress || 'Scottsdale, AZ 85262'}
          </h2>
          <h1 style="font-size: 4.5rem; font-weight: 900; color: ${theme.text}; margin: 0; line-height: 0.85; letter-spacing: -0.02em;">
            ${formData.reportType ? formData.reportType.split(' ').slice(0, 2).join('<br>') : 'Neighborhood<br>Report'}
          </h1>
        </div>
        
        <!-- Bottom section: Agent information card -->
        <div style="display: flex; align-items: center; gap: 1.5rem; background: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); margin-top: 2rem;">
          
          <!-- Agent photo -->
          <div style="width: 5rem; height: 5rem; border-radius: 50%; overflow: hidden; border: 3px solid ${theme.primary}; background: ${theme.primary}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            ${logos.agentPhoto ? 
              `<img src="${logos.agentPhoto}" alt="Agent Photo" style="width: 100%; height: 100%; object-fit: cover;">` :
              `<span style="color: white; font-weight: 700; font-size: 1.8rem;">${(formData.agentName || 'A').charAt(0)}</span>`
            }
          </div>
          
          <!-- Agent contact info -->
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div>
                <div style="font-size: 1.3rem; font-weight: 700; color: ${theme.text}; margin-bottom: 0.25rem;">
                  ${formData.agentName || 'Agent Name'}
                </div>
                <div style="font-size: 1rem; font-weight: 500; color: ${theme.primary}; margin-bottom: 0.5rem;">
                  ${formData.agentTitle || 'REALTOR®'}
                </div>
              </div>
              <div style="text-align: right; font-size: 0.9rem; color: ${theme.textLight};">
                ${formData.reportDate ? new Date(formData.reportDate).toLocaleDateString() : new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem;">
              <div style="color: ${theme.textLight};">
                <strong>License:</strong> #${formData.licenseNumber || '122343'}
              </div>
              <div style="color: ${theme.textLight};">
                <strong>Phone:</strong> ${formData.agentPhone || '(555) 123-4567'}
              </div>
              <div style="color: ${theme.textLight}; grid-column: 1 / -1;">
                <strong>Email:</strong> <span style="color: ${theme.primary};">${formData.agentEmail || 'agent@company.com'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer with RPR branding -->
      <div style="position: absolute; bottom: 1.5rem; left: 2rem; right: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="width: 3rem; height: 2.5rem; background: rgba(255,255,255,0.95); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; color: ${theme.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            RPR
          </div>
          <div style="text-align: right; font-size: 0.7rem; color: rgba(255,255,255,0.9);">
            <div>Copyright 2025 Realtors Property Resource® LLC • All Rights Reserved • Equal Housing Opportunity</div>
          </div>
        </div>
      </div>
    </div>
  `;
}