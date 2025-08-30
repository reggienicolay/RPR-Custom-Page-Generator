// bioDetailed.js - Detailed Agent Bio Template (InkSaver v2)
// Purpose: keep the same data shape but drastically reduce background ink use
// and tone down the footer while preserving a premium, print-friendly look.

export const bioDetailed = ({ formData = {}, logos = {}, theme = {}, selectedBackground }) => {
  const primary   = theme.primary   || '#1f4b99';
  const secondary = theme.secondary || '#2563eb';
  const accent    = theme.accent    || '#0ea5e9';
  const inkSaver  = theme.inkSaver  !== false; // default true: ink-friendly

  const esc = (s) => String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const G = (k, fb='') => esc(formData[k] ?? fb);
  const has = (k) => !!(formData[k] && String(formData[k]).trim());

  const photo       = formData.agentPhoto ? encodeURI(formData.agentPhoto) : '';
  // Use new background system for cover image, fallback to old system
  const coverImage = selectedBackground ? (selectedBackground.url || selectedBackground.thumbnail) : formData.coverImage;
  const coverImg    = coverImage ? encodeURI(coverImage) : '';
  const companyLogo = formData.companyLogo ? encodeURI(formData.companyLogo) : '';

  // Utility to split comma-separated strings safely
  const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(','))
    .map(x => esc(x.trim())).filter(Boolean);

  const specialties  = has('agentSpecialties')   ? toList(formData.agentSpecialties)   : [];
  const awards       = has('agentAwards')        ? toList(formData.agentAwards)        : [];
  const education    = has('agentEducation')     ? toList(formData.agentEducation)     : [];
  const serviceAreas = has('serviceAreas')       ? toList(formData.serviceAreas)       : [];
  const languages    = has('languages')          ? toList(formData.languages)          : [];
  const designations = has('agentDesignations')  ? toList(formData.agentDesignations)  : [];

  // Header style: white background, thin brand band; optional soft photo tint if not printing
  const headerBg = inkSaver ? '#ffffff' : `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
  const headerFg = inkSaver ? '#0f172a' : '#ffffff';

  return `
    <div class="page ink-friendly" style="--primary:${primary};--secondary:${secondary};--accent:${accent};">
      <style>
        /* Base & print */
        .ink-friendly{background:#ffffff;color:#1f2937;font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;position:relative;overflow:hidden}
        .container{padding:1.75rem 2rem 2rem}
        @media print{.container{padding:1rem 1.25rem 1.25rem}}
        .muted{color:#475569}

        /* Header */
        .header{position:relative;background:${headerBg};color:${headerFg};padding:1.5rem 2rem 1.25rem;border-bottom:1px solid #e5e7eb}
        .brand-band{height:4px;background:linear-gradient(90deg,var(--primary),var(--secondary));border-radius:2px 2px 0 0}
        .head{display:flex;align-items:center;gap:1rem}
        .avatar-wrap{width:112px;height:112px;border-radius:999px;background:#fff;border:1px solid #e5e7eb;overflow:hidden}
        .avatar{width:100%;height:100%;object-fit:cover;display:block}
        .name{margin:0;font-weight:800;letter-spacing:-.02em;line-height:1.05;font-size:2rem}
        .sub{margin:.15rem 0 0 0;font-size:1rem;opacity:.85}
        .meta{margin-top:.35rem;display:flex;gap:.5rem;flex-wrap:wrap}
        .badge{border:1px solid #cbd5e1;background:#f8fafc;border-radius:999px;padding:.25rem .6rem;font-size:.82rem;color:#0f172a}

        /* Section headers */
        .section h3{margin:0 0 .5rem;font-weight:800;color:var(--primary);font-size:1.1rem}
        .rule{height:2px;width:48px;background:var(--primary);border-radius:2px;margin:.25rem 0 .75rem}

        /* Cards */
        .card{background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:1rem}
        .soft{background:#fafafa}
        .list{padding-left:1.1rem;margin:0}
        .list li{margin:.3rem 0}
        .pillrow{display:flex;flex-wrap:wrap;gap:.45rem}
        .pill{background:#f1f5f9;border:1px solid #e2e8f0;color:#334155;border-radius:999px;padding:.35rem .6rem;font-size:.85rem}

        /* Layout */
        .grid{display:grid;grid-template-columns:1.1fr .9fr;gap:1.5rem}
        @media(max-width:900px){.grid{grid-template-columns:1fr}}
        .body{font-size:1.02rem;line-height:1.7;color:#374151}

        /* CTA (toned down) */
        .cta{border:1px solid #e5e7eb;border-radius:12px;padding:1rem;margin-top:1.25rem;background:#ffffff}
        .cta h4{margin:.1rem 0 .4rem;font-size:1.2rem;font-weight:800;color:#0f172a}
        .ctagrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:.6rem}
        .ctacell{border:1px solid #e5e7eb;border-radius:10px;padding:.75rem;text-align:center;background:#f8fafc}
        .ctalabel{font-weight:700;font-size:.85rem;margin-bottom:.1rem;color:#0f172a}
        .cta a{color:var(--primary);text-decoration:none}

        /* Footer (subtle, not bold) */
        .footer{margin-top:1rem;padding-top:.85rem;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;gap:1rem}
        .brand img{max-height:46px;max-width:220px;opacity:.85}
        .tag{font-size:.85rem;color:#64748b}

        /* Optional cover whisper (disabled in inkSaver) */
        ${inkSaver ? '' : `.header::after{content:'';position:absolute;inset:0;background:url('${coverImg}') center/cover no-repeat;opacity:.08;pointer-events:none}`}
      </style>

      <div class="brand-band"></div>
      <header class="header" role="banner" aria-label="Agent header">
        <div class="head">
          ${photo ? `<div class="avatar-wrap"><img class="avatar" src="${photo}" alt="Headshot of ${G('agentName','Agent')}"></div>` : ''}
          <div>
            <h1 class="name">${G('agentName','Agent Name')}</h1>
            <div class="sub">${G('agentTitle','REALTOR®')}${has('companyName') ? ` · ${G('companyName')}` : ''}</div>
            <div class="meta">
              ${has('licenseNumber') ? `<span class="badge">License: ${G('licenseNumber')}</span>` : ''}
              ${has('agentExperience') ? `<span class="badge">${G('agentExperience')} yrs experience</span>` : ''}
            </div>
          </div>
        </div>
      </header>

      <main class="container" role="main">
        ${has('agentBio') ? `
          <section class="section" aria-label="Professional profile">
            <h3>Professional Profile</h3>
            <div class="rule"></div>
            <div class="card body">${G('agentBio')}</div>
          </section>
        ` : ''}

        <section class="grid">
          <div>
            ${specialties.length ? `
              <div class="section">
                <h3>Areas of Expertise</h3>
                <div class="card"><ul class="list">${specialties.map(s=>`<li>${s}</li>`).join('')}</ul></div>
              </div>
            ` : ''}

            ${serviceAreas.length ? `
              <div class="section">
                <h3>Markets I Serve</h3>
                <div class="pillrow">${serviceAreas.map(a=>`<span class="pill">${a}</span>`).join('')}</div>
              </div>
            ` : ''}

            ${languages.length ? `
              <div class="section">
                <h3>Languages</h3>
                <div class="pillrow">${languages.map(l=>`<span class="pill">${l}</span>`).join('')}</div>
              </div>
            ` : ''}
          </div>

          <div>
            ${awards.length ? `
              <div class="section">
                <h3>Awards & Recognition</h3>
                <div class="card soft"><ul class="list">${awards.map(a=>`<li>${a}</li>`).join('')}</ul></div>
              </div>
            ` : ''}

            ${education.length ? `
              <div class="section">
                <h3>Education & Certifications</h3>
                <div class="card soft"><ul class="list">${education.map(e=>`<li>${e}</li>`).join('')}</ul></div>
              </div>
            ` : ''}

            ${designations.length ? `
              <div class="section">
                <h3>Professional Designations</h3>
                <div class="pillrow">${designations.map(d=>`<span class="pill">${d}</span>`).join('')}</div>
              </div>
            ` : ''}
          </div>
        </section>

        <section class="cta" aria-label="Contact details">
          <h4>Ready to Work Together?</h4>
          <div class="ctagrid">
            ${has('agentPhone') ? `
              <div class="ctacell"><div class="ctalabel">Phone</div><a href="tel:${G('agentPhone')}">${G('agentPhone')}</a></div>
            ` : ''}
            ${has('agentEmail') ? `
              <div class="ctacell"><div class="ctalabel">Email</div><a href="mailto:${G('agentEmail')}">${G('agentEmail')}</a></div>
            ` : ''}
            ${has('licenseNumber') ? `
              <div class="ctacell"><div class="ctalabel">License</div><div>${G('licenseNumber')}</div></div>
            ` : ''}
          </div>
        </section>

        <div class="footer">
          ${companyLogo ? `<div class="brand"><img src="${companyLogo}" alt="${G('companyName','Company')} logo"></div>` : '<div></div>'}
          <div class="tag">Professional Real Estate Services</div>
        </div>
      </main>
    </div>
  `;
};