// listingPresentation.js - Listing Presentation Cover Template
export default ({ formData, logos, theme, selectedBackground }) => {
  // Use new background system for cover image, fallback to old system
  const coverImage = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : formData.coverImage;
  
  return `
    <div class="page" style="
      background: #ffffff;
      color: #111827;
      font-family: 'Playfair Display', serif;
      position: relative;
      overflow: hidden;
      padding: 0;
      margin: 0;
    ">
      <!-- Main content container -->
      <div style="
        position: relative;
        height: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
      ">
        
        <!-- Header text with enhanced styling -->
        <div style="
          text-align: left;
          margin-bottom: 1rem;
          position: relative;
          z-index: 3;
          max-width: 50%;
        ">
          <h1 style="
            font-size: 4.5rem;
            font-weight: 300;
            line-height: 0.8;
            margin: 0;
            color: #1a1a1a;
            font-family: 'Playfair Display', serif;
            font-style: italic;
            letter-spacing: -2px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          ">${formData.reportType || 'Listing<br>Presentation'}</h1>
          
          <!-- Decorative script text with better styling -->
          <div style="
            font-family: 'Dancing Script', cursive;
            font-size: 2rem;
            color: ${theme.accent || '#B8860B'};
            margin-top: 0.75rem;
            font-weight: 500;
            opacity: 0.95;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          ">${formData.reportSubheadline || 'from listed to sold'}</div>
        </div>

        <!-- Main content area with agent photo and property background -->
        <div style="
          flex: 1;
          display: flex;
          align-items: flex-end;
          position: relative;
          margin-top: 1rem;
        ">
          <!-- Property background image - full width with diagonal cut -->
          ${coverImage ? `
            <div style="
              position: absolute;
              right: 0;
              bottom: 0;
              top: 0;
              left: 0;
              width: 100%;
              z-index: 1;
              background: url('${coverImage}') center/cover no-repeat;
              clip-path: polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%);
            ">
              <!-- Subtle overlay -->
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%);
              "></div>
            </div>
          ` : ''}
          
          <!-- Agent photo with enhanced styling -->
          ${formData.agentPhoto ? `
            <div style="
              position: relative;
              z-index: 2;
              margin-bottom: 4rem;
              margin-left: 0;
            ">
              <img src="${formData.agentPhoto}" alt="${formData.agentName || 'Agent'}" style="
                width: 320px;
                height: 400px;
                object-fit: cover;
                border-radius: 0;
                box-shadow: 0 25px 50px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.1);
                transition: transform 0.3s ease;
              " />
            </div>
          ` : ''}
        </div>

        <!-- Agent info bar at bottom -->
        <div style="
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(0,0,0,0.1);
        ">
          <div style="
            padding: 1.75rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <div>
              <h2 style="
                font-size: 1.75rem;
                font-weight: 700;
                margin: 0 0 0.25rem 0;
                color: #1a1a1a;
                font-family: 'Playfair Display', serif;
                text-transform: uppercase;
                letter-spacing: 2px;
              ">${formData.agentName || 'HARPER STONE'}</h2>
              
              <p style="
                font-size: 0.85rem;
                color: #666;
                margin: 0;
                text-transform: uppercase;
                letter-spacing: 3px;
                font-weight: 400;
              ">${formData.companyName ? formData.companyName : 'YOUR LOCAL REAL ESTATE EXPERT'}</p>
            </div>
            
            ${formData.companyLogo ? `
              <div style="margin-left: 2rem;">
                <img src="${formData.companyLogo}" alt="Company Logo" style="
                  max-height: 50px;
                  max-width: 150px;
                  opacity: 0.8;
                " />
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
};