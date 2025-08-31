// testimonialCards.js - Multiple Testimonials in Card Layout with Font Awesome
export const testimonialCards = ({ formData, logos, theme, testimonials }) => {
  // Use up to 3 testimonials, fill with sample data if needed
  const displayTestimonials = testimonials.slice(0, 3);
  
  // Add sample testimonials if we have fewer than 3
  while (displayTestimonials.length < 3) {
    displayTestimonials.push({
      clientName: 'Sample Client',
      clientLocation: 'Your City, State',
      testimonialText: 'Add your client testimonial here to showcase your excellent service and results.',
      rating: '5',
      propertyType: 'Single Family',
      saleDate: '2024-01-01',
      clientPhoto: null,
      propertyImage: null
    });
  }

  return `
    <div class="page" style="
      background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
      color: #1f2937;
      font-family: 'Inter', sans-serif;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    ">
      <!-- Background Elements -->
      <div style="
        position: absolute;
        top: -100px;
        right: -100px;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${theme.primary || '#3b82f6'}, ${theme.secondary || '#8b5cf6'});
        opacity: 0.05;
      "></div>
      
      <div style="
        position: absolute;
        bottom: -150px;
        left: -150px;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${theme.secondary || '#8b5cf6'}, ${theme.accent || '#f59e0b'});
        opacity: 0.03;
      "></div>

      <!-- Header Section -->
      <header style="text-align: center; margin-bottom: 3rem; position: relative; z-index: 1;">
        ${formData.companyLogo ? `
          <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
            max-height: 60px;
            margin-bottom: 2rem;
            opacity: 0.8;
          " />
        ` : ''}
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
          <i class="fas fa-users" style="color: ${theme.primary || '#3b82f6'}; font-size: 2rem;"></i>
          <h1 style="
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0;
            color: ${theme.primary || '#3b82f6'};
            line-height: 1.2;
          ">Client Success Stories</h1>
        </div>
        
        <p style="
          font-size: 1.1rem;
          color: #6b7280;
          margin: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        ">Real experiences from satisfied clients who trusted us with their real estate needs</p>
        
        <div style="
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, ${theme.primary || '#3b82f6'}, ${theme.secondary || '#8b5cf6'});
          margin: 1.5rem auto;
          border-radius: 2px;
        "></div>
      </header>

      <!-- Testimonials Grid -->
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
        position: relative;
        z-index: 1;
      ">
        ${displayTestimonials.map((testimonial, index) => `
          <div style="
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            position: relative;
            transition: transform 0.2s;
            height: fit-content;
          ">
            <!-- Quote mark with Font Awesome -->
            <div style="
              position: absolute;
              top: -10px;
              left: 2rem;
              width: 40px;
              height: 40px;
              background: ${theme.primary || '#3b82f6'};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 1.2rem;
            ">
              <i class="fas fa-quote-left"></i>
            </div>
            
            <!-- Star Rating with Font Awesome -->
            <div style="
              display: flex;
              gap: 2px;
              margin: 1rem 0 1.5rem 0;
              justify-content: center;
            ">
              ${Array.from({length: 5}, (_, i) => `
                <i class="fa${i < parseInt(testimonial.rating || 5) ? 's' : 'r'} fa-star" style="
                  color: ${i < parseInt(testimonial.rating || 5) ? '#fbbf24' : '#e5e7eb'};
                  font-size: 1.2rem;
                "></i>
              `).join('')}
            </div>
            
            <!-- Testimonial Text -->
            <p style="
              font-size: 0.95rem;
              line-height: 1.7;
              color: #374151;
              margin: 0 0 1.5rem 0;
              text-align: center;
              font-style: italic;
            ">"${testimonial.testimonialText || 'Great service and results!'}"</p>
            
            <!-- Client Info -->
            <div style="text-align: center;">
              ${testimonial.clientPhoto ? `
                <img src="${testimonial.clientPhoto}" alt="${testimonial.clientName}" style="
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  object-fit: cover;
                  margin: 0 auto 1rem auto;
                  border: 3px solid ${theme.primary || '#3b82f6'};
                " />
              ` : ''}
              
              <h3 style="
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0 0 0.25rem 0;
                color: ${theme.primary || '#3b82f6'};
              ">${testimonial.clientName || 'Client Name'}</h3>
              
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: #6b7280;
                margin: 0 0 0.5rem 0;
              ">
                <i class="fas fa-map-marker-alt" style="color: ${theme.primary || '#3b82f6'}; font-size: 0.8rem;"></i>
                ${testimonial.clientLocation || 'Location'}
              </div>
              
              ${testimonial.propertyType ? `
                <div style="
                  background: ${theme.primary || '#3b82f6'}20;
                  color: ${theme.primary || '#3b82f6'};
                  padding: 0.25rem 0.75rem;
                  border-radius: 12px;
                  font-size: 0.8rem;
                  font-weight: 500;
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  margin-top: 0.5rem;
                ">
                  <i class="fas fa-home" style="font-size: 0.7rem;"></i>
                  ${testimonial.propertyType}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Agent/Company Footer -->
      <footer style="
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, ${theme.primary || '#3b82f6'} 0%, ${theme.secondary || '#8b5cf6'} 100%);
        border-radius: 16px;
        color: white;
        position: relative;
        z-index: 1;
      ">
        <div style="
          position: absolute;
          top: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
        "></div>
        
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="fas fa-handshake" style="font-size: 1.5rem; opacity: 0.8;"></i>
            <h2 style="
              font-size: 1.5rem;
              font-weight: 600;
              margin: 0;
            ">Ready to Join Our Success Stories?</h2>
          </div>
          
          <p style="
            font-size: 1rem;
            margin: 0 0 1.5rem 0;
            opacity: 0.9;
          ">Experience the same exceptional service that our clients rave about</p>
          
          <div style="
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
          ">
            ${formData.agentName ? `
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-user-tie" style="opacity: 0.8;"></i>
                <div>
                  <strong style="font-size: 1.1rem;">${formData.agentName}</strong>
                  ${formData.agentTitle ? `<div style="opacity: 0.8; font-size: 0.9rem;">${formData.agentTitle}</div>` : ''}
                </div>
              </div>
            ` : ''}
            
            ${formData.agentPhone ? `
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-phone" style="opacity: 0.8;"></i>
                <div>
                  <strong>Phone:</strong> ${formData.agentPhone}
                </div>
              </div>
            ` : ''}
            
            ${formData.agentEmail ? `
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-envelope" style="opacity: 0.8;"></i>
                <div>
                  <strong>Email:</strong> ${formData.agentEmail}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </footer>
    </div>
  `;
};