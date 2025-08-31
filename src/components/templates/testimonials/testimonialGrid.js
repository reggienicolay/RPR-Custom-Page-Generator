// testimonialGrid.js - Grid-Based Testimonials Layout with Font Awesome - 4 Cards
export const testimonialGrid = ({ formData, logos, theme, testimonials }) => {
  // Use up to 4 testimonials for optimal grid layout
  const displayTestimonials = testimonials.slice(0, 4);
  
  // Add sample testimonials if we have fewer than 4
  while (displayTestimonials.length < 4) {
    displayTestimonials.push({
      clientName: 'Sample Client',
      clientLocation: 'Your City, State',
      testimonialText: 'Professional service with outstanding results. Highly recommend for anyone looking for a dedicated real estate expert.',
      rating: '5',
      propertyType: 'Single Family',
      saleDate: '2024-01-01',
      clientPhoto: null,
      propertyImage: null
    });
  }

  return `
    <div class="page" style="
      background: #ffffff;
      color: #2d3748;
      font-family: 'Inter', sans-serif;
      padding: 1.5rem;
      min-height: 100vh;
    ">
      <!-- Header Section -->
      <header style="text-align: center; margin-bottom: 2rem;">
        ${formData.companyLogo ? `
          <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
            max-height: 45px;
            margin-bottom: 1rem;
            opacity: 0.8;
          " />
        ` : ''}
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.75rem;">
          <i class="fas fa-users" style="color: ${theme.primary || '#2b6cb0'}; font-size: 2rem;"></i>
          <h1 style="
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0;
            color: ${theme.primary || '#2b6cb0'};
            letter-spacing: -0.025em;
          ">What Our Clients Say</h1>
        </div>
        
        <p style="
          font-size: 1.1rem;
          color: #4a5568;
          margin: 0 auto 1rem auto;
          max-width: 650px;
          font-weight: 400;
        ">Discover why clients choose us for their most important real estate decisions</p>
        
        <div style="
          width: 80px;
          height: 3px;
          background: ${theme.primary || '#2b6cb0'};
          margin: 0 auto;
          border-radius: 2px;
        "></div>
      </header>

      <!-- Testimonials Grid - 2x2 Layout -->
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 2rem;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      ">
        ${displayTestimonials.map((testimonial, index) => `
          <div style="
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(203, 213, 225, 0.5);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 240px;
          ">
            <!-- Quote Icon -->
            <div style="
              position: absolute;
              top: -6px;
              left: 1.5rem;
              width: 28px;
              height: 28px;
              background: ${theme.primary || '#2b6cb0'};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            ">
              <i class="fas fa-quote-left" style="font-size: 0.8rem;"></i>
            </div>
            
            <!-- Top Section: Stars and Quote -->
            <div>
              <!-- Star Rating with Font Awesome -->
              <div style="
                display: flex;
                gap: 2px;
                margin: 0.75rem 0 1rem 0;
                justify-content: center;
              ">
                ${Array.from({length: 5}, (_, i) => `
                  <i class="fa${i < parseInt(testimonial.rating || 5) ? 's' : 'r'} fa-star" style="
                    color: ${i < parseInt(testimonial.rating || 5) ? '#f6ad55' : '#e2e8f0'};
                    font-size: 1rem;
                  "></i>
                `).join('')}
              </div>
              
              <!-- Testimonial Text -->
              <p style="
                font-size: 0.9rem;
                line-height: 1.5;
                color: #4a5568;
                margin: 0 0 1rem 0;
                font-style: italic;
                text-align: center;
              ">"${testimonial.testimonialText || 'Great service and results!'}"</p>
            </div>
            
            <!-- Bottom Section: Client Info -->
            <div style="
              border-top: 1px solid #f1f5f9;
              padding-top: 1rem;
              display: flex;
              align-items: center;
              gap: 0.75rem;
            ">
              <!-- Client Avatar or Initial -->
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: ${testimonial.clientPhoto ? 'none' : `linear-gradient(135deg, ${theme.primary || '#2b6cb0'}, ${theme.secondary || '#805ad5'})`};
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 1rem;
                flex-shrink: 0;
                ${testimonial.clientPhoto ? `background-image: url(${testimonial.clientPhoto}); background-size: cover; background-position: center;` : ''}
                border: 2px solid #e2e8f0;
              ">
                ${!testimonial.clientPhoto ? (testimonial.clientName || 'C').charAt(0).toUpperCase() : ''}
              </div>
              
              <!-- Client Details -->
              <div style="flex: 1;">
                <h3 style="
                  font-size: 0.9rem;
                  font-weight: 600;
                  margin: 0 0 0.2rem 0;
                  color: #2d3748;
                ">${testimonial.clientName || 'Client Name'}</h3>
                
                <p style="
                  font-size: 0.8rem;
                  color: #718096;
                  margin: 0 0 0.4rem 0;
                  display: flex;
                  align-items: center;
                  gap: 0.4rem;
                ">
                  <i class="fas fa-map-marker-alt" style="color: ${theme.primary || '#2b6cb0'}; font-size: 0.7rem;"></i>
                  ${testimonial.clientLocation || 'Location'}
                </p>
                
                ${testimonial.propertyType ? `
                  <div style="
                    background: ${theme.primary || '#2b6cb0'}15;
                    color: ${theme.primary || '#2b6cb0'};
                    padding: 0.2rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                  ">
                    <i class="fas fa-home" style="font-size: 0.6rem;"></i>
                    ${testimonial.propertyType}
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Lightweight Footer -->
      <footer style="
        text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(203, 213, 225, 0.3);
        max-width: 700px;
        margin: 0 auto;
      ">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <i class="fas fa-handshake" style="color: ${theme.primary || '#2b6cb0'}; font-size: 1.2rem;"></i>
          <h3 style="
            font-size: 1.4rem;
            font-weight: 600;
            margin: 0;
            color: ${theme.primary || '#2b6cb0'};
          ">Ready to Add Your Success Story?</h3>
        </div>
        
        <!-- Contact Info - Single Line -->
        <div style="
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: center;
        ">
          ${formData.agentName ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-user-tie" style="color: ${theme.primary || '#2b6cb0'}; font-size: 0.9rem;"></i>
              <span style="font-weight: 600; color: #2d3748;">${formData.agentName}</span>
            </div>
          ` : ''}
          
          ${formData.agentPhone ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-phone" style="color: ${theme.primary || '#2b6cb0'}; font-size: 0.9rem;"></i>
              <span style="color: #4a5568;">${formData.agentPhone}</span>
            </div>
          ` : ''}
          
          ${formData.agentEmail ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-envelope" style="color: ${theme.primary || '#2b6cb0'}; font-size: 0.9rem;"></i>
              <span style="color: #4a5568; font-size: 0.9rem;">${formData.agentEmail}</span>
            </div>
          ` : ''}
        </div>
      </footer>
    </div>
  `;
};