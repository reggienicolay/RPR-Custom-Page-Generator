// testimonialGrid.js - Grid-Based Testimonials Layout
export const testimonialGrid = ({ formData, logos, theme, testimonials }) => {
  // Use up to 6 testimonials for optimal grid layout
  const displayTestimonials = testimonials.slice(0, 6);
  
  // Add sample testimonials if we have fewer than 6
  while (displayTestimonials.length < 6) {
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
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: #2d3748;
      font-family: 'Inter', sans-serif;
      padding: 2.5rem;
      min-height: 100vh;
    ">
      <!-- Header Section -->
      <header style="text-align: center; margin-bottom: 3rem;">
        ${formData.companyLogo ? `
          <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
            max-height: 55px;
            margin-bottom: 1.5rem;
            opacity: 0.8;
          " />
        ` : ''}
        
        <h1 style="
          font-size: 2.8rem;
          font-weight: 800;
          margin: 0 0 1rem 0;
          color: ${theme.primary || '#2b6cb0'};
          letter-spacing: -0.025em;
        ">What Our Clients Say</h1>
        
        <p style="
          font-size: 1.2rem;
          color: #4a5568;
          margin: 0 auto 1.5rem auto;
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

      <!-- Testimonials Grid -->
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      ">
        ${displayTestimonials.map((testimonial, index) => `
          <div style="
            background: white;
            border-radius: 12px;
            padding: 1.75rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(203, 213, 225, 0.5);
            position: relative;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 280px;
          ">
            <!-- Top Section: Stars and Quote -->
            <div>
              <!-- Star Rating -->
              <div style="
                display: flex;
                gap: 2px;
                margin-bottom: 1rem;
              ">
                ${Array.from({length: 5}, (_, i) => `
                  <span style="
                    color: ${i < parseInt(testimonial.rating || 5) ? '#f6ad55' : '#e2e8f0'};
                    font-size: 1rem;
                  ">★</span>
                `).join('')}
              </div>
              
              <!-- Testimonial Text -->
              <p style="
                font-size: 0.95rem;
                line-height: 1.6;
                color: #4a5568;
                margin: 0 0 1.5rem 0;
                font-style: italic;
              ">"${testimonial.testimonialText || 'Great service and results!'}"</p>
            </div>
            
            <!-- Bottom Section: Client Info -->
            <div style="
              border-top: 1px solid #f1f5f9;
              padding-top: 1rem;
              display: flex;
              align-items: center;
              gap: 1rem;
            ">
              <!-- Client Avatar or Initial -->
              <div style="
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background: ${testimonial.clientPhoto ? 'none' : `linear-gradient(135deg, ${theme.primary || '#2b6cb0'}, ${theme.secondary || '#805ad5'})`};
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 1.1rem;
                flex-shrink: 0;
                ${testimonial.clientPhoto ? `background-image: url(${testimonial.clientPhoto}); background-size: cover; background-position: center;` : ''}
              ">
                ${!testimonial.clientPhoto ? (testimonial.clientName || 'C').charAt(0).toUpperCase() : ''}
              </div>
              
              <!-- Client Details -->
              <div style="flex: 1;">
                <h3 style="
                  font-size: 0.95rem;
                  font-weight: 600;
                  margin: 0 0 0.25rem 0;
                  color: #2d3748;
                ">${testimonial.clientName || 'Client Name'}</h3>
                
                <p style="
                  font-size: 0.8rem;
                  color: #718096;
                  margin: 0;
                ">${testimonial.clientLocation || 'Location'}</p>
                
                ${testimonial.propertyType ? `
                  <div style="
                    background: ${theme.primary || '#2b6cb0'}15;
                    color: ${theme.primary || '#2b6cb0'};
                    padding: 0.15rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 500;
                    display: inline-block;
                    margin-top: 0.5rem;
                  ">${testimonial.propertyType}</div>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Call-to-Action Section -->
      <section style="
        background: white;
        border-radius: 16px;
        padding: 2.5rem;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(203, 213, 225, 0.3);
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
      ">
        <!-- Background Accent -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${theme.primary || '#2b6cb0'}, ${theme.secondary || '#805ad5'}, ${theme.accent || '#f6ad55'});
        "></div>
        
        <h2 style="
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #2d3748;
        ">Ready to Add Your Success Story?</h2>
        
        <p style="
          font-size: 1rem;
          color: #4a5568;
          margin: 0 0 2rem 0;
          line-height: 1.5;
        ">Experience the same exceptional service and results that earned these glowing reviews</p>
        
        <!-- Contact Grid -->
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          align-items: center;
        ">
          ${formData.agentName ? `
            <div>
              <h3 style="
                font-size: 1.2rem;
                font-weight: 600;
                margin: 0 0 0.5rem 0;
                color: ${theme.primary || '#2b6cb0'};
              ">${formData.agentName}</h3>
              ${formData.agentTitle ? `
                <p style="
                  font-size: 0.9rem;
                  color: #718096;
                  margin: 0;
                ">${formData.agentTitle}</p>
              ` : ''}
            </div>
          ` : ''}
          
          ${formData.agentPhone ? `
            <div style="
              background: ${theme.primary || '#2b6cb0'}10;
              padding: 0.75rem 1rem;
              border-radius: 8px;
            ">
              <div style="font-size: 0.8rem; color: #718096; margin-bottom: 0.25rem;">Phone</div>
              <div style="font-weight: 600; color: #2d3748;">${formData.agentPhone}</div>
            </div>
          ` : ''}
          
          ${formData.agentEmail ? `
            <div style="
              background: ${theme.secondary || '#805ad5'}10;
              padding: 0.75rem 1rem;
              border-radius: 8px;
            ">
              <div style="font-size: 0.8rem; color: #718096; margin-bottom: 0.25rem;">Email</div>
              <div style="font-weight: 600; color: #2d3748; word-break: break-word;">${formData.agentEmail}</div>
            </div>
          ` : ''}
        </div>
      </section>
    </div>
  `;
};