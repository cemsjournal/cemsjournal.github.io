// =========================================================
// JoES Shared Layout Renderer (Banner, Header, Footer, Floaters)
// =========================================================

window.JOES_LAYOUT = {
  render(db, activeNav, onLangChange) {
    const I18N = window.JOES_I18N;
    const s = db.settings;

    // 1. Top Announcement Banner
    const bannerEl = document.getElementById("joes-banner");
    if (bannerEl) {
      if (s.banner_enabled) {
        bannerEl.style.display = "block";
        bannerEl.innerHTML = `
          <div class="announcement-banner">
            <div class="container announcement-inner">
              <span class="announcement-badge">${s.abbr || "JoES"} · ${I18N.t("upcoming")}</span>
              <span class="announcement-text">${I18N.pick(s, "banner_text")}</span>
              <div class="countdown" id="joes-countdown">
                <div class="countdown-box"><span class="countdown-num" id="cd-d">--</span><span class="countdown-lbl">${I18N.t("days")}</span></div>
                <div class="countdown-box"><span class="countdown-num" id="cd-h">--</span><span class="countdown-lbl">${I18N.t("hours")}</span></div>
                <div class="countdown-box"><span class="countdown-num" id="cd-m">--</span><span class="countdown-lbl">${I18N.t("mins")}</span></div>
                <div class="countdown-box"><span class="countdown-num" id="cd-s">--</span><span class="countdown-lbl">${I18N.t("secs")}</span></div>
              </div>
            </div>
          </div>
        `;
        this.startCountdown(s.banner_date);
      } else {
        bannerEl.style.display = "none";
      }
    }

    // 2. Header & Navigation
    const headerEl = document.getElementById("joes-header");
    if (headerEl) {
      const volItems = (db.volumes || []).map((v) =>
        `<a class="nav-dropdown-item" href="volume.html?v=${encodeURIComponent(v.id)}">
          <span>${I18N.pick(v, "title")}</span>
          <span>↗</span>
        </a>`
      ).join("");

      headerEl.innerHTML = `
        <header class="site-header">
          <div class="container header-inner">
            <a href="index.html" class="brand">
              <img src="assets/img/logo.svg" alt="${s.abbr || 'JoES'} Logo"/>
              <div class="brand-text">
                <span class="brand-abbr">${s.abbr || "JoES"}</span>
                <span class="brand-name">${I18N.pick(s, "name")}</span>
              </div>
            </a>

            <nav class="main-nav" id="joes-main-nav">
              <a href="cover.html" class="nav-link ${activeNav === 'cover' ? 'active' : ''}">${I18N.t("nav_cover")}</a>
              <a href="page.html?slug=regulations" class="nav-link ${activeNav === 'regulations' ? 'active' : ''}">${I18N.t("nav_regulations")}</a>
              <a href="page.html?slug=rules" class="nav-link ${activeNav === 'rules' ? 'active' : ''}">${I18N.t("nav_rules")}</a>
              <a href="board.html" class="nav-link ${activeNav === 'board' ? 'active' : ''}">${I18N.t("nav_board")}</a>
              <a href="board.html?view=reviewers" class="nav-link ${activeNav === 'reviewers' ? 'active' : ''}">${I18N.t("nav_reviewers")}</a>
              <div class="nav-dropdown" id="joes-vol-dropdown">
                <button type="button" class="nav-dropdown-btn ${activeNav === 'volumes' ? 'active' : ''}" id="joes-vol-btn">
                  ${I18N.t("nav_volumes")} ▾
                </button>
                <div class="nav-dropdown-menu">${volItems}</div>
              </div>
            </nav>

            <div class="header-actions">
              <a href="admin/index.html" class="nav-link" style="font-size:0.82rem; color:var(--muted);">${I18N.t("nav_admin")}</a>
              <button type="button" class="lang-toggle" id="joes-lang-toggle">${I18N.t("lang_btn")}</button>
              <button type="button" class="mobile-menu-btn" id="joes-mobile-btn" aria-label="Menu">☰</button>
            </div>
          </div>
        </header>
      `;

      document.getElementById("joes-lang-toggle").addEventListener("click", () => {
        const next = I18N.getLang() === "en" ? "ar" : "en";
        I18N.setLang(next);
        if (onLangChange) onLangChange();
      });

      const mobileBtn = document.getElementById("joes-mobile-btn");
      const nav = document.getElementById("joes-main-nav");
      mobileBtn.addEventListener("click", () => nav.classList.toggle("open"));

      const volBtn = document.getElementById("joes-vol-btn");
      const volDrop = document.getElementById("joes-vol-dropdown");
      volBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        volDrop.classList.toggle("open");
      });
      document.addEventListener("click", () => volDrop.classList.remove("open"));
    }

    // 3. Footer
    const footerEl = document.getElementById("joes-footer");
    if (footerEl) {
      footerEl.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-grid">
              <div>
                <h4>${I18N.pick(s, "name")} (${s.abbr || "JoES"})</h4>
                ${I18N.pick(s, "subtitle") ? `<p style="font-size:0.9rem; color:#94A3B8; margin:0 0 12px;">${I18N.pick(s, "subtitle")}</p>` : ""}
                <p style="font-size:0.86rem; margin:0;">🌐 ${s.website || "www.aes.edu.sd"} &nbsp;|&nbsp; ✉️ ${s.email || "info@aes.edu.sd"}</p>
              </div>
              <div>
                <h4>${I18N.t("footer_quick")}</h4>
                <ul class="footer-links">
                  <li><a href="cover.html">${I18N.t("nav_cover")}</a></li>
                  <li><a href="page.html?slug=regulations">${I18N.t("nav_regulations")}</a></li>
                  <li><a href="page.html?slug=rules">${I18N.t("nav_rules")}</a></li>
                  <li><a href="board.html">${I18N.t("nav_board")}</a></li>
                  <li><a href="board.html?view=reviewers">${I18N.t("nav_reviewers")}</a></li>
                </ul>
              </div>
              <div>
                <h4>${I18N.t("footer_contact")}</h4>
                <ul class="footer-links">
                  <li><a href="page.html?slug=applied-math">${I18N.t("card_math_title")}</a></li>
                  <li><a href="page.html?slug=info">${I18N.t("card_info_title")}</a></li>
                  <li><a href="lectures.html">${I18N.t("card_lectures_title")}</a></li>
                  <li><a href="links.html">${I18N.t("card_links_title")}</a></li>
                </ul>
              </div>
            </div>
            <div class="footer-bottom">
              <span>© ${new Date().getFullYear()} ${I18N.pick(s, "name")} (${s.abbr || "JoES"}). ${I18N.t("footer_rights")}</span>
              <span><a href="admin/index.html">${I18N.t("nav_admin")}</a></span>
            </div>
          </div>
        </footer>
      `;
    }

    // 4. Floating WhatsApp & Phone Buttons
    let floatEl = document.getElementById("joes-floaters");
    if (!floatEl) {
      floatEl = document.createElement("div");
      floatEl.id = "joes-floaters";
      document.body.appendChild(floatEl);
    }
    const waNum = (s.whatsapp || "").replace(/[^0-9]/g, "");
    const telNum = (s.phone || "").replace(/\s+/g, "");
    floatEl.innerHTML = `
      <div class="floating-contacts">
        <a class="float-btn float-whatsapp" href="https://wa.me/${waNum}" target="_blank" rel="noopener" title="WhatsApp" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.25.7-1.44 1.34-1.99 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.99-.32-1.7-.63-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.2 1.04-2.5.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.3.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.13.08.74-.17 1.44z"/></svg>
        </a>
        <a class="float-btn float-phone" href="tel:${telNum}" title="Call Us" aria-label="Call Us">
          <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
        </a>
      </div>
    `;
  },

  startCountdown(targetIso) {
    if (this._cdTimer) clearInterval(this._cdTimer);
    const target = new Date(targetIso || "2026-12-25T00:00:00").getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const elD = document.getElementById("cd-d");
      if (!elD) return;
      elD.textContent = String(d).padStart(2, "0");
      document.getElementById("cd-h").textContent = String(h).padStart(2, "0");
      document.getElementById("cd-m").textContent = String(m).padStart(2, "0");
      document.getElementById("cd-s").textContent = String(s).padStart(2, "0");
    };
    update();
    this._cdTimer = setInterval(update, 1000);
  }
};

window.JOES_TOAST = function (msg) {
  let t = document.getElementById("joes-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "joes-toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
};
