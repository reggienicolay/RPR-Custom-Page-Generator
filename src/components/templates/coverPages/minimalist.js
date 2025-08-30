export default function minimalist({ formData, logos, theme = { primary: '#667eea', secondary: '#764ba2', accent: '#ff6b6b', text: '#1f3254', textLight: '#334155', white: '#ffffff' }, selectedBackground }) {
  // Data
  const title = (formData.reportType || "Market Activity Report").toUpperCase();
  const agent = formData.agentName || "Agent Name";
  // Use new background system for photo, fallback to old coverImage
  const photo = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos.coverImage || '');
  const agentPhoto = logos.agentPhoto || '';
  const logo = logos.companyLogo;

  // Page metrics (816×1056 px)
  const PAGE_W = 816;
  const PAGE_H = 1056;

  // Layout (tuned)
  const LEFT_GUTTER = 112; // ~1.16in
  const RIGHT_GUTTER = 64;
  const TOP_PAD = 96;

  const CIRCLE_D = 480;                    // big photo circle diameter (reduced from 560)
  const CIRCLE_X = PAGE_W - RIGHT_GUTTER - CIRCLE_D + 24; // more space for left content
  const CIRCLE_Y = 260;                   // vertical anchor (moved down slightly)

  return `
  <div class="page" style="width:${PAGE_W}px;height:${PAGE_H}px;background:${theme.white};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;position:relative;overflow:hidden;">

    <!-- Top-left rounded block (logo area) -->
    <div style="position:absolute;left:-180px;top:-180px;width:440px;height:440px;
                background:linear-gradient(135deg,${theme.primary},${theme.secondary});border-bottom-right-radius:240px;"></div>
    <div style="position:absolute;left:${LEFT_GUTTER}px;top:${TOP_PAD - 6}px;">
      ${
        logo
          ? `<img src="${logo}" alt="Logo" style="max-width:220px;max-height:80px;object-fit:contain;opacity:.95;"/>`
          : `<div style="font-weight:700;letter-spacing:.08em;line-height:1.2;font-size:28px;color:${theme.white};opacity:.9;">${(formData.companyName || 'COMPANY').toUpperCase()}</div>`
      }
    </div>

    <!-- Big circular background image with soft rings -->
    <div style="position:absolute;left:${CIRCLE_X}px;top:${CIRCLE_Y}px;width:${CIRCLE_D}px;height:${CIRCLE_D}px;border-radius:50%;
                background:${theme.primary}20;display:flex;align-items:center;justify-content:center;">
      <!-- outer soft ring -->
      <div style="position:absolute;inset:-22px;border-radius:50%;box-shadow:0 0 0 22px ${theme.primary}15;"></div>
      <!-- inner bevel ring -->
      <div style="position:absolute;inset:-2px;border-radius:50%;box-shadow:0 0 0 10px ${theme.secondary}25 inset;"></div>
      
      ${photo ? `
      <!-- image -->
      <img src="${photo}" alt="cover"
           style="position:absolute;inset:28px;width:calc(100% - 56px);height:calc(100% - 56px);border-radius:50%;object-fit:cover;object-position:center;"/>
      ` : `
      <!-- fallback design -->
      <div style="position:absolute;inset:28px;width:calc(100% - 56px);height:calc(100% - 56px);border-radius:50%;background:linear-gradient(135deg,${theme.primary},${theme.secondary});display:flex;align-items:center;justify-content:center;flex-direction:column;">
        <div style="color:${theme.white};font-size:3rem;font-weight:100;margin-bottom:1rem;opacity:0.8;">PROPERTY</div>
        <div style="color:${theme.white};font-size:1.5rem;font-weight:300;letter-spacing:0.2em;opacity:0.6;">REPORT</div>
      </div>
      `}
    </div>

    <!-- Left column: title and presented by -->
    <div style="position:absolute;left:${LEFT_GUTTER}px;top:${TOP_PAD + 220}px;max-width:${CIRCLE_X - LEFT_GUTTER - 40}px;">
      <div style="font-size:56px;font-weight:900;color:${theme.text};line-height:0.95;letter-spacing:-.01em;margin-bottom:32px;">
        ${title.replace(/\n/g, "<br/>")}
      </div>

      <!-- Presented by line -->
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
        <div style="width:4px;height:22px;background:${theme.accent};opacity:.8;"></div>
        <div style="font-size:19px;color:${theme.textLight};opacity:.9;">Presented by</div>
      </div>

      <!-- Agent row -->
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:40px;">
        <div style="width:52px;height:52px;border-radius:50%;overflow:hidden;border:3px solid ${theme.white};
                    box-shadow:0 8px 16px rgba(0,0,0,.1);background:${theme.primary};">
          ${agentPhoto ? 
            `<img src="${agentPhoto}" alt="Agent" style="width:100%;height:100%;object-fit:cover;object-position:center;"/>` :
            `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:${theme.white};font-weight:700;font-size:1.2rem;">${agent.charAt(0)}</div>`
          }
        </div>
        <div style="font-size:19px;font-weight:700;color:${theme.text};">${agent}</div>
      </div>
      
      <!-- Property address -->
      ${formData.propertyAddress ? `
      <div style="padding-top:20px;border-top:1px solid ${theme.primary}25;">
        <div style="font-size:16px;color:${theme.textLight};margin-bottom:12px;font-weight:500;letter-spacing:0.05em;">PROPERTY LOCATION</div>
        <div style="font-size:24px;font-weight:600;color:${theme.text};line-height:1.3;">${formData.propertyAddress}</div>
      </div>
      ` : ''}
    </div>

    <!-- Bottom waves with theme colors -->
    <svg viewBox="0 0 1440 340" preserveAspectRatio="none"
         style="position:absolute;left:0;right:0;bottom:-10px;width:100%;height:36%;">
      <path d="M0,240 C220,140 380,190 540,210 C760,240 920,200 1220,240 L1440,260 L1440,360 L0,360 Z" fill="${theme.secondary}"/>
      <path d="M0,280 C280,170 520,260 760,280 C1040,300 1200,240 1440,280 L1440,360 L0,360 Z" fill="${theme.primary}"/>
    </svg>

    <!-- RPR Footer -->
    <div style="position:absolute;bottom:20px;left:${LEFT_GUTTER}px;display:flex;align-items:center;gap:12px;z-index:10;">
      <div style="width:2.5rem;height:2rem;background:${theme.white};color:${theme.primary};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
        RPR
      </div>
      <div style="color:${theme.white};font-size:0.75rem;font-weight:500;opacity:0.9;">
        Powered by Realtors Property Resource®
      </div>
    </div>
  </div>
  `;
}