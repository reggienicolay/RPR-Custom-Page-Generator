export function agentArchitect({ formData, logos, theme, selectedBackground, testimonials = [] }) {
  const agentName = formData?.agentName || 'Agent Name';
  const agentTitle = formData?.agentTitle || 'REALTOR®';
  const agentBio = formData?.agentBio || 'I am a real estate professional committed to building lasting relationships and providing exceptional service.';
  const agentPhoto = logos?.agentPhoto || null;
  const companyLogo = logos?.companyLogo || null;
  const agentPhone = formData?.agentPhone || '555-555-5555';
  const agentEmail = formData?.agentEmail || 'email@example.com';
  const licenseNumber = formData?.licenseNumber || '00000000';
  const agentExperience = formData?.agentExperience || null;
  const agentSpecialties = formData?.agentSpecialties || null;
  const agentAwards = formData?.agentAwards || null;

  const heroImage = selectedBackground?.url || selectedBackground?.thumbnail || logos?.coverImage || null;

  return `
    <div class="page" style="
      width:8.5in;
      height:11in;
      background: #fcfcfc;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #333;
      padding: 0;
      margin: 0;
      position: relative;
    ">
      <!-- Top Image Section with Geometric Overlay -->
      <div style="
        height: 4in;
        width: 100%;
        position: relative;
        background: ${heroImage ? `url(${heroImage}) center/cover no-repeat` : `${theme.primary || '#4a5568'}`};
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        "></div>
      </div>
      
      <!-- Content Container -->
      <div style="
        padding: 1.5rem;
        position: relative;
        z-index: 2;
        background: white;
      ">
        <!-- Agent Photo with a subtle drop shadow -->
        ${agentPhoto ? `
          <div style="
            position: absolute;
            top: -2.5in;
            left: 50%;
            transform: translateX(-50%);
            width: 2.5in;
            height: 2.5in;
            border-radius: 50%;
            background: white;
            padding: 0.25rem;
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
            z-index: 3;
          ">
            <img src="${agentPhoto}" alt="${agentName}" style="
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            " />
          </div>
        ` : ''}

        <!-- Name and Title -->
        <div style="
          text-align: center;
          margin-top: ${agentPhoto ? '2rem' : '0'};
        ">
          <h1 style="
            font-size: 2rem;
            font-weight: 700;
            color: ${theme.primary || '#2d3748'};
            margin: 0;
          ">${agentName}</h1>
          <p style="
            font-size: 1rem;
            font-weight: 500;
            color: ${theme.accent || '#4a5568'};
            margin: 0.25rem 0 1rem 0;
          ">${agentTitle}</p>
        </div>

        <!-- Bio and Contact Info -->
        <div style="
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f8f8f8;
          border: 1px solid #eee;
          border-radius: 10px;
          text-align: center;
        ">
          <p style="
            font-size: 0.95rem;
            line-height: 1.6;
            color: #555;
            margin: 0 0 1rem 0;
          ">${agentBio}</p>
          <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
            <p style="font-size: 0.9rem; color: #4a5568; margin: 0;">${agentPhone}</p>
            <p style="font-size: 0.9rem; color: #4a5568; margin: 0; word-break: break-all;">${agentEmail}</p>
          </div>
        </div>

        <!-- Specialties and Awards -->
        ${agentSpecialties || agentAwards ? `
          <div style="
            margin-top: 1.5rem;
            display: grid;
            grid-template-columns: ${agentSpecialties && agentAwards ? '1fr 1fr' : '1fr'};
            gap: 1.5rem;
          ">
            ${agentSpecialties ? `
              <div style="
                background: #f8f8f8;
                padding: 1rem;
                border-left: 4px solid ${theme.primary || '#3b82f6'};
                border-radius: 8px;
              ">
                <h3 style="font-size: 1rem; font-weight: 600; color: ${theme.primary || '#2d3748'}; margin: 0 0 0.5rem 0;">Specialties</h3>
                <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin: 0;">${agentSpecialties}</p>
              </div>
            ` : ''}
            
            ${agentAwards ? `
              <div style="
                background: #f8f8f8;
                padding: 1rem;
                border-left: 4px solid ${theme.accent || '#60a5fa'};
                border-radius: 8px;
              ">
                <h3 style="font-size: 1rem; font-weight: 600; color: ${theme.primary || '#2d3748'}; margin: 0 0 0.5rem 0;">Awards</h3>
                <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin: 0;">${agentAwards}</p>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Experience -->
        ${agentExperience ? `
          <div style="
            margin-top: 1.5rem;
            text-align: center;
            padding: 0.75rem;
            background: ${theme.primary || '#3b82f6'}15;
            border-radius: 8px;
          ">
            <p style="
              font-size: 1.1rem;
              font-weight: 600;
              color: ${theme.primary || '#2d3748'};
              margin: 0;
            ">${agentExperience}+ Years Experience</p>
          </div>
        ` : ''}

        <!-- Footer -->
        <div style="
          text-align: center;
          margin-top: 1.5rem;
        ">
          ${companyLogo ? `
            <img src="${companyLogo}" alt="Company Logo" style="
              max-height: 35px;
              opacity: 0.7;
              margin: 0.5rem auto;
            " />
          ` : ''}
          ${licenseNumber ? `
            <p style="font-size: 0.75rem; color: #718096; margin: 0.25rem 0 0 0;">
              License #: ${licenseNumber}
            </p>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}