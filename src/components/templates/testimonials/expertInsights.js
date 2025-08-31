export const expertInsights = ({ 
  formData = {}, 
  logos = {}, 
  theme = { 
    primary: '#00bcd4', 
    secondary: '#0097a7', 
    accent: '#00acc1', 
    text: '#111827', 
    textLight: '#6b7280', 
    white: '#ffffff' 
  }, 
  selectedBackground 
}) => {
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

  // Default expert quotes/insights
  const expertQuotes = [
    {
      quote: "New housing data shows 2021's feverish home sales pace broke a yearly record in October, with last month marking the eighth straight month of buyers snatching up homes more quickly than the fastest pace in previous years.",
      author: "realtor.com Press Release"
    },
    {
      quote: "These low mortgage rates, combined with the tailwind of first-time homebuyers entering the market, means that purchase demand will remain strong into next year.",
      author: "Sam Khater, Chief Economist, Freddie Mac"
    },
    {
      quote: "With strong homebuying demand, homes go under contract within days. Before the pandemic, the time from listing to pending usually took about three to five weeks.",
      author: "Shu Chen, Senior Professional, Office of the Chief Economist, CoreLogic"
    },
    {
      quote: "Home sellers have historically moved when something in their lives changed – a new baby, a marriage, a divorce or a new job. The pandemic has impacted everyone, and for many this became an impetus to sell.",
      author: "Jessica Lautz, VP of Demographics and Behavioral Insights, National Association of Realtors (NAR)"
    }
  ];

  return `
    <div class="page" style="background:#ffffff; width:8.5in; height:11in; position:relative; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <style>
        .header{background:linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);color:#ffffff;padding:1.25rem 1.25rem 1rem;display:flex;align-items:center;gap:1.5rem;position:relative;overflow:hidden}
        .header::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${theme.accent},${theme.primary},${theme.secondary})}
        .header-content{flex:2.5;padding-right:1rem}
        .header-image{flex:1;display:flex;justify-content:center;align-items:center}
        .title{font-size:2.8rem;font-weight:300;line-height:1;margin:0}
        .hero-img{width:240px;height:140px;border-radius:12px;object-fit:cover;box-shadow:0 8px 24px rgba(0,0,0,0.25);border:2px solid rgba(255,255,255,0.2)}
        .hero-placeholder{width:240px;height:140px;background:rgba(255,255,255,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:0.85rem;border:2px dashed rgba(255,255,255,0.3)}
        .content{padding:1.25rem 1.25rem 0;position:relative;z-index:3}
        .intro{font-size:1rem;line-height:1.5;color:${theme.textLight};font-style:italic;margin-bottom:1rem}
        .quotes{display:flex;flex-direction:column;gap:0.75rem}
        .quote-block{display:flex;align-items:flex-start;gap:0.75rem;background:#ffffff;border-radius:8px;padding:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);border-left:4px solid ${theme.primary}}
        .quote-icon{width:24px;height:24px;background:${theme.primary};border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-size:1rem;flex-shrink:0;margin-top:0.1rem}
        .quote-content{flex:1}
        .quote-text{font-size:0.95rem;line-height:1.4;color:${theme.primary};font-style:italic;margin-bottom:0.5rem}
        .quote-author{font-size:0.8rem;color:${theme.text};font-weight:600;font-style:normal}
        .agent-section{padding:0 1.25rem;margin-top:1.25rem;display:flex;gap:1rem;align-items:flex-start;position:relative;z-index:3}
        .agent-photo-container{width:70px;height:70px;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;background:#f3f4f6;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,0.1)}
        .agent-details{flex:1}
        .agent-name{font-size:1rem;color:${theme.text};font-weight:600;margin-bottom:0.1rem}
        .agent-title{font-size:0.9rem;color:${theme.primary};margin-bottom:0.25rem;font-weight:500}
        .agent-license{font-size:0.8rem;color:${theme.textLight};margin-bottom:0.1rem}
        .agent-contact{font-size:0.85rem;color:${theme.textLight};margin-bottom:0.05rem}
        .agent-website{font-size:0.85rem;color:${theme.primary};font-weight:500}
        .footer{position:absolute;bottom:0.5rem;left:1rem;right:1rem;display:flex;justify-content:center;align-items:center;font-size:0.7rem;color:#9ca3af;z-index:10}
        .page-number{position:absolute;bottom:1.25rem;left:50%;transform:translateX(-50%);font-size:0.9rem;color:${theme.textLight};font-weight:500;z-index:10}
        .waves{position:absolute;left:0;right:0;bottom:0;height:20%;pointer-events:none;z-index:1}
      </style>

      <div class="header">
        <div class="header-content">
          <h1 class="title">Expert Insights for<br/>Today's Sellers</h1>
        </div>
        <div class="header-image">
          ${hero
            ? `<img src="${hero}" alt="Professional" class="hero-img">`
            : `<div class="hero-placeholder">Professional Image</div>`
          }
        </div>
      </div>

      <div class="content">
        <p class="intro">Real estate experts agree: sellers have a great opportunity in front of them this season. Here are some of the main reasons experts say you should consider selling your house this winter.</p>
        
        <div class="quotes">
          ${expertQuotes.map((quote) => `
            <div class="quote-block">
              <div class="quote-icon">"</div>
              <div class="quote-content">
                <div class="quote-text">${quote.quote}</div>
                <div class="quote-author">– ${quote.author}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Agent info with clean design -->
      <div class="agent-section">
        <div class="agent-photo-container">
          ${agentPhoto
            ? `<img src="${agentPhoto}" alt="Agent" style="width:100%; height:100%; object-fit:cover;">`
            : `
              <svg width="70" height="70" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.3"/>
                    <stop offset="60%" stop-color="${theme.secondary}" stop-opacity="0.5"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="12" fill="url(#g1)"/>
                <path d="M0,44 Q16,36 32,44 T64,44 V64 H0 Z" fill="${theme.accent}" opacity="0.6"/>
                <path d="M0,48 Q20,40 32,48 T64,48 V64 H0 Z" fill="${theme.primary}" opacity="0.8"/>
              </svg>`
          }
        </div>
        <div class="agent-details">
          <div class="agent-name">${G('agentName','Agent Name')}</div>
          <div class="agent-title">${G('agentTitle','REALTOR®')}</div>
          <div class="agent-license">Arizona Real Estate License #${G('licenseNumber','122343')}</div>
          <div class="agent-contact">${G('agentPhone','(713) 456-1235')}</div>
          <div class="agent-contact">${G('agentEmail','email@metrorealty.com')}</div>
          <div class="agent-website">https://${G('companyName','company').toLowerCase().replace(/\s+/g,'')}.com</div>
        </div>
      </div>

      <div class="page-number">6</div>

      <div class="footer">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <img src="src/assets/logo-black-color.svg" alt="RPR Logo" style="height:20px;width:auto;object-fit:contain;"/>
          Copyright 2025 Realtors Property Resource® LLC. All Rights Reserved.
        </div>
      </div>
    </div>
  `;
}