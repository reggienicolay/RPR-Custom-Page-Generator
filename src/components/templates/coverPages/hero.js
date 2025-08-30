export default function hero({ formData, logos, theme = { primary: '#2563eb', secondary: '#0ea5e9', accent: '#3b82f6', text: '#111827', textLight: '#6b7280', white: '#ffffff' }, selectedBackground }) {
  // Use new background system for cover photo, fallback to old coverImage
  const cover = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : (logos.coverImage || '');
  const agentPhoto = logos.agentPhoto || '';
  const companyLogo = logos.companyLogo;

  const companyName = (formData.companyName || "METRO REALTY").toUpperCase();
  const reportType = formData.reportType || "Market Activity Report";
  const address = formData.propertyAddress || "Livermore, California";
  const agentName = formData.agentName || "Agent Name";
  const agentTitle = formData.agentTitle || "REALTOR®";
  const phone = formData.agentPhone || "(713) 456-1235";
  const email = formData.agentEmail || "email@metrorealty.com";
  const lic = formData.licenseNumber || "122343";

  // ---- fixed page metrics (PDF render is 816 x 1056 px) ----
  const PAGE_W = 816;
  const PAGE_H = 1056;

  // layout (in pixels) – tuned for balanced look
  const PHOTO_H = 456;          // ~43% of page height
  const BAND_H = 210;           // banner height
  const BAND_SLOPE = 26;        // y delta from left to right (top edge tilt)
  const BAND_OVERLAP = 40;      // how much band overlaps into photo (eliminates gap)
  const CARD_OVERLAP = 12;      // how much card overlaps the blue band

  // computed anchors
  const bandTop = PHOTO_H - BAND_OVERLAP;     // banner starts inside photo area
  const bandBottom = bandTop + BAND_H;        // bottom of banner
  const cardTop = bandBottom - CARD_OVERLAP;  // intentional overlap

  // build a matched polygon for rim + banner using SAME numbers
  // Top edge: (0,0) -> (PAGE_W,BAND_SLOPE)
  // Bottom: straight line at y=BAND_H
  const bandViewBox = `0 0 ${PAGE_W} ${BAND_H}`;
  const bandPath = `M0,0 L${PAGE_W},${BAND_SLOPE} L${PAGE_W},${BAND_H} L0,${BAND_H} Z`;

  return `
  <div class="page" style="width:${PAGE_W}px;height:${PAGE_H}px;background:${theme.white};position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;">
    
    <!-- Cover photo -->
    <div style="position:absolute;left:0;top:0;right:0;height:${PHOTO_H}px;">
      ${cover ? `
      <img src="${cover}" alt="Cover"
           style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;"/>
      ` : `
      <div style="width:100%;height:100%;background:linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.accent} 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;">
        <div style="color:${theme.white};font-size:4rem;font-weight:100;margin-bottom:1rem;opacity:0.9;text-shadow:0 2px 8px rgba(0,0,0,0.2);">PROPERTY</div>
        <div style="color:${theme.white};font-size:1.8rem;font-weight:300;letter-spacing:0.2em;opacity:0.7;text-shadow:0 1px 4px rgba(0,0,0,0.2);">${reportType.toUpperCase()}</div>
      </div>
      `}
      <!-- legibility gradient -->
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,24,39,.48) 0%, rgba(17,24,39,.20) 55%, rgba(17,24,39,0) 100%);"></div>

      <!-- header labels on the photo -->
      <div style="position:absolute;left:96px;right:96px;top:64px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:.75rem;">
          ${companyLogo
            ? `<img src="${companyLogo}" alt="Logo" style="height:42px;max-width:240px;object-fit:contain;filter:drop-shadow(0 1px 1px rgba(0,0,0,.2));"/>`
            : `<div style="font-weight:900;letter-spacing:.20em;color:${theme.white};text-shadow:0 2px 8px rgba(0,0,0,.25);font-size:22px;">${companyName}</div>`
          }
        </div>
        <div style="color:rgba(255,255,255,0.9);font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;text-shadow:0 1px 3px rgba(0,0,0,.25);">
          ${reportType}
        </div>
      </div>
    </div>

    <!-- Themed banner overlaying the image (no white rim) -->
    <svg viewBox="${bandViewBox}" width="${PAGE_W}" height="${BAND_H}"
         style="position:absolute;left:0;top:${bandTop}px;filter:drop-shadow(0 8px 24px rgba(0,0,0,.15));">
      <defs>
        <linearGradient id="heroBandGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${theme.secondary}"/>
          <stop offset="100%" stop-color="${theme.primary}"/>
        </linearGradient>
      </defs>
      <path d="${bandPath}" fill="url(#heroBandGrad)"></path>
    </svg>

    <!-- Banner content (optically centered in band) -->
    <div style="position:absolute;left:96px;right:96px;top:${bandTop + 58}px;color:${theme.white};">
      <div style="font-size:56px;line-height:1;font-weight:900;letter-spacing:-.01em;text-shadow:0 2px 16px rgba(0,0,0,.25);">
        ${companyName}
      </div>
      <div style="margin-top:.35rem;font-size:18px;font-weight:600;opacity:.95;text-shadow:0 1px 6px rgba(0,0,0,.2);">
        ${address}
      </div>
    </div>

    <!-- Agent card (intentional 12px overlap into white) -->
    <div style="position:absolute;left:96px;right:96px;top:${cardTop}px;display:flex;gap:16px;align-items:flex-start;">
      <div style="width:110px;height:110px;border-radius:999px;overflow:hidden;border:4px solid ${theme.white};box-shadow:0 14px 36px rgba(2,6,23,.16);background:${theme.primary};">
        ${agentPhoto ? `
        <img src="${agentPhoto}" alt="Agent" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;"/>
        ` : `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:${theme.white};font-weight:700;font-size:2.5rem;">${agentName.charAt(0)}</div>
        `}
      </div>
      <div style="flex:1;background:${theme.white};border:1px solid #e5e7eb;border-radius:16px;padding:16px 18px;box-shadow:0 24px 60px rgba(2,6,23,.10);display:grid;grid-template-columns:1fr auto;gap:.5rem;align-items:start;">
        <div>
          <div style="font-weight:800;color:${theme.text};font-size:18px;">${agentName}</div>
          <div style="color:${theme.primary};font-size:13px;margin-top:2px;font-weight:500;">${agentTitle}</div>
          <div style="color:${theme.textLight};font-size:12px;margin-top:6px;">Arizona Real Estate License #${lic}</div>
          <div style="color:${theme.textLight};font-size:14px;margin-top:8px;">${phone}</div>
          <div style="color:${theme.textLight};font-size:14px;">${email}</div>
        </div>
        <div style="display:flex;align-items:flex-start;">
          <div style="width:34px;height:30px;border-radius:8px;background:${theme.text};color:${theme.white};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;">RPR</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="position:absolute;left:96px;right:96px;bottom:84px;display:flex;align-items:center;justify-content:space-between;color:${theme.textLight};font-size:12px;">
      <div style="display:flex;align-items:center;gap:.5rem;">
        ${companyLogo
          ? `<img src="${companyLogo}" alt="Logo" style="height:22px;max-width:160px;object-fit:contain;opacity:.85;"/>`
          : `<span style="font-weight:800;letter-spacing:.14em;color:${theme.textLight};">${companyName}</span>`
        }
      </div>
      <div>© 2025 Realtors Property Resource® LLC. All Rights Reserved.</div>
    </div>
  </div>
  `;
}