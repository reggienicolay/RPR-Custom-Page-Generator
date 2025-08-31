export default function showingFactSheet({ 
  formData = {}, 
  logos = {}, 
  theme = { 
    primary: '#667eea', 
    secondary: '#764ba2', 
    accent: '#ff6b6b', 
    text: '#111827', 
    textLight: '#6b7280', 
    white: '#ffffff' 
  }, 
  selectedBackground 
}) {
  // Helper functions like bioDetailed template
  const esc = (s) => String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const G = (k, fb='') => esc(formData[k] ?? fb);
  const has = (k) => !!(formData[k] && String(formData[k]).trim());

  // Use new background system for hero, fallback to old coverImage
  const hero = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos.coverImage || '');
  const agentPhoto = formData.agentPhoto ? formData.agentPhoto : '';
  const companyLogo = formData.companyLogo ? formData.companyLogo : '';

  // Complete checklist with all 12 items from original requirement
  const checklistItems = [
    {
      title: "Remove clutter",
      description: "Clear off counters and pack unnecessary decorative items. Put extra furniture in storage, and remove out-of-season items."
    },
    {
      title: "Let it shine", 
      description: "Clean windows and screens to bring more light. Replace burnt bulbs and consider higher wattage in low-light areas."
    },
    {
      title: "Keep it clean",
      description: "A deep clean before listing your home will make upkeep easier. Consider hiring a cleaning service to help."
    },
    {
      title: "Maximize comfort",
      description: "In summer, shut A/C vents on the first floor so more air will get upstairs. Reverse the process in winter."
    },
    {
      title: "Perform a sniff test",
      description: "Clean carpeting and drapes to eliminate odors. Open windows to air out the house. Consider potpourri or scented candles."
    },
    {
      title: "Take care of minor repairs", 
      description: "Sticky doors, torn screens, cracked caulking, or dripping faucets give buyers the impression the house isn't well-maintained."
    },
    {
      title: "Tidy up outdoors",
      description: "Cut grass, rake leaves, add mulch, trim bushes, edge walkways, and clean gutters. Add bright flowers near the entryway."
    },
    {
      title: "Set the scene",
      description: "Add bright afghans or accent pillows. Place pretty dishes or centerpieces to help buyers picture themselves living there."
    },
    {
      title: "Make the bath luxurious",
      description: "Make sure personal toiletry items are out of sight. Add a new shower curtain and fancy guest soaps."
    },
    {
      title: "Send pets away",
      description: "If not possible, crate or confine them to one room, and let the real estate practitioner know where they'll be."
    },
    {
      title: "Lock up valuables and medication",
      description: "Agents can't watch everyone all the time."
    },
    {
      title: "Head out",
      description: "It can be awkward for everyone if you're home at the time of a showing."
    }
  ];

  return `
    <div class="page" style="background:#ffffff; width:8.5in; height:11in; position:relative; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <style>
        .container{padding:1.25rem 1.25rem 0.75rem}
        .header{background:linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);color:#ffffff;padding:1.5rem 1.25rem;position:relative;overflow:hidden}
        .header::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${theme.accent},${theme.primary},${theme.secondary})}
        .brand-section{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
        .title-section{text-align:center}
        .title{font-size:3rem;font-weight:900;line-height:0.9;margin-bottom:0.5rem}
        .subtitle{font-size:1.1rem;opacity:0.9;font-weight:300}
        .checklist{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin:1.25rem 0}
        .item{background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:0.85rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);position:relative}
        .item::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(135deg,${theme.primary},${theme.secondary})}
        .item-header{display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.4rem}
        .checkbox{width:16px;height:16px;border:2px solid ${theme.primary};border-radius:3px;margin-top:0.15rem;flex-shrink:0}
        .item-title{font-size:0.95rem;font-weight:700;color:#1f2937;line-height:1.2}
        .item-desc{font-size:0.8rem;line-height:1.4;color:#6b7280;margin-left:1.25rem}
        .agent-section{position:absolute;bottom:3rem;left:0;right:0;background:linear-gradient(135deg,${theme.primary},${theme.secondary});color:#ffffff;padding:1rem 1.25rem;display:flex;justify-content:space-between;align-items:center}
        .agent-info{display:flex;align-items:center;gap:0.75rem}
        .agent-photo{width:50px;height:50px;border-radius:8px;overflow:hidden;border:2px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.1)}
        .agent-details h4{font-size:1rem;font-weight:700;margin:0 0 0.1rem 0}
        .agent-details p{font-size:0.85rem;margin:0;opacity:0.9}
        .contact-grid{display:flex;gap:1.5rem;align-items:center}
        .contact-item{text-align:center}
        .contact-label{font-size:0.7rem;opacity:0.8;margin-bottom:0.1rem;text-transform:uppercase;letter-spacing:0.5px}
        .contact-value{font-size:0.85rem;font-weight:600}
        .footer{position:absolute;bottom:0.5rem;left:1rem;right:1rem;display:flex;justify-content:center;align-items:center;font-size:0.7rem;color:#9ca3af;z-index:10}
      </style>

      <div class="header">
        <div class="brand-section">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            ${companyLogo
              ? `<img src="${companyLogo}" alt="Company Logo" style="height:1.5rem;object-fit:contain;">`
              : `<div style="font-weight:900;letter-spacing:0.15rem;font-size:1.1rem;">${G('companyName','COMPANY NAME').toUpperCase()}</div>`
            }
          </div>
          <div style="background:rgba(255,255,255,0.2);padding:0.4rem 0.8rem;border-radius:20px;font-size:0.8rem;font-weight:600;backdrop-filter:blur(10px);">FACT SHEET</div>
        </div>

        <div class="title-section">
          <h1 class="title">Better Home Showings</h1>
          <p class="subtitle">Your Complete Preparation Checklist</p>
        </div>
      </div>

      <div class="container">
        <div class="checklist">
          ${checklistItems.map((item) => `
            <div class="item">
              <div class="item-header">
                <div class="checkbox"></div>
                <h3 class="item-title">${item.title}</h3>
              </div>
              <p class="item-desc">${item.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="agent-section">
        <div class="agent-info">
          <div class="agent-photo">
            ${agentPhoto
              ? `<img src="${agentPhoto}" alt="Agent" style="width:100%;height:100%;object-fit:cover;">`
              : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:700;">${G('agentName','AN').split(' ').map(n => n[0]).join('')}</div>`
            }
          </div>
          <div class="agent-details">
            <h4>${G('agentName','Agent Name')}</h4>
            <p>${G('agentTitle','REALTOR®')}</p>
          </div>
        </div>
        
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-label">Phone</div>
            <div class="contact-value">${G('agentPhone','(713) 456-1235')}</div>
          </div>
          <div class="contact-item">
            <div class="contact-label">Email</div>
            <div class="contact-value">${G('agentEmail','email@metrorealty.com')}</div>
          </div>
          <div class="contact-item">
            <div class="contact-label">License</div>
            <div class="contact-value">#${G('licenseNumber','122343')}</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <img src="src/assets/logo-black-color.svg" alt="RPR Logo" style="height:20px;width:auto;object-fit:contain;"/>
          Copyright 2025 Realtors Property Resource® LLC. All Rights Reserved.
        </div>
      </div>
    </div>
  `;
}