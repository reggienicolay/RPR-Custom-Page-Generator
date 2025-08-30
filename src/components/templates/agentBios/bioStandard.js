// bioStandard.js - Agent Bio Standard Template (Elegant v2)
// Drop-in replacement for your existing function. Preserves your data shape
// and adds a refined layout, print-ready styles, optional sections, and
// accessibility improvements.

export const bioStandard = ({ formData = {}, logos = {}, theme = {} }) => {
  const primary = theme.primary || '#1f4b99';
  const secondary = theme.secondary || '#2563eb';
  const accent = theme.accent || '#14b8a6';

  // Minimal text escape for safety in text nodes
  const esc = (s) => String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // Convenience getters
  const G = (k, fb = '') => esc(formData[k] ?? fb);
  const has = (k) => !!(formData[k] && String(formData[k]).trim());

  const cover = formData.coverImage ? `url(${encodeURI(formData.coverImage)})` : 'none';
  const photo = formData.agentPhoto ? encodeURI(formData.agentPhoto) : '';
  const companyLogo = formData.companyLogo ? encodeURI(formData.companyLogo) : '';

  // Optional arrays: allow comma-separated user input
  const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(',')).map(x => esc(x.trim())).filter(Boolean);

  const specialties = has('agentSpecialties') ? toList(formData.agentSpecialties) : [];
  const awards = has('agentAwards') ? toList(formData.agentAwards) : [];
  const education = has('agentEducation') ? toList(formData.agentEducation) : [];
  const serviceAreas = has('serviceAreas') ? toList(formData.serviceAreas) : [];
  const languages = has('languages') ? toList(formData.languages) : [];
  const designations = has('agentDesignations') ? toList(formData.agentDesignations) : [];

  const website = formData.agentWebsite ? String(formData.agentWebsite) : '';
  const instagram = formData.instagram ? String(formData.instagram) : '';
  const facebook = formData.facebook ? String(formData.facebook) : '';
  const linkedin = formData.linkedin ? String(formData.linkedin) : '';

  return `
    <div class="page bio-page" style="--primary:${primary};--secondary:${secondary};--accent:${accent};">
      <style>
        /* --- Base & Print --- */
        .bio-page{background:#ffffff;color:#1f2937;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji';position:relative;overflow:hidden;margin:0;padding:0;}
        .container{padding:1.75rem 2rem 2rem 2rem;}
        @media print{.container{padding:1.25rem 1.25rem 1.5rem 1.25rem;} .header{box-shadow:none}}
        .muted{color:#475569}
        .kicker{letter-spacing:.12em;text-transform:uppercase;font-size:.8rem;opacity:.9}

        /* --- Header --- */
        .header{position:relative;color:#fff;padding:2.75rem 2rem 1.75rem 2rem;background:linear-gradient(135deg,var(--primary) 0%, var(--secondary) 100%);box-shadow:0 12px 40px rgba(0,0,0,.18)}
        .header::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 18% 22%,rgba(255,255,255,.12) 1px,transparent 1px);background-size:42px 42px;opacity:.6}
        .header::after{content:'';position:absolute;inset:0;background-image:${cover};background-size:cover;background-position:center;opacity:.12}
        .head-flex{position:relative;z-index:1;display:flex;align-items:center;gap:1.5rem}
        .avatar-wrap{width:120px;height:120px;border-radius:999px;background:#fff;padding:4px;box-shadow:0 10px 30px rgba(0,0,0,.35)}
        .avatar{width:100%;height:100%;border-radius:999px;object-fit:cover;display:block}
        .titleblock h1{margin:0 0 .35rem 0;font-weight:700;line-height:1.05;letter-spacing:-.02em;font-size:2.25rem}
        .subtitle{font-size:1.05rem;opacity:.95;margin-bottom:.35rem}
        .company{font-size:.98rem;opacity:.9;font-style:italic}
        .chip{display:inline-block;margin-top:.6rem;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:999px;padding:.4rem .85rem;font-size:.88rem}

        /* --- Layout --- */
        .grid{display:grid;grid-template-columns:1.1fr .9fr;gap:1.75rem;margin-top:1.5rem}
        @media (max-width:900px){.grid{grid-template-columns:1fr}}

        /* --- Section headers --- */
        .section h2,.section h3{margin:0 0 .6rem 0;font-weight:700;color:var(--primary)}
        .section h2{font-size:1.35rem}
        .section h3{font-size:1.1rem}
        .rule{height:3px;width:52px;background:var(--primary);border-radius:2px;margin:.35rem 0 0 0}

        /* --- Cards --- */
        .card{background:#f8fafc;border:1px solid #e5e7eb;border-left:4px solid var(--primary);border-radius:12px;padding:1rem;box-shadow:0 2px 10px rgba(0,0,0,.04)}
        .card.gold{background:#fff8e7;border-left-color:#f59e0b}
        .card.sky{background:#f0f9ff;border-left-color:#0ea5e9}
        .list{padding-left:1.05rem;margin:0}
        .list li{margin:.35rem 0}
        .pillrow{display:flex;flex-wrap:wrap;gap:.5rem}
        .pill{background:#eef2ff;color:#334155;border:1px solid #c7d2fe;border-radius:999px;padding:.4rem .7rem;font-size:.85rem}

        /* --- Body copy --- */
        .body{font-size:1.02rem;line-height:1.7;color:#374151}
        .body p{margin:.75rem 0}

        /* --- Contact band --- */
        .cta{background:linear-gradient(135deg,var(--primary) 0%, var(--secondary) 100%);color:#fff;border-radius:14px;padding:1.2rem 1rem;margin-top:1.25rem;position:relative;overflow:hidden}
        .cta::after{content:'';position:absolute;right:-12%;top:-30%;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,.07)}
        .ctagrid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:.75rem}
        .ctacell{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:10px;padding:.8rem;text-align:center}
        .ctalabel{font-weight:700;font-size:.88rem;margin-bottom:.15rem}
        .cta a{color:#fff;text-decoration:none}

        /* --- Footer logo --- */
        .brand{padding-top:1rem;margin-top:1rem;border-top:1px solid #e5e7eb;text-align:center}
        .brand img{max-height:58px;max-width:260px;opacity:.82}

        /* --- Micro --- */
        .kv{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
        .kv .k{font-weight:600}
      </style>

      <header class="header" role="banner" aria-label="Agent header">
        <div class="head-flex">
          ${photo ? `
            <div class="avatar-wrap">
              <img class="avatar" src="${photo}" alt="Headshot of ${G('agentName','Agent')}">
            </div>
          ` : ''}
          <div class="titleblock">
            <div class="kicker">${G('agentTitle','REALTOR®')}</div>
            <h1>${G('agentName','Agent Name')}</h1>
            ${has('companyName') ? `<div class="company">${G('companyName')}</div>` : ''}
            ${has('agentExperience') ? `<div class="chip"><strong>${esc(formData.agentExperience)}+ years</strong> of excellence</div>` : ''}
          </div>
        </div>
      </header>

      <main class="container" role="main">
        ${has('agentBio') ? `
          <section class="section" aria-label="About the agent">
            <h2>About Me</h2>
            <div class="rule"></div>
            <div class="body">${G('agentBio')}</div>
          </section>
        ` : ''}

        <section class="grid">
          <div>
            ${specialties.length ? `
              <div class="section">
                <h3>Areas of Expertise</h3>
                <div class="card">
                  <ul class="list">
                    ${specialties.map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              </div>
            ` : ''}

            ${serviceAreas.length ? `
              <div class="section">
                <h3>Markets I Serve</h3>
                <div class="pillrow">
                  ${serviceAreas.map(a => `<span class="pill">${a}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${languages.length ? `
              <div class="section">
                <h3>Languages</h3>
                <div class="pillrow">
                  ${languages.map(l => `<span class="pill">${l}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <div>
            ${awards.length ? `
              <div class="section">
                <h3>Awards & Recognition</h3>
                <div class="card gold">
                  <ul class="list">
                    ${awards.map(a => `<li>${a}</li>`).join('')}
                  </ul>
                </div>
              </div>
            ` : ''}

            ${education.length ? `
              <div class="section">
                <h3>Education & Certifications</h3>
                <div class="card sky">
                  <ul class="list">
                    ${education.map(e => `<li>${e}</li>`).join('')}
                  </ul>
                </div>
              </div>
            ` : ''}

            ${designations.length ? `
              <div class="section">
                <h3>Professional Designations</h3>
                <div class="pillrow">
                  ${designations.map(d => `<span class="pill">${d}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </section>

        <section class="cta" aria-label="Contact details">
          <div class="ctagrid">
            ${has('agentPhone') ? `
              <div class="ctacell">
                <div class="ctalabel">Phone</div>
                <a href="tel:${esc(formData.agentPhone)}">${G('agentPhone')}</a>
              </div>
            ` : ''}
            ${has('agentEmail') ? `
              <div class="ctacell">
                <div class="ctalabel">Email</div>
                <a href="mailto:${esc(formData.agentEmail)}">${G('agentEmail')}</a>
              </div>
            ` : ''}
            ${has('licenseNumber') ? `
              <div class="ctacell">
                <div class="ctalabel">License</div>
                <div>${G('licenseNumber')}</div>
              </div>
            ` : ''}
            ${website ? `
              <div class="ctacell">
                <div class="ctalabel">Website</div>
                <a href="${esc(website)}" target="_blank" rel="noopener">${esc(website)}</a>
              </div>
            ` : ''}
            ${instagram ? `
              <div class="ctacell">
                <div class="ctalabel">Instagram</div>
                <a href="${esc(instagram)}" target="_blank" rel="noopener">@${esc(instagram.replace(/^.*\//,''))}</a>
              </div>
            ` : ''}
            ${facebook ? `
              <div class="ctacell">
                <div class="ctalabel">Facebook</div>
                <a href="${esc(facebook)}" target="_blank" rel="noopener">${esc(facebook.replace(/^https?:\/\//,'').replace(/\/$/,''))}</a>
              </div>
            ` : ''}
            ${linkedin ? `
              <div class="ctacell">
                <div class="ctalabel">LinkedIn</div>
                <a href="${esc(linkedin)}" target="_blank" rel="noopener">${esc(linkedin.replace(/^https?:\/\//,'').replace(/\/$/,''))}</a>
              </div>
            ` : ''}
          </div>
        </section>

        ${companyLogo ? `
          <div class="brand">
            <img src="${companyLogo}" alt="${G('companyName','Company')} logo"/>
          </div>
        ` : ''}

        ${has('disclaimer') || has('officeAddress') ? `
          <section class="section" style="margin-top:.75rem">
            <div class="muted" style="font-size:.82rem;line-height:1.5">
              ${has('officeAddress') ? `<div><strong>Office:</strong> ${G('officeAddress')}</div>` : ''}
              ${has('disclaimer') ? `<div>${G('disclaimer')}</div>` : ''}
            </div>
          </section>
        ` : ''}
      </main>
    </div>
  `;
};
