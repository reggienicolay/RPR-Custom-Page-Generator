export default function elegant({ formData, logos, theme = { primary: '#667eea', secondary: '#764ba2', accent: '#ff6b6b', text: '#1f2937', textLight: '#6b7280', white: '#ffffff' }, selectedBackground }) {
  // Use new background system for hero image, fallback to old coverImage
  const hero = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos?.coverImage || '');
  
  return `
    <div class="page" style="background:${theme.white};position:relative;overflow:hidden;width:8.5in;height:11in;">
      
      <!-- Subtle geometric accents -->
      <div style="position:absolute;top:-5%;right:-8%;width:25%;height:25%;background:${theme.primary}08;border-radius:50%;"></div>
      <div style="position:absolute;bottom:-10%;left:-5%;width:30%;height:20%;background:${theme.accent}05;border-radius:0 100% 0 50%;"></div>
      <div style="position:absolute;top:15%;left:75%;width:8%;height:8%;background:${theme.secondary}10;transform:rotate(45deg);border-radius:0.5rem;"></div>

      <!-- Header with minimal branding -->
      <div style="padding:2.5rem 2.5rem 1rem 2.5rem;border-bottom:1px solid ${theme.primary}15;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;">
            ${logos?.companyLogo ? 
              `<img src="${logos.companyLogo}" alt="Logo" style="height:2.5rem;object-fit:contain;margin-right:1rem;">` : 
              `<div style="width:3rem;height:3rem;background:${theme.primary};border-radius:0.5rem;display:flex;align-items:center;justify-content:center;margin-right:1rem;">
                <span style="color:${theme.white};font-weight:700;font-size:1rem;">${(formData?.companyName || 'CR').substring(0,2)}</span>
              </div>`
            }
            <div>
              <h1 style="font-size:1.8rem;font-weight:600;color:${theme.text};margin:0;letter-spacing:-0.02em;">${formData?.companyName || 'Premium Realty'}</h1>
              <div style="width:3rem;height:3px;background:linear-gradient(90deg,${theme.primary},${theme.accent});margin-top:0.5rem;border-radius:2px;"></div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="color:${theme.primary};font-weight:600;font-size:1rem;margin-bottom:0.25rem;">
              ${formData?.reportType || 'Market Report'}
            </div>
            <div style="color:${theme.textLight};font-size:0.8rem;">
              ${formData.reportDate ? new Date(formData.reportDate).toLocaleDateString() : new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <!-- Main content with asymmetric layout -->
      <div style="padding:2.5rem;display:grid;grid-template-columns:1.2fr 0.8fr;gap:3rem;min-height:60%;">
        
        <!-- Left content area -->
        <div style="display:flex;flex-direction:column;justify-content:center;">
          
          <!-- Property title with color accent -->
          <div style="margin-bottom:2rem;">
            <div style="display:inline-block;background:${theme.primary}15;color:${theme.primary};font-size:0.8rem;font-weight:600;padding:0.5rem 1rem;border-radius:2rem;margin-bottom:1rem;letter-spacing:0.05em;">
              FEATURED PROPERTY
            </div>
            <h2 style="font-size:2.8rem;color:${theme.text};font-weight:300;margin:0;line-height:1.1;letter-spacing:-0.02em;">
              ${formData?.propertyAddress || '1234 Executive Boulevard'}
            </h2>
          </div>

          <!-- Property details with themed styling -->
          ${(formData?.price || formData?.bedrooms || formData?.bathrooms || formData?.sqft) ? `
          <div style="margin-bottom:2.5rem;">
            ${formData?.price ? `
            <!-- Price row -->
            <div style="display:flex;margin-bottom:1.5rem;">
              <div style="text-align:center;">
                <div style="font-size:2.2rem;font-weight:700;color:${theme.primary};margin-bottom:0.25rem;">
                  ${formData.price}
                </div>
                <div style="font-size:0.8rem;color:${theme.textLight};text-transform:uppercase;letter-spacing:0.1em;">List Price</div>
              </div>
            </div>
            ` : ''}
            
            ${(formData?.bedrooms || formData?.bathrooms || formData?.sqft) ? `
            <!-- Bed/Bath/SqFt row -->
            <div style="display:flex;gap:2rem;">
              ${formData?.bedrooms ? `
              <div style="text-align:center;">
                <div style="font-size:2.2rem;font-weight:700;color:${theme.text};margin-bottom:0.25rem;">
                  ${formData.bedrooms}
                </div>
                <div style="font-size:0.8rem;color:${theme.textLight};text-transform:uppercase;letter-spacing:0.1em;">Bedrooms</div>
              </div>
              ` : ''}
              ${formData?.bathrooms ? `
              <div style="text-align:center;">
                <div style="font-size:2.2rem;font-weight:700;color:${theme.text};margin-bottom:0.25rem;">
                  ${formData.bathrooms}
                </div>
                <div style="font-size:0.8rem;color:${theme.textLight};text-transform:uppercase;letter-spacing:0.1em;">Bathrooms</div>
              </div>
              ` : ''}
              ${formData?.sqft ? `
              <div style="text-align:center;">
                <div style="font-size:2.2rem;font-weight:700;color:${theme.text};margin-bottom:0.25rem;">
                  ${formData.sqft}
                </div>
                <div style="font-size:0.8rem;color:${theme.textLight};text-transform:uppercase;letter-spacing:0.1em;">Square Feet</div>
              </div>
              ` : ''}
            </div>
            ` : ''}
          </div>
          ` : ''}

          <!-- Agent card with modern styling -->
          <div style="padding:1.5rem 0;position:relative;">
            <div style="display:flex;align-items:flex-start;gap:1rem;">
              <div style="width:8rem;height:8rem;border-radius:50%;overflow:hidden;background:${theme.primary};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${logos?.agentPhoto ? 
                  `<img src="${logos.agentPhoto}" style="width:100%;height:100%;object-fit:cover;">` : 
                  `<span style="color:${theme.white};font-weight:600;font-size:1.2rem;">${(formData?.agentName || 'A').charAt(0)}</span>`
                }
              </div>
              <div style="flex:1;">
                <div style="font-weight:600;color:${theme.text};font-size:1.1rem;margin-bottom:0.25rem;">
                  ${formData?.agentName || 'Agent Name'}
                </div>
                <div style="color:${theme.primary};font-size:0.9rem;margin-bottom:0.75rem;font-weight:500;">
                  ${formData?.agentTitle || 'REALTOR®'}
                </div>
                <div style="font-size:0.85rem;color:${theme.textLight};line-height:1.4;">
                  <div style="margin-bottom:0.25rem;"><strong>License:</strong> #${formData?.licenseNumber || '122343'}</div>
                  <div style="margin-bottom:0.25rem;"><strong>Phone:</strong> ${formData?.agentPhone || '(555) 123-4567'}</div>
                  <div><strong>Email:</strong> ${formData?.agentEmail || 'agent@company.com'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right image area with creative framing -->
        <div style="position:relative;display:flex;align-items:center;">
          ${hero ? `
          <div style="width:100%;height:24rem;position:relative;">
            <div style="position:absolute;inset:0;border-radius:1rem;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.15);">
              <img src="${hero}" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div style="position:absolute;top:-0.5rem;right:-0.5rem;width:3rem;height:3rem;background:${theme.accent};border-radius:50%;border:4px solid ${theme.white};box-shadow:0 4px 12px rgba(0,0,0,0.15);"></div>
            <div style="position:absolute;bottom:-0.5rem;left:-0.5rem;width:2rem;height:2rem;background:${theme.primary};border-radius:0.25rem;transform:rotate(45deg);border:3px solid ${theme.white};box-shadow:0 4px 12px rgba(0,0,0,0.15);"></div>
          </div>
          ` : `
          <div style="width:100%;height:24rem;background:linear-gradient(135deg,${theme.primary}15,${theme.accent}08);border:2px dashed ${theme.primary}30;border-radius:1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
            <div style="width:4rem;height:4rem;background:${theme.primary}20;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.primary}" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <div style="font-size:1rem;font-weight:500;color:${theme.primary};margin-bottom:0.5rem;">Upload Property Image</div>
            <div style="font-size:0.8rem;color:${theme.textLight};">Showcase your listing</div>
          </div>
          `}
        </div>
      </div>

      <!-- Footer with minimal RPR branding -->
      <div style="position:absolute;bottom:2rem;left:2.5rem;right:2.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1.5rem;border-top:1px solid ${theme.primary}10;">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div style="width:2.5rem;height:2rem;background:${theme.primary};color:${theme.white};border-radius:0.25rem;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;">
              RPR
            </div>
            <div style="color:${theme.textLight};font-size:0.8rem;font-weight:500;">
              Powered by Realtors Property Resource®
            </div>
          </div>
          <div style="text-align:right;font-size:0.7rem;color:${theme.textLight};">
            © 2025 Realtors Property Resource® LLC • All Rights Reserved • Equal Housing Opportunity
          </div>
        </div>
      </div>
    </div>
  `;
}