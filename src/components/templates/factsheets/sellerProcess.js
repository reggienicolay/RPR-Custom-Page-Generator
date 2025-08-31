export default function sellerProcess({ 
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

  const processSteps = [
    {
      number: "1",
      title: "Preparation & Planning",
      icon: `<i class="fas fa-clipboard-list" style="color: ${theme.primary}; font-size: 1rem;"></i>`,
      steps: [
        { 
          icon: `<i class="fas fa-lightbulb" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Decide to Sell", 
          desc: "Define your goals and timeline." 
        },
        { 
          icon: `<i class="fas fa-user-tie" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Hire the Right Agent", 
          desc: "Choose a REALTOR® with local expertise." 
        },
        { 
          icon: `<i class="fas fa-dollar-sign" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Home Valuation", 
          desc: "Set a competitive price based on market trends." 
        },
        { 
          icon: `<i class="fas fa-home" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Get Market-Ready", 
          desc: "Declutter, clean, make repairs, and stage." 
        },
        { 
          icon: `<i class="fas fa-folder-open" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Paperwork in Order", 
          desc: "Gather disclosures, title info, and records." 
        }
      ]
    },
    {
      number: "2", 
      title: "Listing & Marketing",
      icon: `<i class="fas fa-camera" style="color: ${theme.primary}; font-size: 1rem;"></i>`,
      steps: [
        { 
          icon: `<i class="fas fa-camera" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Pro Photos & Video", 
          desc: "Showcase your home online." 
        },
        { 
          icon: `<i class="fas fa-desktop" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "MLS Exposure", 
          desc: "Your property goes live on MLS and 750+ sites." 
        },
        { 
          icon: `<i class="fas fa-bullhorn" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Marketing Campaign", 
          desc: "Targeted ads, social media, open houses." 
        },
        { 
          icon: `<i class="fas fa-eye" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Showings", 
          desc: "Qualified buyers view your home in person." 
        }
      ]
    },
    {
      number: "3",
      title: "Offers & Negotiation", 
      icon: `<i class="fas fa-handshake" style="color: ${theme.primary}; font-size: 1rem;"></i>`,
      steps: [
        { 
          icon: `<i class="fas fa-file-contract" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Review Offers", 
          desc: "Work with your agent to evaluate each one." 
        },
        { 
          icon: `<i class="fas fa-comments" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Negotiate Terms", 
          desc: "Price, closing date, contingencies, and repairs." 
        },
        { 
          icon: `<i class="fas fa-handshake" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Accept the Best Offer", 
          desc: "Choose the one that meets your goals." 
        }
      ]
    },
    {
      number: "4",
      title: "Contract to Closing",
      icon: `<i class="fas fa-key" style="color: ${theme.primary}; font-size: 1rem;"></i>`,
      steps: [
        { 
          icon: `<i class="fas fa-search" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Buyer Due Diligence", 
          desc: "Inspections, appraisal, and financing." 
        },
        { 
          icon: `<i class="fas fa-file-signature" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Finalize Paperwork", 
          desc: "Sign with escrow or title company." 
        },
        { 
          icon: `<i class="fas fa-key" style="color: ${theme.primary}; font-size: 0.9rem;"></i>`, 
          title: "Closing Day", 
          desc: "Transfer keys, celebrate your sale, and collect proceeds!" 
        }
      ]
    }
  ];

  return `
    <div class="page" style="background:#ffffff; width:8.5in; height:11in; position:relative; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <style>
        .header{background:linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);color:#ffffff;padding:1.5rem 1.25rem;text-align:center;position:relative;overflow:hidden}
        .header::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${theme.accent},${theme.primary},${theme.secondary})}
        .main-title{font-size:2.5rem;font-weight:700;margin-bottom:0.5rem;line-height:1.1}
        .main-tagline{font-size:1.2rem;font-style:italic;opacity:0.9;font-weight:300}
        .content{padding:1.25rem 1.25rem 0;position:relative;z-index:3}
        .timeline{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem}
        .phase{background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);position:relative}
        .phase::before{content:'';position:absolute;top:0;left:0;width:4px;height:100%;background:linear-gradient(135deg,${theme.primary},${theme.secondary});border-radius:2px 0 0 2px}
        .phase-header{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;padding-bottom:0.5rem;border-bottom:1px solid #e5e7eb}
        .phase-number{width:28px;height:28px;background:linear-gradient(135deg,${theme.primary},${theme.secondary});color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0}
        .phase-title{font-size:1rem;font-weight:700;color:${theme.text};margin:0}
        .phase-steps{display:flex;flex-direction:column;gap:0.5rem}
        .step-item{display:flex;align-items:flex-start;gap:0.5rem}
        .step-icon{margin-top:0.1rem;flex-shrink:0;width:16px;display:flex;justify-content:center}
        .step-content{flex:1;font-size:0.8rem}
        .step-title{font-weight:600;color:${theme.text};margin-bottom:0.1rem}
        .step-desc{color:${theme.textLight};line-height:1.3}
        .agent-section{background:linear-gradient(135deg,${theme.primary},${theme.secondary});color:white;border-radius:12px;padding:1.25rem;text-align:center;margin-top:1rem;display:flex;align-items:center;gap:1rem}
        .agent-photo{width:70px;height:70px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);overflow:hidden;background:rgba(255,255,255,0.1);flex-shrink:0}
        .agent-content{flex:1;text-align:left}
        .agent-name{font-size:1.1rem;font-weight:700;margin-bottom:0.2rem}
        .agent-title{font-size:0.9rem;opacity:0.9;margin-bottom:0.5rem}
        .agent-contact{font-size:0.85rem;margin-bottom:0.1rem;opacity:0.8}
        .closing-message{background:rgba(255,255,255,0.15);padding:0.75rem;border-radius:8px;margin-top:0.75rem;font-size:0.9rem;font-style:italic;backdrop-filter:blur(10px);text-align:center}
        .footer{position:absolute;bottom:0.5rem;left:1rem;right:1rem;display:flex;justify-content:center;align-items:center;font-size:0.7rem;color:#9ca3af;z-index:10}
      </style>

      <div class="header">
        <h1 class="main-title">The Home Selling Process</h1>
        <p class="main-tagline">A clear path to "Sold."</p>
      </div>

      <div class="content">
        <div class="timeline">
          ${processSteps.map((phase) => `
            <div class="phase">
              <div class="phase-header">
                <div class="phase-number">${phase.number}</div>
                <h3 class="phase-title">${phase.title}</h3>
              </div>
              <div class="phase-steps">
                ${phase.steps.map((step) => `
                  <div class="step-item">
                    <span class="step-icon">${step.icon}</span>
                    <div class="step-content">
                      <div class="step-title">${step.title}</div>
                      <div class="step-desc">${step.desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="agent-section">
          <div class="agent-photo">
            ${agentPhoto
              ? `<img src="${agentPhoto}" alt="Agent" style="width:100%; height:100%; object-fit:cover;">`
              : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;">${G('agentName','AN').split(' ').map(n => n[0]).join('')}</div>`
            }
          </div>
          <div class="agent-content">
            <div class="agent-name">${G('agentName','Agent Name')}</div>
            <div class="agent-title">${G('agentTitle','REALTOR®')}</div>
            <div class="agent-contact">${G('agentPhone','(713) 456-1235')}</div>
            <div class="agent-contact">${G('agentEmail','email@company.com')}</div>
            <div class="agent-contact">License #${G('licenseNumber','123456')}</div>
          </div>
          <div class="closing-message">
            "Selling a home is complex, but with the right REALTOR® it's a clear and confident process. I'll guide you from start to finish."
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