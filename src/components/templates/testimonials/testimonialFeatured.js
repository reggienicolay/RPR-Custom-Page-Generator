// testimonialFeatured.js - Single Featured Testimonial with Cover Page Design
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
      overflow: hidden;
      background: linear-gradient(135deg, ${theme.primary || '#1e40af'} 0%, ${theme.secondary || '#7c3aed'} 100%);
      color: white;
      font-family: 'Georgia', serif;
    ">
      <!-- Background Elements -->
      ${testimonial.propertyImage ? `
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${testimonial.propertyImage});
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          z-index: 0;
        "></div>
      ` : ''}
      
      <!-- Geometric Background Pattern -->
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 100px 100px, 150px 150px;
        z-index: 1;
      "></div>
      
      <!-- Floating Elements -->
      <div style="
        position: absolute;
        top: 10%;
        right: 5%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        z-index: 1;
      "></div>
      
      <div style="
        position: absolute;
        bottom: 10%;
        left: 5%;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        z-index: 1;
      "></div>

      <!-- Main Content -->
      <div style="
        position: relative;
        z-index: 2;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 3rem;
      ">
        <!-- Company Logo -->
        ${formData.companyLogo ? `
          <img src="${formData.companyLogo}" alt="${formData.companyName || 'Company'}" style="
            max-height: 80px;
            margin-bottom: 2rem;
            opacity: 0.9;
            filter: brightness(0) invert(1);
          " />
        ` : ''}
        
        <!-- Main Quote -->
        <div style="
          position: relative;
          max-width: 700px;
          margin-bottom: 3rem;
        ">
          <!-- Large Quote Mark -->
          <div style="
            position: absolute;
            top: -30px;
            left: -40px;
            font-size: 8rem;
            font-family: 'Georgia', serif;
            color: rgba(255, 255, 255, 0.1);
            line-height: 1;
            z-index: -1;
          ">"</div>
          
          <blockquote style="
            font-size: 1.75rem;
            font-style: italic;
            line-height: 1.6;
            margin: 0;
            font-weight: 300;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          ">${testimonial.testimonialText}</blockquote>
        </div>
        
        <!-- Star Rating -->
        <div style="
          display: flex;
          gap: 4px;
          margin-bottom: 2rem;
          justify-content: center;
        ">
          ${Array.from({length: 5}, (_, i) => `
            <span style="
              color: ${i < parseInt(testimonial.rating || 5) ? '#fbbf24' : 'rgba(255, 255, 255, 0.3)'};
              font-size: 2rem;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            ">★</span>
          `).join('')}
        </div>
        
        <!-- Client Information -->
        <div style="
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        ">
          ${testimonial.clientPhoto ? `
            <img src="${testimonial.clientPhoto}" alt="${testimonial.clientName}" style="
              width: 100px;
              height: 100px;
              border-radius: 50%;
              object-fit: cover;
              border: 4px solid rgba(255, 255, 255, 0.3);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            " />
          ` : ''}
          
          <div style="text-align: left;">
            <h3 style="
              font-size: 1.5rem;
              font-weight: 600;
              margin: 0 0 0.5rem 0;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            ">${testimonial.clientName}</h3>
            
            <p style="
              font-size: 1.1rem;
              margin: 0 0 0.5rem 0;
              opacity: 0.9;
            ">${testimonial.clientLocation}</p>
            
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              ${testimonial.propertyType ? `
                <span style="
                  background: rgba(255, 255, 255, 0.2);
                  padding: 0.5rem 1rem;
                  border-radius: 20px;
                  font-size: 0.9rem;
                  font-weight: 500;
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.3);
                ">${testimonial.propertyType}</span>
              ` : ''}
              
              ${testimonial.saleDate ? `
                <span style="
                  background: rgba(255, 255, 255, 0.2);
                  padding: 0.5rem 1rem;
                  border-radius: 20px;
                  font-size: 0.9rem;
                  font-weight: 500;
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.3);
                ">${new Date(testimonial.saleDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              ` : ''}
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div style="
          text-align: center;
          margin-top: auto;
        ">
          <h2 style="
            font-size: 1.75rem;
            font-weight: 400;
            margin: 0 0 1rem 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          ">Experience the Same Excellence</h2>
          
          <p style="
            font-size: 1.1rem;
            margin: 0 0 2rem 0;
            opacity: 0.9;
            max-width: 500px;
          ">Join our satisfied clients and discover what exceptional real estate service looks like</p>
          
          <!-- Agent Contact Info -->
          <div style="
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 2rem;
            display: inline-block;
            min-width: 400px;
          ">
            ${formData.agentName ? `
              <h3 style="
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0 0 0.5rem 0;
              ">${formData.agentName}</h3>
            ` : ''}
            
            ${formData.agentTitle ? `
              <p style="
                font-size: 1rem;
                margin: 0 0 1rem 0;
                opacity: 0.9;
              ">${formData.agentTitle}</p>
            ` : ''}
            
            <div style="
              display: flex;
              justify-content: center;
              gap: 2rem;
              flex-wrap: wrap;
            ">
              ${formData.agentPhone ? `
                <div style="text-align: center;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Call</div>
                  <a href="tel:${formData.agentPhone}" style="
                    color: white;
                    text-decoration: none;
                    font-size: 1.1rem;
                  ">${formData.agentPhone}</a>
                </div>
              ` : ''}
              
              ${formData.agentEmail ? `
                <div style="text-align: center;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Email</div>
                  <a href="mailto:${formData.agentEmail}" style="
                    color: white;
                    text-decoration: none;
                    font-size: 1.1rem;
                  ">${formData.agentEmail}</a>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};