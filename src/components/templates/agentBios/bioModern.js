// bioModern.js - Modern Agent Bio Template (Clean backgrounds)
export const bioModern = ({ formData, logos, theme }) => {
  return `
    <div class="page" style="
      background: ${formData.coverImage ? `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(${formData.coverImage})` : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'};
      background-size: cover;
      background-position: center;
      color: #111827;
      font-family: 'Inter', sans-serif;
      position: relative;
      overflow: hidden;
      padding: 0;
      margin: 0;
    ">
      <!-- Modern asymmetric design -->
      <div style="
        display: grid;
        grid-template-columns: 280px 1fr;
        min-height: 100%;
      ">
        <!-- Left sidebar with gradient -->
        <div style="
          background: linear-gradient(180deg, ${theme.primary || '#059669'} 0%, ${theme.secondary || '#10b981'} 100%);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          color: white;
          position: relative;
        ">
          <!-- Geometric pattern overlay -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%), 
              linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%), 
              linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%);
            background-size: 30px 30px;
            background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
          "></div>
          
          <div style="position: relative; z-index: 1;">
            ${formData.agentPhoto ? `
              <div style="
                width: 140px;
                height: 140px;
                border-radius: 20px;
                background: rgba(255,255,255,0.1);
                padding: 8px;
                margin-bottom: 1.5rem;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255,255,255,0.2);
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
              ">
                <img src="${formData.agentPhoto}" alt="${formData.agentName || 'Agent'}" style="
                  width: 100%;
                  height: 100%;
                  border-radius: 12px;
                  object-fit: cover;
                " />
              </div>
            ` : ''}
            
            ${formData.agentExperience ? `
              <div style="
                background: rgba(255,255,255,0.2);
                color: white;
                padding: 0.75rem 1.25rem;
                border-radius: 25px;
                font-weight: 600;
                font-size: 0.9rem;
                backdrop-filter: blur(10px);
                margin-bottom: 1.5rem;
                border: 1px solid rgba(255,255,255,0.3);
              ">${formData.agentExperience}+ Years Experience</div>
            ` : ''}
            
            <!-- Quick contact buttons -->
            <div style="margin-top: auto; width: 100%;">
              ${formData.agentPhone ? `
                <a href="tel:${formData.agentPhone}" style="
                  display: block;
                  background: rgba(255,255,255,0.15);
                  color: white;
                  padding: 0.75rem;
                  border-radius: 12px;
                  text-decoration: none;
                  font-size: 0.9rem;
                  font-weight: 500;
                  margin-bottom: 0.75rem;
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255,255,255,0.2);
                  transition: all 0.2s;
                ">📞 ${formData.agentPhone}</a>
              ` : ''}
              
              ${formData.agentEmail ? `
                <a href="mailto:${formData.agentEmail}" style="
                  display: block;
                  background: rgba(255,255,255,0.15);
                  color: white;
                  padding: 0.75rem;
                  border-radius: 12px;
                  text-decoration: none;
                  font-size: 0.9rem;
                  font-weight: 500;
                  margin-bottom: 0.75rem;
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255,255,255,0.2);
                  word-break: break-word;
                ">✉️ Contact Me</a>
              ` : ''}
            </div>
            
            ${formData.companyLogo ? `
              <div style="margin-top: 1rem;">
                <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
                  max-height: 40px;
                  max-width: 120px;
                  opacity: 0.8;
                  filter: brightness(0) invert(1);
                " />
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Main content area -->
        <div style="padding: 2rem 2.5rem;">
          <!-- Modern header -->
          <div style="margin-bottom: 2rem;">
            <h1 style="
              font-size: 2.75rem;
              font-weight: 700;
              margin: 0 0 0.5rem 0;
              color: #111827;
              line-height: 1.1;
              letter-spacing: -0.5px;
            ">${formData.agentName || 'Agent Name'}</h1>
            
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
              <h2 style="
                font-size: 1.25rem;
                font-weight: 500;
                margin: 0;
                color: ${theme.primary || '#059669'};
              ">${formData.agentTitle || 'REALTOR®'}</h2>
              
              <div style="
                width: 40px;
                height: 2px;
                background: linear-gradient(90deg, ${theme.primary || '#059669'}, ${theme.secondary || '#10b981'});
              "></div>
            </div>
            
            ${formData.companyName ? `
              <p style="
                font-size: 1rem;
                margin: 0;
                color: #6b7280;
                font-weight: 500;
              ">${formData.companyName}</p>
            ` : ''}
          </div>
          
          <!-- About section with clean styling -->
          ${formData.agentBio ? `
            <div style="margin-bottom: 2.5rem;">
              <div style="
                padding: 2rem;
                border-radius: 16px;
                border-left: 6px solid ${theme.primary || '#059669'};
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                position: relative;
              ">
                <h3 style="
                  color: ${theme.primary || '#059669'};
                  font-size: 1.1rem;
                  margin: 0 0 1rem 0;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">About Me</h3>
                
                <p style="
                  line-height: 1.8;
                  margin: 0;
                  color: #374151;
                  font-size: 1rem;
                  position: relative;
                  z-index: 1;
                ">${formData.agentBio}</p>
              </div>
            </div>
          ` : ''}
          
          <!-- Clean card grid for specialties and credentials -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
            ${formData.agentSpecialties ? `
              <div style="
                padding: 1.75rem;
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                position: relative;
                overflow: hidden;
                border: 1px solid #e5e7eb;
              ">
                <h4 style="
                  color: #374151;
                  font-size: 1.1rem;
                  margin: 0 0 1rem 0;
                  font-weight: 600;
                  position: relative;
                  z-index: 1;
                ">Specialties</h4>
                
                <p style="
                  line-height: 1.6;
                  margin: 0;
                  color: #6b7280;
                  font-size: 0.95rem;
                  position: relative;
                  z-index: 1;
                ">${formData.agentSpecialties}</p>
              </div>
            ` : ''}
            
            ${formData.agentAwards ? `
              <div style="
                padding: 1.75rem;
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                position: relative;
                overflow: hidden;
                border: 1px solid #e5e7eb;
              ">
                <h4 style="
                  color: #374151;
                  font-size: 1.1rem;
                  margin: 0 0 1rem 0;
                  font-weight: 600;
                  position: relative;
                  z-index: 1;
                ">Awards</h4>
                
                <p style="
                  line-height: 1.6;
                  margin: 0;
                  color: #6b7280;
                  font-size: 0.95rem;
                  position: relative;
                  z-index: 1;
                ">${formData.agentAwards}</p>
              </div>
            ` : ''}
          </div>
          
          ${formData.agentEducation ? `
            <div style="margin-bottom: 2rem;">
              <div style="
                padding: 1.75rem;
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                position: relative;
                overflow: hidden;
                border: 1px solid #e5e7eb;
              ">
                <h4 style="
                  color: #374151;
                  font-size: 1.1rem;
                  margin: 0 0 1rem 0;
                  font-weight: 600;
                  position: relative;
                  z-index: 1;
                ">Education & Certifications</h4>
                
                <p style="
                  line-height: 1.6;
                  margin: 0;
                  color: #6b7280;
                  font-size: 0.95rem;
                  position: relative;
                  z-index: 1;
                ">${formData.agentEducation}</p>
              </div>
            </div>
          ` : ''}
          
          <!-- License info with clean styling -->
          ${formData.licenseNumber ? `
            <div style="
              text-align: center;
              padding: 1rem;
              border-radius: 12px;
              margin-bottom: 1rem;
              border: 1px solid #e5e7eb;
            ">
              <p style="
                font-size: 0.9rem;
                color: #475569;
                margin: 0;
              "><strong>License #:</strong> ${formData.licenseNumber}</p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
};