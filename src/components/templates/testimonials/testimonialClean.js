// testimonialClean.js - Clean Vertical Testimonials Layout with Font Awesome
export const testimonialClean = ({ formData, logos, theme, testimonials }) => {
  // Use up to 5 testimonials for this layout
  const displayTestimonials = testimonials.slice(0, 5);
  
  // Add sample testimonials if we have fewer than 5
  while (displayTestimonials.length < 5) {
    displayTestimonials.push({
      clientName: 'Sample Client',
      clientLocation: 'Your City, State',
      testimonialText: 'Add your client testimonial here to showcase your excellent service and results. This format allows for longer, more detailed feedback from your satisfied clients.',
      rating: '5',
      propertyType: 'Single Family Home',
      saleDate: '2024-01-01',
      clientPhoto: null,
      propertyImage: null
    });
  }

  return `
    <div class="page" style="
      background: #ffffff;
      color: #2d3748;
      font-family: 'Georgia', serif;
      padding: 3rem 4rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    ">
      <!-- Header Section -->
      <header style="text-align: center; margin-bottom: 3rem;">
        ${formData.companyLogo ? `
          <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
            max-height: 50px;
            margin-bottom: 2rem;
            opacity: 0.7;
          " />
        ` : ''}
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
          <i class="fas fa-quote-left" style="color: ${theme.primary || '#3182ce'}; font-size: 1.8rem; opacity: 0.7;"></i>
          <h1 style="
            font-size: 2.2rem;
            font-weight: 400;
            margin: 0;
            color: #2d3748;
            letter-spacing: -0.02em;
          ">Client Testimonials</h1>
        </div>
        
        <p style="
          font-size: 1rem;
          color: #4a5568;
          margin: 0 auto;
          max-width: 600px;
          font-family: 'Inter', sans-serif;
        ">My greatest compliment is the trust of my clients. Here's what a few past clients had to say about their experience working with me.</p>
      </header>

      <!-- Testimonials List -->
      <div style="margin-bottom: 3rem;">
        ${displayTestimonials.map((testimonial, index) => `
          <div style="
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            ${index < displayTestimonials.length - 1 ? 'border-bottom: 1px solid #e2e8f0;' : ''}
            position: relative;
          ">
            <!-- Subtle quote decoration -->
            <div style="
              position: absolute;
              top: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 30px;
              height: 30px;
              background: ${theme.primary || '#3182ce'};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0.1;
            ">
              <i class="fas fa-quote-left" style="color: white; font-size: 0.9rem;"></i>
            </div>
            
            <!-- Star Rating with Font Awesome -->
            <div style="
              display: flex;
              justify-content: center;
              gap: 3px;
              margin-bottom: 1.5rem;
            ">
              ${Array.from({length: 5}, (_, i) => `
                <i class="fa${i < parseInt(testimonial.rating || 5) ? 's' : 'r'} fa-star" style="
                  color: ${i < parseInt(testimonial.rating || 5) ? '#d69e2e' : '#e2e8f0'};
                  font-size: 1.1rem;
                "></i>
              `).join('')}
            </div>
            
            <!-- Testimonial Text -->
            <blockquote style="
              font-size: 1.1rem;
              line-height: 1.7;
              color: #2d3748;
              margin: 0 0 1.5rem 0;
              text-align: center;
              font-style: italic;
              max-width: 700px;
              margin-left: auto;
              margin-right: auto;
            ">"${testimonial.testimonialText || 'Great service and results!'}"</blockquote>
            
            <!-- Client Attribution -->
            <div style="
              text-align: center;
              font-family: 'Inter', sans-serif;
            ">
              <div style="
                font-size: 1rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
              ">
                <i class="fas fa-user" style="color: ${theme.primary || '#3182ce'}; font-size: 0.8rem; opacity: 0.6;"></i>
                — ${testimonial.clientName || 'Client Name'}
              </div>
              
              ${testimonial.clientLocation ? `
                <div style="
                  font-size: 0.9rem;
                  color: #718096;
                  margin-bottom: 0.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                ">
                  <i class="fas fa-map-marker-alt" style="color: ${theme.primary || '#3182ce'}; font-size: 0.8rem; opacity: 0.6;"></i>
                  ${testimonial.clientLocation}
                </div>
              ` : ''}
              
              ${testimonial.propertyType ? `
                <div style="
                  font-size: 0.85rem;
                  color: #4a5568;
                  font-weight: 500;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                ">
                  <i class="fas fa-home" style="color: ${theme.primary || '#3182ce'}; font-size: 0.8rem; opacity: 0.6;"></i>
                  ${testimonial.propertyType}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Contact Footer -->
      <footer style="
        text-align: center;
        padding: 2.5rem 2rem;
        background: #f7fafc;
        border-radius: 8px;
        border-left: 4px solid ${theme.primary || '#3182ce'};
        font-family: 'Inter', sans-serif;
        position: relative;
      ">
        <!-- Header with icon -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
          <i class="fas fa-handshake" style="color: ${theme.primary || '#3182ce'}; font-size: 1.3rem;"></i>
          <h2 style="
            font-size: 1.4rem;
            font-weight: 600;
            margin: 0;
            color: #2d3748;
          ">Ready to Experience Exceptional Service?</h2>
        </div>
        
        <p style="
          font-size: 0.95rem;
          color: #4a5568;
          margin: 0 0 1.5rem 0;
          line-height: 1.5;
        ">Join my satisfied clients and let me help you achieve your real estate goals.</p>
        
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
        ">
          ${formData.agentName ? `
            <div style="text-align: center; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-user-tie" style="color: ${theme.primary || '#3182ce'}; font-size: 0.9rem;"></i>
              <div>
                <div style="
                  font-weight: 600;
                  color: #2d3748;
                  font-size: 1.1rem;
                  margin-bottom: 0.25rem;
                ">${formData.agentName}</div>
                ${formData.agentTitle ? `
                  <div style="
                    color: #718096;
                    font-size: 0.85rem;
                  ">${formData.agentTitle}</div>
                ` : ''}
              </div>
            </div>
          ` : ''}
          
          ${formData.agentPhone ? `
            <div style="color: #4a5568; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-phone" style="color: ${theme.primary || '#3182ce'}; font-size: 0.9rem;"></i>
              <div><strong>Phone:</strong> ${formData.agentPhone}</div>
            </div>
          ` : ''}
          
          ${formData.agentEmail ? `
            <div style="color: #4a5568; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-envelope" style="color: ${theme.primary || '#3182ce'}; font-size: 0.9rem;"></i>
              <div><strong>Email:</strong> ${formData.agentEmail}</div>
            </div>
          ` : ''}
        </div>
      </footer>
      
      <!-- Subtle Bottom Spacing -->
      <div style="height: 2rem;"></div>
    </div>
  `;
};