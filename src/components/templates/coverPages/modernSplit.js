// modernSplit.js – Luxe Lifestyle (polished)
export default ({ formData = {}, theme = {}, selectedBackground }) => {
  const accent = theme.accent || '#C4A484';
  const variant = theme.agentVariant || 'cutout';

  // System gutter (everything snaps to this)
  const gutterIn = theme.gutterIn ?? 1.0;

  // Agent placement (relative to shared gutter)
  const agentX = theme.agentOffsetXIn ?? gutterIn + 0.45;
  const agentY = theme.agentOffsetYIn ?? 2.55;
  const agentW = theme.agentWidthIn   ?? 3.0;

  // Use new background system, fallback to old coverImage
  const bgImage = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : formData.coverImage;
  const bgUrl   = bgImage ? encodeURI(bgImage) : '';
  const headUrl = formData.agentPhoto ? encodeURI(formData.agentPhoto) : '';
  const logoUrl = formData.companyLogo ? encodeURI(formData.companyLogo) : '';

  const esc = (s) => String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');

  const title   = esc(formData.reportType || 'Listing Presentation');
  const tagline = esc(formData.reportSubheadline || 'from listed to sold');
  const aName   = esc(formData.agentName || 'Agent Name');
  const aRole   = esc(formData.agentTitle || 'REALTOR®');
  const coName  = esc(formData.companyName || 'Your Local Real Estate Expert');

  return `
  <div class="lpX" style="--accent:${accent};--gutter:${gutterIn}in;position:relative;width:8.5in;height:11in;background:#fff;color:#111827;font-family:'Playfair Display',serif;overflow:hidden">
    <style>
      @page{margin:0}

      /* Background layers */
      .bg{position:absolute;inset:0;background:${bgUrl ? `url('${bgUrl}') center/cover no-repeat` : '#f5f5f5'};z-index:0}
      .veil{position:absolute;inset:0;background:
        linear-gradient(180deg,rgba(255,255,255,.94) 0%,rgba(255,255,255,.82) 16%,
                               rgba(255,255,255,.42) 55%,rgba(255,255,255,0) 100%);z-index:1}
      /* Vignette behind title only */
      .vignette{position:absolute;left:calc(var(--gutter) - .2in);top:.65in;width:4.8in;height:2.3in;
        background:radial-gradient(ellipse at 35% 30%, rgba(255,255,255,.9), rgba(255,255,255,0) 70%);
        z-index:2;pointer-events:none}

      /* Title block – shared gutter */
      .title{position:absolute;left:var(--gutter);top:.9in;z-index:3;max-width:56%;
        font-kerning:normal;font-feature-settings:'liga' 1,'kern' 1}
      .title h1{margin:0;font-size:3.05rem;line-height:.96;font-weight:700;color:#111214}
      .script{margin:.38rem 0 0;font-family:'Dancing Script',cursive;font-size:1.5rem;color:var(--accent)}
      .rule{height:2px;width:2.4in;background:var(--accent);border-radius:2px;margin:.28rem 0 0;opacity:.55}

      /* Agent */
      .agent{position:absolute;left:${agentX}in;bottom:${agentY}in;width:${agentW}in;z-index:4}
      /* Cutout: add a subtle white stroke to separate from background */
      .agent.cut .ph{
        width:100%;aspect-ratio:3/4;object-fit:cover;display:block;border-radius:12px;
        box-shadow:0 18px 40px rgba(0,0,0,.18), 0 1px 0 rgba(255,255,255,.6) inset;
        outline:2px solid rgba(255,255,255,.75); outline-offset:-1px;
      }
      .agent.card .frame{background:#fff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;
        box-shadow:0 14px 28px rgba(0,0,0,.12)}
      .agent.card .ph{width:100%;aspect-ratio:3/4;object-fit:cover;display:block}
      .agent.card .cap{padding:.6rem .8rem;border-top:1px solid #e5e7eb;background:#fff}
      .nm{margin:0;font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
      .role{margin:.12rem 0 0;font-size:.8rem;color:#6b7280;letter-spacing:.12em}

      /* Optional right hairline for balance (kept very subtle) */
      .edge{position:absolute;right:.7in;top:2.05in;bottom:2.1in;width:0;border-right:1px solid rgba(0,0,0,.08);z-index:2}

      /* Footer – aligned to gutter, frosted + print fallback */
      .footer{
        position:absolute;left:50%;bottom:.8in;transform:translateX(-50%);
        background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
        border:1px solid rgba(0,0,0,.08);border-radius:14px;box-shadow:0 10px 22px rgba(0,0,0,.08);
        padding:1rem 1.25rem;display:flex;align-items:center;gap:1.1rem;z-index:5;min-width:6.2in;justify-content:space-between
      }
      .footer::before{content:'';position:absolute;left:0;right:0;top:0;height:1px;background:rgba(0,0,0,.05);border-radius:1px}
      .id{margin-left:calc(var(--gutter) - 1in);text-transform:uppercase}
      .id .nm{font-size:1rem;letter-spacing:.12em}
      .id .co{margin:.18rem 0 0;font-size:.75rem;color:#667085;letter-spacing:.15em}
      .divV{height:.75in;width:1px;background:rgba(0,0,0,.1)}
      .logo img{max-height:.6in;max-width:2.7in;opacity:.92}

      /* Print fallback (some printers ignore blur) */
      @media print {
        .footer{background:#ffffff}
      }
      @media (max-width:1024px){ .title h1{font-size:2.4rem} }
    </style>

    <div class="bg"></div>
    <div class="veil"></div>
    <div class="vignette"></div>

    <div class="title">
      <h1>${title}</h1>
      <div class="script">${tagline}</div>
      <div class="rule"></div>
    </div>

    ${headUrl ? `
      <div class="agent ${variant === 'card' ? 'card' : 'cut'}">
        ${variant === 'card' ? `
          <div class="frame">
            <img class="ph" src="${headUrl}" alt="${aName}">
            <div class="cap"><p class="nm">${aName}</p><p class="role">${aRole}</p></div>
          </div>` : `
          <img class="ph" src="${headUrl}" alt="${aName}">
        `}
      </div>` : ''}

    <div class="edge" aria-hidden="true"></div>

    <div class="footer">
      <div class="id">
        <p class="nm">${aName}</p>
        <p class="co">${coName}</p>
      </div>
      <div class="divV"></div>
      ${logoUrl ? `<div class="logo"><img src="${logoUrl}" alt="${coName}"></div>` : ''}
    </div>
  </div>
  `;
};