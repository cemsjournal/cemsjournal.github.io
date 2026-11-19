// =========================================================
// JoES Public Pages Controller
// =========================================================

(function () {
  const I18N = window.JOES_I18N;
  const STORE = window.JOES_STORE;
  const VIDEO = window.JOES_VIDEO;

  let cachedDb = null;

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function renderDownloadButtons(issue) {
    const enBtn = issue.pdf_en_url
      ? `<a class="btn btn-primary btn-sm" href="${issue.pdf_en_url}" download="${(issue.title_en || 'issue-en').replace(/[^a-z0-9]/gi, '_')}.pdf">⬇ ${I18N.t("download_pdf_en")}</a>`
      : `<button type="button" class="btn btn-outline-dark btn-sm disabled" disabled>📄 ${I18N.t("download_pdf_en")} (${I18N.t("pdf_not_uploaded")})</button>`;

    const arBtn = issue.pdf_ar_url
      ? `<a class="btn btn-gold btn-sm" href="${issue.pdf_ar_url}" download="${(issue.title_en || 'issue-ar').replace(/[^a-z0-9]/gi, '_')}_AR.pdf">⬇ ${I18N.t("download_pdf_ar")}</a>`
      : `<button type="button" class="btn btn-outline-dark btn-sm disabled" disabled>📄 ${I18N.t("download_pdf_ar")} (${I18N.t("pdf_not_uploaded")})</button>`;

    return `${enBtn} ${arBtn}`;
  }

  function renderVideoCards(videos, container) {
    if (!videos.length) {
      container.innerHTML = `<div class="empty-state">No videos added yet.</div>`;
      return;
    }
    container.innerHTML = videos.map((v) => {
      const info = VIDEO.parse(v.url);
      const title = I18N.pick(v, "title");
      const desc = I18N.pick(v, "description");
      const thumbHtml = info.thumbUrl
        ? `<img src="${info.thumbUrl}" alt="${title}" loading="lazy"/>`
        : `<div style="width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;color:#E5BE53;font-weight:700;padding:12px 16px;text-align:center;font-size:0.82rem;background:radial-gradient(circle at 50% 40%, rgba(212,168,56,0.18), transparent 70%);">
             <span style="opacity:0.9;">JoES · ${info.badge}</span>
           </div>`;

      return `
        <article class="video-card">
          <div class="video-thumb" data-url="${v.url}" data-title="${title.replace(/"/g, '&quot;')}">
            ${thumbHtml}
            <span class="video-source-badge">${info.badge}</span>
            <button type="button" class="video-play-btn" aria-label="Play">▶</button>
          </div>
          <div class="video-body">
            <span class="video-cat">${v.category === "lectures" ? I18N.t("card_lectures_title") : I18N.t("videos_title")}</span>
            <h3 class="video-title">${title}</h3>
            <p class="video-desc">${desc}</p>
            <div style="margin-top:auto; padding-top:8px;">
              <button type="button" class="btn btn-outline-dark btn-sm video-open-btn" data-url="${v.url}" data-title="${title.replace(/"/g, '&quot;')}">
                ▶ ${info.type === "external" ? I18N.t("open_link") : I18N.t("watch_video")}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    container.querySelectorAll(".video-thumb, .video-open-btn").forEach((el) => {
      el.addEventListener("click", () => {
        VIDEO.openModal(el.dataset.url, el.dataset.title);
      });
    });
  }

  function renderHome(db) {
    const s = db.settings;
    const latest = db.issues[0] || {};
    const coverImg = latest.cover_url || "assets/img/cover-vol1.svg?v=2";

    document.getElementById("page-content").innerHTML = `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <span class="hero-kicker">✦ ${I18N.t("hero_kicker")}</span>
            <h1>${I18N.pick(s, "name")} (${s.abbr || "JoES"})</h1>
            <p class="hero-desc">${I18N.pick(s, "subtitle")}</p>
            <div class="hero-actions">
              <a href="volume.html?v=${latest.volume_id || 'vol-1'}" class="btn btn-gold">${I18N.t("hero_cta_latest")}</a>
              <a href="page.html?slug=regulations" class="btn btn-outline">${I18N.t("hero_cta_guidelines")}</a>
            </div>
          </div>

          <div class="hero-cover-card">
            <img class="hero-cover-img" src="${coverImg}" alt="Journal Cover"/>
            <div class="hero-cover-meta">
              <div class="issue-label">${I18N.t("latest_issue")}</div>
              <div class="issue-name">${I18N.pick(latest, "title") || "Volume 1 · Edition 1"}</div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
                ${renderDownloadButtons(latest)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-kicker">${I18N.t("resources_kicker")}</span>
              <h2 class="section-title">${I18N.t("resources_title")}</h2>
              <p class="section-sub">${I18N.t("resources_sub")}</p>
            </div>
          </div>
          <div class="resource-grid">
            <a href="page.html?slug=info" class="resource-card">
              <div class="resource-icon">💡</div>
              <h3>${I18N.t("card_info_title")}</h3>
              <p>${I18N.t("card_info_desc")}</p>
              <span class="resource-link">${I18N.t("read_more")}</span>
            </a>
            <a href="page.html?slug=applied-math" class="resource-card">
              <div class="resource-icon">📐</div>
              <h3>${I18N.t("card_math_title")}</h3>
              <p>${I18N.t("card_math_desc")}</p>
              <span class="resource-link">${I18N.t("read_more")}</span>
            </a>
            <a href="lectures.html" class="resource-card">
              <div class="resource-icon">🎓</div>
              <h3>${I18N.t("card_lectures_title")}</h3>
              <p>${I18N.t("card_lectures_desc")}</p>
              <span class="resource-link">${I18N.t("read_more")}</span>
            </a>
            <a href="links.html" class="resource-card">
              <div class="resource-icon">🔗</div>
              <h3>${I18N.t("card_links_title")}</h3>
              <p>${I18N.t("card_links_desc")}</p>
              <span class="resource-link">${I18N.t("read_more")}</span>
            </a>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-kicker">${I18N.t("videos_kicker")}</span>
              <h2 class="section-title">${I18N.t("videos_title")}</h2>
              <p class="section-sub">${I18N.t("videos_sub")}</p>
            </div>
          </div>
          <div class="video-grid" id="home-videos-grid"></div>
        </div>
      </section>
    `;

    const featuredVideos = (db.videos || []).filter((v) => v.category === "featured" || v.category === "both");
    renderVideoCards(featuredVideos, document.getElementById("home-videos-grid"));
  }

  function renderCoverPage(db) {
    const latest = db.issues[0] || {};
    const coverImg = latest.cover_url || "assets/img/cover-vol1.svg?v=2";
    document.getElementById("page-content").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${I18N.t("cover_page_title")}</h1>
          <p>${I18N.t("cover_page_sub")}</p>
        </div>
      </section>
      <div class="container">
        <div class="article-card" style="max-width:640px; text-align:center;">
          <img src="${coverImg}" alt="Journal Cover" style="max-width:440px; margin:0 auto 22px; border-radius:12px; box-shadow:var(--shadow-lg);"/>
          <h2 style="margin-bottom:8px;">${I18N.pick(latest, "title") || "Volume 1 · Edition 1"}</h2>
          <p style="color:var(--muted); margin-bottom:20px;">${latest.pub_date || ""}</p>
          <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;">
            ${renderDownloadButtons(latest)}
          </div>
        </div>
      </div>
    `;
  }

  function renderTextPage(db, slug) {
    // regulations and rules share the same content if rules has no separate override
    const resolvedSlug = slug === "rules" && !db.pages.rules ? "regulations" : slug;
    const p = db.pages[resolvedSlug] || db.pages.regulations;
    document.getElementById("page-content").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${I18N.pick(p, "title")}</h1>
          <p>${I18N.pick(p, "subtitle")}</p>
        </div>
      </section>
      <div class="container">
        <article class="article-card prose">
          ${I18N.pick(p, "body")}
        </article>
      </div>
    `;
  }

  function renderBoardPage(db) {
    const view = qs("view");
    const title = view === "reviewers" ? I18N.t("nav_reviewers") : I18N.t("nav_board");
    const groups = [
      { key: "leadership", label: I18N.t("board_leadership") },
      { key: "editors", label: I18N.t("board_editors") },
      { key: "reviewers", label: I18N.t("board_reviewers") }
    ];

    const groupsHtml = groups.map((g) => {
      const members = (db.board || []).filter((m) => m.group === g.key);
      if (!members.length) return "";
      return `
        <div class="board-group">
          <h2 class="board-group-title">${g.label}</h2>
          <div class="board-grid">
            ${members.map((m) => `
              <div class="member-card">
                <div class="member-role">${I18N.pick(m, "role")}</div>
                <h3 class="member-name">${I18N.pick(m, "name")}</h3>
                ${I18N.pick(m, "affiliation") ? `<div class="member-aff">${I18N.pick(m, "affiliation")}</div>` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    document.getElementById("page-content").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${title}</h1>
          <p>${I18N.pick(db.settings, "name")} (${db.settings.abbr || "JoES"})</p>
        </div>
      </section>
      <div class="container" style="padding-top:34px; padding-bottom:34px;">
        ${groupsHtml}
      </div>
    `;
  }

  function renderVolumePage(db) {
    const selectedVolId = qs("v") || (db.volumes[0] && db.volumes[0].id) || "vol-1";
    const tabsHtml = (db.volumes || []).map((v) =>
      `<a href="volume.html?v=${encodeURIComponent(v.id)}" class="volume-tab ${v.id === selectedVolId ? 'active' : ''}">${I18N.pick(v, "title")}</a>`
    ).join("");

    const issues = (db.issues || []).filter((i) => i.volume_id === selectedVolId);
    const issuesHtml = !issues.length
      ? `<div class="empty-state">${I18N.t("no_issues")}</div>`
      : issues.map((iss) => {
          const approvedComments = (db.comments || []).filter((c) => c.issue_id === iss.id && c.approved);
          return `
            <div class="issue-card" data-issue-id="${iss.id}">
              <div class="issue-row">
                <img class="issue-thumb" src="${iss.cover_url || 'assets/img/cover-vol1.svg'}" alt="Cover"/>
                <div>
                  <div class="issue-meta-badges">
                    <span class="badge badge-navy">Edition ${iss.edition || 1}</span>
                    <span class="badge badge-gold">${iss.pub_date || ""}</span>
                  </div>
                  <h2 style="margin-bottom:8px;">${I18N.pick(iss, "title")}</h2>
                  <div class="issue-downloads">
                    ${renderDownloadButtons(iss)}
                  </div>
                </div>
              </div>

              <div class="comments-box">
                <h3 style="font-size:1.05rem; margin-bottom:12px;">💬 ${I18N.t("comments_title")} (${approvedComments.length})</h3>
                <div class="comments-list">
                  ${approvedComments.length
                    ? approvedComments.map((c) => `
                        <div class="comment-item">
                          <div class="comment-header">
                            <span class="comment-author">${escapeHtml(c.author_name)}</span>
                            <span class="comment-date">${new Date(c.created_at).toLocaleDateString()}</span>
                          </div>
                          <div>${escapeHtml(c.body)}</div>
                        </div>
                      `).join("")
                    : `<p style="color:var(--muted); font-size:0.9rem;">${I18N.t("no_comments")}</p>`
                  }
                </div>
                <form class="comment-form" data-issue="${iss.id}">
                  <input class="input" name="author" required placeholder="${I18N.t("comment_name")}"/>
                  <textarea class="textarea" name="body" rows="2" required placeholder="${I18N.t("comment_text")}"></textarea>
                  <div><button type="submit" class="btn btn-primary btn-sm">${I18N.t("comment_submit")}</button></div>
                </form>
              </div>
            </div>
          `;
        }).join("");

    document.getElementById("page-content").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${I18N.t("volumes_title")}</h1>
          <p>${I18N.t("volumes_sub")}</p>
        </div>
      </section>
      <div class="container" style="padding-top:34px; padding-bottom:34px;">
        <div class="volumes-tabs">${tabsHtml}</div>
        ${issuesHtml}
      </div>
    `;

    document.querySelectorAll(".comment-form").forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const issueId = form.dataset.issue;
        const author_name = form.author.value.trim();
        const body = form.body.value.trim();
        if (!author_name || !body) return;
        await STORE.addComment({ issue_id: issueId, author_name, body }, db.settings.auto_approve_comments);
        window.JOES_TOAST(db.settings.auto_approve_comments ? I18N.t("comment_sent_ok") : I18N.t("comment_sent_pending"));
        await boot();
      });
    });
  }

  function renderLecturesPage(db) {
    const lectureVideos = (db.videos || []).filter((v) => v.category === "lectures" || v.category === "both");
    document.getElementById("page-content").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${I18N.t("card_lectures_title")}</h1>
          <p>${I18N.t("card_lectures_desc")}</p>
        </div>
      </section>
      <div class="container" style="padding-top:34px; padding-bottom:34px;">
        <div class="video-grid" id="lectures-grid"></div>
      </div>
    `;
    renderVideoCards(lectureVideos, document.getElementById("lectures-grid"));
  }

  function renderLinksPage(db) {
    const links = db.links || [];
    const html = !links.length
      ? `<div class="empty-state">${I18N.t("links_empty")}</div>`
      : `<div class="resource-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr));">
          ${links.map((l) => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="resource-card">
              <div class="resource-icon">🔗</div>
              <h3>${I18N.pick(l, "title")}</h3>
              <p>${I18N.pick(l, "description")}</p>
              <span class="resource-link">${I18N.t("open_link")} ↗</span>
            </a>
          `).join("")}
        </div>`;

    document.getElementById("page-content").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${I18N.t("card_links_title")}</h1>
          <p>${I18N.t("card_links_desc")}</p>
        </div>
      </section>
      <div class="container" style="padding-top:34px; padding-bottom:34px;">
        ${html}
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function renderCurrentPage(db) {
    const pageType = document.body.dataset.page || "home";
    let activeNav = pageType;
    if (pageType === "page") {
      const slug = qs("slug") || "regulations";
      activeNav = slug === "rules" ? "rules" : (slug === "regulations" ? "regulations" : "");
    } else if (pageType === "board" && qs("view") === "reviewers") {
      activeNav = "reviewers";
    }

    window.JOES_LAYOUT.render(db, activeNav, () => renderCurrentPage(cachedDb));

    if (pageType === "home") renderHome(db);
    else if (pageType === "cover") renderCoverPage(db);
    else if (pageType === "page") renderTextPage(db, qs("slug") || "regulations");
    else if (pageType === "board") renderBoardPage(db);
    else if (pageType === "volumes") renderVolumePage(db);
    else if (pageType === "lectures") renderLecturesPage(db);
    else if (pageType === "links") renderLinksPage(db);
  }

  async function boot() {
    cachedDb = await STORE.getAll();
    renderCurrentPage(cachedDb);
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
