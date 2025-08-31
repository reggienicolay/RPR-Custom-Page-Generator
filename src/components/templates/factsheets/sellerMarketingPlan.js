export default function sellerMarketingPlan({ 
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
  // Helper functions
  const esc = (s) => String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const G = (k, fb='') => esc(formData[k] ?? fb);
  const has = (k) => !!(formData[k] && String(formData[k]).trim());

  // Image handling
  const hero = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos.coverImage || '');
  const agentPhoto = formData.agentPhoto ? formData.agentPhoto : '';
  const companyLogo = formData.companyLogo ? formData.companyLogo : '';

  const marketingSteps = [
    {
      number: "1",
      title: "Preparation",
      tagline: "We set the stage.",
      description: "Staging advice, light repairs, and prep to ensure your home shines."
    },
    {
      number: "2", 
      title: "Professional Media",
      tagline: "We capture every angle.",
      description: "Photography, video, and 3D tours that attract buyers online."
    },
    {
      number: "3",
      title: "Digital Launch", 
      tagline: "We go live everywhere buyers look.",
      description: "MLS + 750+ partner sites like Zillow, Realtor.com, Redfin."
    },
    {
      number: "4",
      title: "Targeted Promotion",
      tagline: "We put your home in front of the right buyers.",
      description: "Social ads, email campaigns, and retargeting to maximize reach."
    },
    {
      number: "5",
      title: "Buyer Showings",
      tagline: "We create opportunities for buyers to fall in love.", 
      description: "Broker tours and open houses designed to drive offers."
    }
  ];

  const proofPoints = [
    { number: "750+", label: "websites feature your listing" },
    { number: "10,000+", label: "buyers reached through targeted ads" },
    { number: "95%", label: "of buyers start online — we make sure they see your home first" }
  ];

  return `
    <div class="page" style="background:#ffffff; width:8.5in; height:11in; position:relative; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <style>
        .header{background:linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);color:#ffffff;padding:1.5rem 1.25rem;text-align:center;position:relative;overflow:hidden}
        .header::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${theme.accent},${theme.primary},${theme.secondary})}
        .main-title{font-size:2.5rem;font-weight:700;margin-bottom:0.5rem;line-height:1.1}
        .main-tagline{font-size:1.2rem;font-style:italic;opacity:0.9;font-weight:300}
        .content{padding:1.5rem 1.25rem 0;display:grid;grid-template-columns:2fr 1fr;gap:2rem;position:relative;z-index:3}
        .steps-section{display:flex;flex-direction:column;gap:1rem}
        .step{background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);position:relative;display:flex;align-items:flex-start;gap:0.75rem}
        .step::before{content:'';position:absolute;top:0;left:0;width:4px;height:100%;background:linear-gradient(135deg,${theme.primary},${theme.secondary});border-radius:2px 0 0 2px}
        .step-number{width:32px;height:32px;background:linear-gradient(135deg,${theme.primary},${theme.secondary});color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;flex-shrink:0;margin-top:0.1rem}
        .step-content{flex:1}
        .step-header{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem}
        .step-icon{font-size:1.1rem}
        .step-title{font-size:1.1rem;font-weight:700;color:${theme.text};margin:0}
        .step-tagline{font-size:0.9rem;font-style:italic;color:${theme.primary};margin-bottom:0.3rem;font-weight:500}
        .step-description{font-size:0.85rem;color:${theme.textLight};line-height:1.4;margin:0}
        .sidebar{display:flex;flex-direction:column;gap:1.5rem}
        .proof-section{background:linear-gradient(135deg,#f8fafc,#e2e8f0);border-radius:12px;padding:1.25rem;border:1px solid #e5e7eb}
        .proof-title{font-size:1.1rem;font-weight:700;color:${theme.text};margin-bottom:1rem;text-align:center}
        .proof-stats{display:flex;flex-direction:column;gap:0.75rem}
        .proof-stat{text-align:center;padding:0.75rem;background:white;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.05)}
        .proof-number{font-size:1.4rem;font-weight:800;color:${theme.primary};margin-bottom:0.2rem}
        .proof-label{font-size:0.8rem;color:${theme.textLight};line-height:1.3}
        .agent-section{background:linear-gradient(135deg,${theme.primary},${theme.secondary});color:white;border-radius:12px;padding:1.25rem;text-align:center}
        .agent-photo{width:60px;height:60px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);margin:0 auto 0.75rem;overflow:hidden;background:rgba(255,255,255,0.1)}
        .agent-name{font-size:1rem;font-weight:700;margin-bottom:0.2rem}
        .agent-title{font-size:0.85rem;opacity:0.9;margin-bottom:0.5rem}
        .agent-contact{font-size:0.8rem;margin-bottom:0.1rem;opacity:0.8}
        .closing-message{background:rgba(255,255,255,0.15);padding:0.75rem;border-radius:8px;margin-top:0.75rem;font-size:0.85rem;font-style:italic;backdrop-filter:blur(10px)}
        .footer{position:absolute;bottom:0.5rem;left:1rem;right:1rem;display:flex;justify-content:center;align-items:center;font-size:0.7rem;color:#9ca3af;z-index:10}
      </style>

      <div class="header">
        <h1 class="main-title">Your Home Marketing Plan</h1>
        <p class="main-tagline">"I don't just list homes — I launch them."</p>
      </div>

      <div class="content">
        <div class="steps-section">
          ${marketingSteps.map((step) => `
            <div class="step">
              <div class="step-number">${step.number}</div>
              <div class="step-content">
                <div class="step-header">
                  <h3 class="step-title">${step.title}</h3>
                </div>
                <div class="step-tagline">"${step.tagline}"</div>
                <p class="step-description">${step.description}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="sidebar">
          <div class="proof-section">
            <h3 class="proof-title">Proof of Reach</h3>
            <div class="proof-stats">
              ${proofPoints.map((stat) => `
                <div class="proof-stat">
                  <div class="proof-number">${stat.number}</div>
                  <div class="proof-label">${stat.label}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="agent-section">
            <div class="agent-photo">
              ${agentPhoto
                ? `<img src="${agentPhoto}" alt="Agent" style="width:100%; height:100%; object-fit:cover;">`
                : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;">${G('agentName','AN').split(' ').map(n => n[0]).join('')}</div>`
              }
            </div>
            <div class="agent-name">${G('agentName','Agent Name')}</div>
            <div class="agent-title">${G('agentTitle','REALTOR®')}</div>
            <div class="agent-contact">${G('agentPhone','(713) 456-1235')}</div>
            <div class="agent-contact">${G('agentEmail','email@company.com')}</div>
            <div class="agent-contact">License #${G('licenseNumber','123456')}</div>
            <div class="closing-message">
              "Your home deserves more than a listing. It deserves a launch."
            </div>
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