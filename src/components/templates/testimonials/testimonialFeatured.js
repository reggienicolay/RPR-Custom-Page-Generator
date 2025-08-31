// testimonialFeatured.js - Single Featured Testimonial with Print-Friendly Design
export const testimonialFeatured = ({ formData, logos, theme, testimonials }) => {
  // Use the first testimonial, or create a sample one
  const testimonial = testimonials[0] || {
    clientName: 'Your Client Name',
    clientLocation: 'Your City, State',
    testimonialText: 'Add your most powerful client testimonial here to showcase the exceptional results and service you provide.',
    rating: '5',
    propertyType: 'Single Family',
    saleDate: '2024-01-01',
    clientPhoto: null,
    propertyImage: null
  };

  return `
    <div class="page" style="
      position: relative;
      background: #ffffff;
      color: #1f2937;
      font-family: 'Georgia', serif;
      width: 8.5in;
      height: 11in;
      overflow: hidden;
    ">
      <!-- Clean Header -->
      <header style="
        background: linear-gradient(135deg, ${theme.primary || '#1e40af'} 0%, ${theme.secondary || '#7c3aed'} 100%);
        color: white;
        padding: 2rem 2rem 1.5rem;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <!-- Subtle header decoration -->
        <div style="
          position: absolute;
          top: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        "></div>
        
        <div style="position: relative; z-index: 2;">
          ${formData.companyLogo ? `
            <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
              max-height: 60px;
              margin-bottom: 1rem;
              filter: brightness(0) invert(1);
            " />
          ` : ''}
          
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
            <i class="fas fa-quote-left" style="font-size: 2rem; opacity: 0.8;"></i>
            <h1 style="
              font-size: 2rem;
              font-weight: 400;
              margin: 0;
              letter-spacing: 0.5px;
            ">Client Success Story</h1>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main style="
        padding: 3rem 2rem 2rem;
        text-align: center;
        max-width: 700px;
        margin: 0 auto;
      ">
        <!-- Star Rating with Font Awesome -->
        <div style="
          display: flex;
          gap: 4px;
          margin-bottom: 2rem;
          justify-content: center;
        ">
          ${Array.from({length: 5}, (_, i) => `
            <i class="fa${i < parseInt(testimonial.rating || 5) ? 's' : 'r'} fa-star" style="
              color: ${i < parseInt(testimonial.rating || 5) ? '#fbbf24' : '#e5e7eb'};
              font-size: 1.8rem;
            "></i>
          `).join('')}
        </div>
        
        <!-- Main Testimonial Quote -->
        <blockquote style="
          font-size: 1.5rem;
          font-style: italic;
          line-height: 1.6;
          margin: 0 0 2.5rem 0;
          font-weight: 300;
          color: #374151;
          position: relative;
        ">
          <i class="fas fa-quote-left" style="
            position: absolute;
            top: -20px;
            left: -30px;
            font-size: 3rem;
            color: ${theme.primary || '#1e40af'};
            opacity: 0.2;
          "></i>
          "${testimonial.testimonialText}"
        </blockquote>
        
        <!-- Client Information -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 2rem;
          background: #f9fafb;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
        ">
          ${testimonial.clientPhoto ? `
            <img src="${testimonial.clientPhoto}" alt="${testimonial.clientName}" style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              object-fit: cover;
              border: 3px solid ${theme.primary || '#1e40af'};
            " />
          ` : ''}
          
          <div style="text-align: left;">
            <h3 style="
              font-size: 1.3rem;
              font-weight: 600;
              margin: 0 0 0.5rem 0;
              color: ${theme.primary || '#1e40af'};
            ">${testimonial.clientName}</h3>
            
            <p style="
              font-size: 1rem;
              margin: 0 0 0.5rem 0;
              color: #6b7280;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            ">
              <i class="fas fa-map-marker-alt" style="color: ${theme.primary || '#1e40af'}; font-size: 0.9rem;"></i>
              ${testimonial.clientLocation}
            </p>
            
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              ${testimonial.propertyType ? `
                <span style="
                  background: ${theme.primary || '#1e40af'}15;
                  color: ${theme.primary || '#1e40af'};
                  padding: 0.4rem 0.8rem;
                  border-radius: 16px;
                  font-size: 0.85rem;
                  font-weight: 500;
                  display: flex;
                  align-items: center;
                  gap: 0.4rem;
                ">
                  <i class="fas fa-home" style="font-size: 0.75rem;"></i>
                  ${testimonial.propertyType}
                </span>
              ` : ''}
              
              ${testimonial.saleDate ? `
                <span style="
                  background: ${theme.secondary || '#7c3aed'}15;
                  color: ${theme.secondary || '#7c3aed'};
                  padding: 0.4rem 0.8rem;
                  border-radius: 16px;
                  font-size: 0.85rem;
                  font-weight: 500;
                  display: flex;
                  align-items: center;
                  gap: 0.4rem;
                ">
                  <i class="fas fa-calendar-alt" style="font-size: 0.75rem;"></i>
                  ${new Date(testimonial.saleDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              ` : ''}
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div style="text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="fas fa-award" style="font-size: 1.3rem; color: ${theme.primary || '#1e40af'};"></i>
            <h2 style="
              font-size: 1.6rem;
              font-weight: 500;
              margin: 0;
              color: ${theme.primary || '#1e40af'};
            ">Experience the Same Excellence</h2>
          </div>
          
          <p style="
            font-size: 1rem;
            margin: 0 0 1.5rem 0;
            color: #6b7280;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          ">Join our satisfied clients and discover what exceptional real estate service looks like</p>
        </div>
      </main>

      <!-- Cool Footer Design -->
      <footer style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, ${theme.primary || '#1e40af'} 0%, ${theme.secondary || '#7c3aed'} 100%);
        color: white;
        padding: 2rem;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <!-- Footer decorative elements -->
        <div style="
          position: absolute;
          top: -100px;
          left: -100px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
        "></div>
        <div style="
          position: absolute;
          top: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
        "></div>
        
        <!-- Wave pattern -->
        <svg style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 40px;
          margin-top: -1px;
        " viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0,20 C300,5 600,35 900,15 C1050,5 1150,25 1200,20 L1200,0 L0,0 Z" fill="white" opacity="0.1"/>
          <path d="M0,25 C250,10 550,30 800,18 C950,10 1100,28 1200,22 L1200,0 L0,0 Z" fill="white" opacity="0.05"/>
        </svg>
        
        <div style="position: relative; z-index: 2;">
          <!-- Agent Contact Info -->
          ${formData.agentName ? `
            <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem;">
              <i class="fas fa-user-tie" style="font-size: 1.2rem; opacity: 0.8;"></i>
              <h3 style="
                font-size: 1.4rem;
                font-weight: 600;
                margin: 0;
              ">${formData.agentName}</h3>
            </div>
          ` : ''}
          
          ${formData.agentTitle ? `
            <p style="
              font-size: 1rem;
              margin: 0 0 1.5rem 0;
              opacity: 0.9;
            ">${formData.agentTitle}</p>
          ` : ''}
          
          <div style="
            display: flex;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
          ">
            ${formData.agentPhone ? `
              <a href="tel:${formData.agentPhone}" style="
                color: white;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 0.7rem;
                padding: 0.8rem 1.5rem;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 25px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
              ">
                <i class="fas fa-phone" style="font-size: 1.1rem;"></i>
                <div>
                  <div style="font-size: 0.8rem; opacity: 0.8;">Call</div>
                  <div style="font-size: 1rem; font-weight: 600;">${formData.agentPhone}</div>
                </div>
              </a>
            ` : ''}
            
            ${formData.agentEmail ? `
              <a href="mailto:${formData.agentEmail}" style="
                color: white;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 0.7rem;
                padding: 0.8rem 1.5rem;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 25px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
              ">
                <i class="fas fa-envelope" style="font-size: 1.1rem;"></i>
                <div>
                  <div style="font-size: 0.8rem; opacity: 0.8;">Email</div>
                  <div style="font-size: 1rem; font-weight: 600;">${formData.agentEmail}</div>
                </div>
              </a>
            ` : ''}
          </div>
        </div>
        
        <!-- RPR Footer -->
        <div style="
          position: absolute;
          bottom: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          opacity: 0.6;
        ">
          <img src="src/assets/logo-black-color.svg" alt="RPR Logo" style="height:16px; width:auto; object-fit:contain; filter: brightness(0) invert(1);"/>
          Copyright 2025 Realtors Property Resource® LLC. All Rights Reserved.
        </div>
      </footer>
    </div>
  `;
};