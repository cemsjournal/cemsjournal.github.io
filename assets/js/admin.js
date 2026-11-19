// =========================================================
// JoES Admin Panel Controller
// =========================================================

(function () {
  const STORE = window.JOES_STORE;
  const I18N = window.JOES_I18N;
  const root = document.getElementById("admin-root");

  let state = {
    tab: "overview",
    db: null,
    session: null,
    editingIssueId: null,
    editingBoardId: null,
    editingVideoId: null
  };

  function isAr() {
    return I18N.getLang() === "ar";
  }

  function L(en, ar) {
    return isAr() ? ar : en;
  }

  function toast(msg) {
    let t = document.getElementById("joes-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "joes-toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3200);
  }

  async function init() {
    state.session = await STORE.getSession();
    if (!state.session) {
      renderLogin();
      return;
    }
    state.db = await STORE.getAll();
    renderShell();
  }

  function renderLogin() {
    const demoHint = !STORE.isLive
      ? `<div class="mode-banner mode-demo" style="margin-bottom:16px;">
           <span><strong>${L("Demo Mode:", "الوضع التجريبي:")}</strong> admin@joes.edu / admin123</span>
         </div>`
      : "";

    root.innerHTML = `
      <div class="login-wrap">
        <div class="login-card">
          <div style="text-align:center; margin-bottom:20px;">
            <img src="../assets/img/logo.svg" alt="JoES" style="width:56px;height:56px;margin:0 auto 10px;"/>
            <h2 style="margin-bottom:4px;">${L("JoES Admin Panel", "لوحة إدارة مجلة JoES")}</h2>
            <p style="color:var(--muted); font-size:0.88rem; margin:0;">${L("Sign in to manage issues, pages, and settings.", "سجّل الدخول لإدارة الأعداد والصفحات والإعدادات.")}</p>
          </div>
          ${demoHint}
          <form id="login-form">
            <div class="form-group">
              <label>${L("Email", "البريد الإلكتروني")}</label>
              <input class="input" type="email" name="email" required value="${STORE.isLive ? '' : 'admin@joes.edu'}"/>
            </div>
            <div class="form-group">
              <label>${L("Password", "كلمة المرور")}</label>
              <input class="input" type="password" name="password" required value="${STORE.isLive ? '' : 'admin123'}"/>
            </div>
            <div id="login-err" style="color:var(--danger); font-size:0.85rem; margin-bottom:10px;"></div>
            <button type="submit" class="btn btn-primary" style="width:100%;">${L("Sign In", "دخول")}</button>
          </form>
          <div style="text-align:center; margin-top:16px; display:flex; justify-content:space-between; font-size:0.85rem;">
            <a href="../index.html" style="color:var(--navy-700); font-weight:600;">← ${L("Back to Site", "العودة للموقع")}</a>
            <button type="button" id="login-lang-btn" style="background:none;border:none;color:var(--navy-700);font-weight:700;cursor:pointer;">${I18N.t("lang_btn")}</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("login-lang-btn").addEventListener("click", () => {
      I18N.setLang(isAr() ? "en" : "ar");
      renderLogin();
    });

    document.getElementById("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const res = await STORE.signIn(e.target.email.value.trim(), e.target.password.value);
      if (!res.ok) {
        document.getElementById("login-err").textContent = res.error;
        return;
      }
      await init();
    });
  }

  function renderShell() {
    const navItems = [
      { id: "overview", icon: "📊", en: "Overview", ar: "نظرة عامة" },
      { id: "issues", icon: "📚", en: "Issues & PDFs", ar: "الأعداد والـ PDF" },
      { id: "volumes", icon: "🗂️", en: "Volumes", ar: "المجلدات" },
      { id: "pages", icon: "📝", en: "Pages & Articles", ar: "الصفحات والمقالات" },
      { id: "board", icon: "👥", en: "Editorial & Reviewers", ar: "التحرير والمحكّمون" },
      { id: "videos", icon: "🎬", en: "Videos & Lectures", ar: "الفيديوهات والمحاضرات" },
      { id: "links", icon: "🔗", en: "Important Links", ar: "روابط مهمة" },
      { id: "comments", icon: "💬", en: "Comments", ar: "التعليقات" },
      { id: "settings", icon: "⚙️", en: "Site Settings", ar: "إعدادات الموقع" }
    ];

    const modeBanner = STORE.isLive
      ? `<div class="mode-banner mode-live"><span>🟢 ${L("Connected to Supabase (Live Cloud Mode)", "متصل بـ Supabase (الوضع السحابي المباشر)")}</span></div>`
      : `<div class="mode-banner mode-demo">
           <span>🟡 ${L("Local Demo Mode — Changes are saved in this browser. Configure assets/js/config.js for Supabase.", "الوضع التجريبي المحلي — التعديلات تُحفظ في متصفحك. اربط Supabase في config.js للنشر الفعلي.")}</span>
           <button type="button" class="btn btn-outline-dark btn-sm" id="reset-demo-btn">${L("Reset Demo Data", "استعادة البيانات الافتراضية")}</button>
         </div>`;

    root.innerHTML = `
      <div class="admin-shell">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <img src="../assets/img/logo.svg" alt="JoES"/>
            <div>
              <strong style="color:#fff; display:block;">JoES Admin</strong>
              <span style="font-size:0.75rem; color:#94A3B8;">${state.session.user.email}</span>
            </div>
          </div>

          ${navItems.map((n) => `
            <button type="button" class="admin-nav-btn ${state.tab === n.id ? 'active' : ''}" data-tab="${n.id}">
              <span>${n.icon}</span>
              <span>${L(n.en, n.ar)}</span>
            </button>
          `).join("")}

          <div style="margin-top:auto; padding-top:16px; border-top:1px solid rgba(255,255,255,0.1); display:grid; gap:8px;">
            <a href="print.html" target="_blank" class="admin-nav-btn" style="background:rgba(212,168,56,0.16); color:#EBC86A;">
              <span>🖨️</span><span>${L("Write Issue & Generate PDF", "كتابة عدد وتوليد PDF")}</span>
            </a>
            <a href="../index.html" target="_blank" class="admin-nav-btn">
              <span>🌐</span><span>${L("View Public Site", "معاينة الموقع")}</span>
            </a>
            <button type="button" class="admin-nav-btn" id="admin-logout-btn" style="color:#FCA5A5;">
              <span>🚪</span><span>${L("Sign Out", "تسجيل الخروج")}</span>
            </button>
          </div>
        </aside>

        <main class="admin-main">
          <div class="admin-topbar">
            <h1 style="margin:0; font-size:1.5rem;">${L(navItems.find(x => x.id === state.tab).en, navItems.find(x => x.id === state.tab).ar)}</h1>
            <div style="display:flex; gap:10px; align-items:center;">
              <button type="button" class="lang-toggle" id="admin-lang-btn">${I18N.t("lang_btn")}</button>
            </div>
          </div>
          ${modeBanner}
          <div id="admin-tab-body"></div>
        </main>
      </div>
    `;

    document.querySelectorAll(".admin-nav-btn[data-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        state.tab = b.dataset.tab;
        renderShell();
      });
    });

    document.getElementById("admin-lang-btn").addEventListener("click", () => {
      I18N.setLang(isAr() ? "en" : "ar");
      renderShell();
    });

    document.getElementById("admin-logout-btn").addEventListener("click", async () => {
      await STORE.signOut();
      await init();
    });

    const resetBtn = document.getElementById("reset-demo-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", async () => {
        if (confirm(L("Reset all local demo data to defaults?", "هل تريد استعادة جميع البيانات الافتراضية؟"))) {
          STORE.resetDemo();
          state.db = await STORE.getAll();
          toast(L("Demo data reset.", "تمت استعادة البيانات الافتراضية."));
          renderShell();
        }
      });
    }

    const body = document.getElementById("admin-tab-body");
    if (state.tab === "overview") renderOverview(body);
    else if (state.tab === "issues") renderIssues(body);
    else if (state.tab === "volumes") renderVolumes(body);
    else if (state.tab === "pages") renderPages(body);
    else if (state.tab === "board") renderBoard(body);
    else if (state.tab === "videos") renderVideos(body);
    else if (state.tab === "links") renderLinks(body);
    else if (state.tab === "comments") renderComments(body);
    else if (state.tab === "settings") renderSettings(body);
  }

  function renderOverview(body) {
    const db = state.db;
    const pending = (db.comments || []).filter((c) => !c.approved).length;
    body.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-num">${db.volumes.length}</div><div class="stat-label">${L("Volumes", "المجلدات")}</div></div>
        <div class="stat-card"><div class="stat-num">${db.issues.length}</div><div class="stat-label">${L("Published Issues", "الأعداد المنشورة")}</div></div>
        <div class="stat-card"><div class="stat-num">${db.board.length}</div><div class="stat-label">${L("Board & Reviewers", "التحرير والمحكمون")}</div></div>
        <div class="stat-card"><div class="stat-num">${db.videos.length}</div><div class="stat-label">${L("Videos", "الفيديوهات")}</div></div>
        <div class="stat-card"><div class="stat-num">${pending}</div><div class="stat-label">${L("Pending Comments", "تعليقات بانتظار الموافقة")}</div></div>
      </div>

      <div class="admin-card">
        <h3>${L("Quick Actions", "إجراءات سريعة")}</h3>
        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:12px;">
          <button type="button" class="btn btn-primary" onclick="document.querySelector('[data-tab=issues]').click()">+ ${L("Add / Upload Issue PDF", "إضافة / رفع عدد PDF")}</button>
          <a href="print.html" target="_blank" class="btn btn-gold">🖨️ ${L("Compose Issue & Generate Formatted PDF", "كتابة عدد وتوليد PDF منسّق")}</a>
          <button type="button" class="btn btn-outline-dark" onclick="document.querySelector('[data-tab=settings]').click()">⚙️ ${L("Edit Banner & Contact Numbers", "تعديل البانر وأرقام التواصل")}</button>
        </div>
      </div>
    `;
  }

  function renderIssues(body) {
    const db = state.db;
    const editing = db.issues.find((i) => i.id === state.editingIssueId) || null;
    const volOpts = db.volumes.map((v) =>
      `<option value="${v.id}" ${editing && editing.volume_id === v.id ? 'selected' : ''}>${I18N.pick(v, "title")}</option>`
    ).join("");

    body.innerHTML = `
      <div class="admin-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <h3 style="margin:0;">${editing ? L("Edit Issue", "تعديل العدد") : L("Add New Issue", "إضافة عدد جديد")}</h3>
          <a href="print.html" target="_blank" class="btn btn-gold btn-sm">🖨️ ${L("Write Issue & Generate PDF", "كتابة العدد وتوليد PDF منسّق")}</a>
        </div>
        <form id="issue-form">
          <div class="admin-grid-2">
            <div class="form-group">
              <label>${L("Volume", "المجلد")}</label>
              <select class="select" name="volume_id" required>${volOpts}</select>
            </div>
            <div class="form-group">
              <label>${L("Edition Number", "رقم العدد")}</label>
              <input class="input" type="number" name="edition" value="${editing ? editing.edition : 1}" min="1" required/>
            </div>
            <div class="form-group">
              <label>${L("Issue Title (English)", "اسم العدد (إنجليزي)")}</label>
              <input class="input" name="title_en" required value="${editing ? editing.title_en : ''}" placeholder="e.g. Volume 1 · Edition 2 — Dec 2026"/>
            </div>
            <div class="form-group">
              <label>${L("Issue Title (Arabic)", "اسم العدد (عربي)")}</label>
              <input class="input" name="title_ar" required value="${editing ? editing.title_ar : ''}" placeholder="مثال: المجلد الأول · العدد الثاني — ديسمبر 2026"/>
            </div>
            <div class="form-group">
              <label>${L("Publication Date Label", "تاريخ النشر")}</label>
              <input class="input" name="pub_date" value="${editing ? editing.pub_date : ''}" placeholder="e.g. December 2026"/>
            </div>
            <div class="form-group">
              <label>${L("Cover Image (JPG/PNG/SVG)", "صورة الغلاف")}</label>
              <input class="input" type="file" name="cover_file" accept="image/*"/>
            </div>
            <div class="form-group">
              <label>${L("English PDF File", "ملف PDF (إنجليزي)")}</label>
              <input class="input" type="file" name="pdf_en_file" accept="application/pdf"/>
            </div>
            <div class="form-group">
              <label>${L("Arabic PDF File", "ملف PDF (عربي)")}</label>
              <input class="input" type="file" name="pdf_ar_file" accept="application/pdf"/>
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button type="submit" class="btn btn-primary">${editing ? L("Update Issue", "تحديث العدد") : L("Save Issue", "حفظ العدد")}</button>
            ${editing ? `<button type="button" class="btn btn-outline-dark" id="cancel-issue-edit">${L("Cancel", "إلغاء")}</button>` : ""}
          </div>
        </form>
      </div>

      <div class="admin-card table-wrap">
        <h3>${L("All Issues", "جميع الأعداد")}</h3>
        <table class="admin-table">
          <thead><tr><th>${L("Title", "الاسم")}</th><th>${L("Volume", "المجلد")}</th><th>${L("PDFs", "ملفات PDF")}</th><th>${L("Actions", "إجراءات")}</th></tr></thead>
          <tbody>
            ${db.issues.map((iss) => {
              const vol = db.volumes.find((v) => v.id === iss.volume_id);
              return `
                <tr>
                  <td><strong>${I18N.pick(iss, "title")}</strong><br/><small style="color:var(--muted);">${iss.pub_date || ""}</small></td>
                  <td>${vol ? I18N.pick(vol, "title") : iss.volume_id}</td>
                  <td>${iss.pdf_en_url ? "✅ EN" : "— EN"} · ${iss.pdf_ar_url ? "✅ AR" : "— AR"}</td>
                  <td>
                    <button type="button" class="btn btn-outline-dark btn-sm edit-iss" data-id="${iss.id}">${L("Edit", "تعديل")}</button>
                    <button type="button" class="btn btn-outline-dark btn-sm del-iss" data-id="${iss.id}" style="color:var(--danger);">${L("Delete", "حذف")}</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;

    if (editing) {
      document.getElementById("cancel-issue-edit").addEventListener("click", () => {
        state.editingIssueId = null;
        renderIssues(body);
      });
    }

    document.getElementById("issue-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      const cfg = window.JOES_CONFIG;
      const payload = {
        id: editing ? editing.id : undefined,
        volume_id: f.volume_id.value,
        edition: Number(f.edition.value) || 1,
        title_en: f.title_en.value.trim(),
        title_ar: f.title_ar.value.trim(),
        pub_date: f.pub_date.value.trim(),
        cover_url: editing ? editing.cover_url : "../assets/img/cover-vol1.svg",
        pdf_en_url: editing ? editing.pdf_en_url : "",
        pdf_ar_url: editing ? editing.pdf_ar_url : ""
      };
      if (!editing) payload.cover_url = "assets/img/cover-vol1.svg";

      if (f.cover_file.files[0]) payload.cover_url = await STORE.uploadFile(cfg.STORAGE_BUCKET_COVERS, f.cover_file.files[0]);
      if (f.pdf_en_file.files[0]) payload.pdf_en_url = await STORE.uploadFile(cfg.STORAGE_BUCKET_PDFS, f.pdf_en_file.files[0]);
      if (f.pdf_ar_file.files[0]) payload.pdf_ar_url = await STORE.uploadFile(cfg.STORAGE_BUCKET_PDFS, f.pdf_ar_file.files[0]);

      await STORE.saveIssue(payload);
      state.editingIssueId = null;
      state.db = await STORE.getAll();
      toast(L("Issue saved.", "تم حفظ العدد."));
      renderIssues(body);
    });

    body.querySelectorAll(".edit-iss").forEach((b) => {
      b.addEventListener("click", () => {
        state.editingIssueId = b.dataset.id;
        renderIssues(body);
      });
    });

    body.querySelectorAll(".del-iss").forEach((b) => {
      b.addEventListener("click", async () => {
        if (!confirm(L("Delete this issue?", "حذف هذا العدد؟"))) return;
        await STORE.deleteIssue(b.dataset.id);
        state.db = await STORE.getAll();
        toast(L("Issue deleted.", "تم حذف العدد."));
        renderIssues(body);
      });
    });
  }

  function renderVolumes(body) {
    const db = state.db;
    body.innerHTML = `
      <div class="admin-card">
        <h3>${L("Add Volume", "إضافة مجلد جديد")}</h3>
        <form id="vol-form" class="admin-grid-2">
          <div class="form-group"><label>${L("Volume Number", "رقم المجلد")}</label><input class="input" type="number" name="number" value="${db.volumes.length + 1}" required/></div>
          <div class="form-group"><label>${L("Sort Order", "الترتيب")}</label><input class="input" type="number" name="sort_order" value="${db.volumes.length + 1}" required/></div>
          <div class="form-group"><label>${L("Title (English)", "الاسم (إنجليزي)")}</label><input class="input" name="title_en" placeholder="Volume 5" required/></div>
          <div class="form-group"><label>${L("Title (Arabic)", "الاسم (عربي)")}</label><input class="input" name="title_ar" placeholder="المجلد الخامس (Volume 5)" required/></div>
          <div><button type="submit" class="btn btn-primary">${L("Add Volume", "إضافة المجلد")}</button></div>
        </form>
      </div>
      <div class="admin-card table-wrap">
        <table class="admin-table">
          <thead><tr><th>#</th><th>EN</th><th>AR</th><th>${L("Actions", "إجراءات")}</th></tr></thead>
          <tbody>
            ${db.volumes.map((v) => `
              <tr>
                <td>${v.sort_order}</td>
                <td>${v.title_en}</td>
                <td>${v.title_ar}</td>
                <td><button type="button" class="btn btn-outline-dark btn-sm del-vol" data-id="${v.id}" style="color:var(--danger);">${L("Delete", "حذف")}</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    document.getElementById("vol-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      await STORE.saveVolume({
        number: Number(f.number.value),
        sort_order: Number(f.sort_order.value),
        title_en: f.title_en.value.trim(),
        title_ar: f.title_ar.value.trim()
      });
      state.db = await STORE.getAll();
      toast(L("Volume added.", "تمت إضافة المجلد."));
      renderVolumes(body);
    });
    body.querySelectorAll(".del-vol").forEach((b) => {
      b.addEventListener("click", async () => {
        if (!confirm(L("Delete this volume?", "حذف هذا المجلد؟"))) return;
        await STORE.deleteVolume(b.dataset.id);
        state.db = await STORE.getAll();
        renderVolumes(body);
      });
    });
  }

  function renderPages(body) {
    const db = state.db;
    const slugs = [
      { slug: "regulations", label: L("Publication Regulations & Rules (Shared)", "لوائح وقوانين النشر (مشترك)") },
      { slug: "applied-math", label: L("Applied Engineering & Mathematics Article", "مقال الهندسة التطبيقية والرياضيات") },
      { slug: "info", label: L("Information of Interest", "معلومات قد تهمك") }
    ];
    let currentSlug = slugs[0].slug;

    function drawEditor() {
      const p = db.pages[currentSlug] || {};
      body.innerHTML = `
        <div class="admin-card">
          <div class="form-group">
            <label>${L("Select Page to Edit", "اختر الصفحة للتعديل")}</label>
            <select class="select" id="page-slug-sel">
              ${slugs.map((s) => `<option value="${s.slug}" ${s.slug === currentSlug ? 'selected' : ''}>${s.label}</option>`).join("")}
            </select>
          </div>
          <form id="page-edit-form">
            <div class="admin-grid-2">
              <div class="form-group"><label>${L("Title (EN)", "العنوان (إنجليزي)")}</label><input class="input" name="title_en" value="${(p.title_en || '').replace(/"/g, '&quot;')}"/></div>
              <div class="form-group"><label>${L("Title (AR)", "العنوان (عربي)")}</label><input class="input" name="title_ar" value="${(p.title_ar || '').replace(/"/g, '&quot;')}"/></div>
              <div class="form-group"><label>${L("Subtitle (EN)", "الوصف (إنجليزي)")}</label><input class="input" name="subtitle_en" value="${(p.subtitle_en || '').replace(/"/g, '&quot;')}"/></div>
              <div class="form-group"><label>${L("Subtitle (AR)", "الوصف (عربي)")}</label><input class="input" name="subtitle_ar" value="${(p.subtitle_ar || '').replace(/"/g, '&quot;')}"/></div>
            </div>
            <div class="form-group">
              <label>${L("Content (English HTML)", "المحتوى (إنجليزي)")}</label>
              <div class="rich-editor" id="ed-en" contenteditable="true" dir="ltr">${p.body_en || ""}</div>
            </div>
            <div class="form-group">
              <label>${L("Content (Arabic HTML)", "المحتوى (عربي)")}</label>
              <div class="rich-editor" id="ed-ar" contenteditable="true" dir="rtl">${p.body_ar || ""}</div>
            </div>
            <button type="submit" class="btn btn-primary">${L("Save Page", "حفظ الصفحة")}</button>
          </form>
        </div>
      `;

      document.getElementById("page-slug-sel").addEventListener("change", (e) => {
        currentSlug = e.target.value;
        drawEditor();
      });

      document.getElementById("page-edit-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const f = e.target;
        await STORE.savePage(currentSlug, {
          title_en: f.title_en.value,
          title_ar: f.title_ar.value,
          subtitle_en: f.subtitle_en.value,
          subtitle_ar: f.subtitle_ar.value,
          body_en: document.getElementById("ed-en").innerHTML,
          body_ar: document.getElementById("ed-ar").innerHTML
        });
        state.db = await STORE.getAll();
        toast(L("Page updated.", "تم تحديث الصفحة."));
      });
    }
    drawEditor();
  }

  function renderBoard(body) {
    const db = state.db;
    const editing = db.board.find((m) => m.id === state.editingBoardId) || null;
    body.innerHTML = `
      <div class="admin-card">
        <h3>${editing ? L("Edit Member", "تعديل عضو") : L("Add Editorial / Reviewer Member", "إضافة عضو للتحرير / المحكّمين")}</h3>
        <form id="board-form" class="admin-grid-2">
          <div class="form-group">
            <label>${L("Group", "المجموعة")}</label>
            <select class="select" name="group">
              <option value="leadership" ${editing && editing.group === 'leadership' ? 'selected' : ''}>${L("Leadership", "الإدارة")}</option>
              <option value="editors" ${editing && editing.group === 'editors' ? 'selected' : ''}>${L("Editors", "هيئة التحرير")}</option>
              <option value="reviewers" ${editing && editing.group === 'reviewers' ? 'selected' : ''}>${L("Reviewers", "المحكّمون")}</option>
            </select>
          </div>
          <div class="form-group"><label>${L("Order", "الترتيب")}</label><input class="input" type="number" name="sort_order" value="${editing ? editing.sort_order : db.board.length + 1}"/></div>
          <div class="form-group"><label>${L("Role (EN)", "المنصب (إنجليزي)")}</label><input class="input" name="role_en" required value="${editing ? editing.role_en : ''}"/></div>
          <div class="form-group"><label>${L("Role (AR)", "المنصب (عربي)")}</label><input class="input" name="role_ar" required value="${editing ? editing.role_ar : ''}"/></div>
          <div class="form-group"><label>${L("Name (EN)", "الاسم (إنجليزي)")}</label><input class="input" name="name_en" required value="${editing ? editing.name_en : ''}"/></div>
          <div class="form-group"><label>${L("Name (AR)", "الاسم (عربي)")}</label><input class="input" name="name_ar" required value="${editing ? editing.name_ar : ''}"/></div>
          <div><button type="submit" class="btn btn-primary">${L("Save Member", "حفظ العضو")}</button></div>
        </form>
      </div>
      <div class="admin-card table-wrap">
        <table class="admin-table">
          <thead><tr><th>${L("Group", "المجموعة")}</th><th>${L("Role", "المنصب")}</th><th>${L("Name", "الاسم")}</th><th>${L("Actions", "إجراءات")}</th></tr></thead>
          <tbody>
            ${db.board.map((m) => `
              <tr>
                <td>${m.group}</td>
                <td>${I18N.pick(m, "role")}</td>
                <td><strong>${I18N.pick(m, "name")}</strong></td>
                <td>
                  <button type="button" class="btn btn-outline-dark btn-sm edit-b" data-id="${m.id}">${L("Edit", "تعديل")}</button>
                  <button type="button" class="btn btn-outline-dark btn-sm del-b" data-id="${m.id}" style="color:var(--danger);">${L("Delete", "حذف")}</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById("board-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      await STORE.saveBoardMember({
        id: editing ? editing.id : undefined,
        group: f.group.value,
        sort_order: Number(f.sort_order.value) || 99,
        role_en: f.role_en.value.trim(),
        role_ar: f.role_ar.value.trim(),
        name_en: f.name_en.value.trim(),
        name_ar: f.name_ar.value.trim()
      });
      state.editingBoardId = null;
      state.db = await STORE.getAll();
      toast(L("Member saved.", "تم حفظ العضو."));
      renderBoard(body);
    });
    body.querySelectorAll(".edit-b").forEach((b) => b.addEventListener("click", () => { state.editingBoardId = b.dataset.id; renderBoard(body); }));
    body.querySelectorAll(".del-b").forEach((b) => b.addEventListener("click", async () => {
      if (!confirm(L("Delete member?", "حذف العضو؟"))) return;
      await STORE.deleteBoardMember(b.dataset.id);
      state.db = await STORE.getAll();
      renderBoard(body);
    }));
  }

  function renderVideos(body) {
    const db = state.db;
    const editing = db.videos.find((v) => v.id === state.editingVideoId) || null;
    body.innerHTML = `
      <div class="admin-card">
        <h3>${editing ? L("Edit Video", "تعديل فيديو") : L("Add YouTube / Google Drive Video", "إضافة فيديو (يوتيوب أو جوجل درايف)")}</h3>
        <form id="video-form" class="admin-grid-2">
          <div class="form-group" style="grid-column:1/-1;">
            <label>${L("Video URL (YouTube or Google Drive)", "رابط الفيديو (يوتيوب أو جوجل درايف)")}</label>
            <input class="input" name="url" required value="${editing ? editing.url : ''}" placeholder="https://www.youtube.com/watch?v=... or https://drive.google.com/file/d/.../view"/>
          </div>
          <div class="form-group"><label>${L("Title (EN)", "العنوان (إنجليزي)")}</label><input class="input" name="title_en" required value="${editing ? editing.title_en : ''}"/></div>
          <div class="form-group"><label>${L("Title (AR)", "العنوان (عربي)")}</label><input class="input" name="title_ar" required value="${editing ? editing.title_ar : ''}"/></div>
          <div class="form-group"><label>${L("Description (EN)", "الوصف (إنجليزي)")}</label><input class="input" name="description_en" value="${editing ? editing.description_en : ''}"/></div>
          <div class="form-group"><label>${L("Description (AR)", "الوصف (عربي)")}</label><input class="input" name="description_ar" value="${editing ? editing.description_ar : ''}"/></div>
          <div class="form-group">
            <label>${L("Display Section", "مكان الظهور")}</label>
            <select class="select" name="category">
              <option value="both" ${editing && editing.category === 'both' ? 'selected' : ''}>${L("Both (Videos You Might Like + Important Lectures)", "القسمين معاً (فيديوهات قد تهمك + محاضرات مهمة)")}</option>
              <option value="featured" ${editing && editing.category === 'featured' ? 'selected' : ''}>${L("Videos You Might Like only", "فيديوهات قد تهمك فقط")}</option>
              <option value="lectures" ${editing && editing.category === 'lectures' ? 'selected' : ''}>${L("Important Lectures only", "محاضرات مهمة فقط")}</option>
            </select>
          </div>
          <div style="display:flex; align-items:end; gap:10px; padding-bottom:14px;">
            <button type="submit" class="btn btn-primary">${L("Save Video", "حفظ الفيديو")}</button>
          </div>
        </form>
      </div>
      <div class="admin-card table-wrap">
        <table class="admin-table">
          <thead><tr><th>${L("Title", "العنوان")}</th><th>${L("Section", "القسم")}</th><th>${L("Actions", "إجراءات")}</th></tr></thead>
          <tbody>
            ${db.videos.map((v) => `
              <tr>
                <td><strong>${I18N.pick(v, "title")}</strong><br/><small style="color:var(--muted);">${v.url}</small></td>
                <td>${v.category}</td>
                <td>
                  <button type="button" class="btn btn-outline-dark btn-sm edit-v" data-id="${v.id}">${L("Edit", "تعديل")}</button>
                  <button type="button" class="btn btn-outline-dark btn-sm del-v" data-id="${v.id}" style="color:var(--danger);">${L("Delete", "حذف")}</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    document.getElementById("video-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      await STORE.saveVideo({
        id: editing ? editing.id : undefined,
        url: f.url.value.trim(),
        title_en: f.title_en.value.trim(),
        title_ar: f.title_ar.value.trim(),
        description_en: f.description_en.value.trim(),
        description_ar: f.description_ar.value.trim(),
        category: f.category.value
      });
      state.editingVideoId = null;
      state.db = await STORE.getAll();
      toast(L("Video saved.", "تم حفظ الفيديو."));
      renderVideos(body);
    });
    body.querySelectorAll(".edit-v").forEach((b) => b.addEventListener("click", () => { state.editingVideoId = b.dataset.id; renderVideos(body); }));
    body.querySelectorAll(".del-v").forEach((b) => b.addEventListener("click", async () => {
      if (!confirm(L("Delete video?", "حذف الفيديو؟"))) return;
      await STORE.deleteVideo(b.dataset.id);
      state.db = await STORE.getAll();
      renderVideos(body);
    }));
  }

  function renderLinks(body) {
    const db = state.db;
    body.innerHTML = `
      <div class="admin-card">
        <h3>${L("Add Important Link", "إضافة رابط مهم")}</h3>
        <form id="link-form" class="admin-grid-2">
          <div class="form-group"><label>URL</label><input class="input" name="url" type="url" required placeholder="https://..."/></div>
          <div class="form-group"><label>${L("Title (EN)", "العنوان (إنجليزي)")}</label><input class="input" name="title_en" required/></div>
          <div class="form-group"><label>${L("Title (AR)", "العنوان (عربي)")}</label><input class="input" name="title_ar" required/></div>
          <div class="form-group"><label>${L("Description (EN)", "الوصف (إنجليزي)")}</label><input class="input" name="description_en"/></div>
          <div class="form-group"><label>${L("Description (AR)", "الوصف (عربي)")}</label><input class="input" name="description_ar"/></div>
          <div style="display:flex; align-items:end; padding-bottom:14px;"><button type="submit" class="btn btn-primary">${L("Add Link", "إضافة الرابط")}</button></div>
        </form>
      </div>
      <div class="admin-card table-wrap">
        <table class="admin-table">
          <thead><tr><th>${L("Title", "العنوان")}</th><th>URL</th><th>${L("Actions", "إجراءات")}</th></tr></thead>
          <tbody>
            ${db.links.length ? db.links.map((l) => `
              <tr>
                <td>${I18N.pick(l, "title")}</td>
                <td><a href="${l.url}" target="_blank">${l.url}</a></td>
                <td><button type="button" class="btn btn-outline-dark btn-sm del-l" data-id="${l.id}" style="color:var(--danger);">${L("Delete", "حذف")}</button></td>
              </tr>
            `).join("") : `<tr><td colspan="3" style="text-align:center;color:var(--muted);">${L("Empty", "فارغ")}</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
    document.getElementById("link-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      await STORE.saveLink({
        url: f.url.value.trim(),
        title_en: f.title_en.value.trim(),
        title_ar: f.title_ar.value.trim(),
        description_en: f.description_en.value.trim(),
        description_ar: f.description_ar.value.trim(),
        sort_order: db.links.length + 1
      });
      state.db = await STORE.getAll();
      toast(L("Link added.", "تمت إضافة الرابط."));
      renderLinks(body);
    });
    body.querySelectorAll(".del-l").forEach((b) => b.addEventListener("click", async () => {
      await STORE.deleteLink(b.dataset.id);
      state.db = await STORE.getAll();
      renderLinks(body);
    }));
  }

  function renderComments(body) {
    const db = state.db;
    body.innerHTML = `
      <div class="admin-card table-wrap">
        <table class="admin-table">
          <thead><tr><th>${L("Author", "الكاتب")}</th><th>${L("Comment", "التعليق")}</th><th>${L("Status", "الحالة")}</th><th>${L("Actions", "إجراءات")}</th></tr></thead>
          <tbody>
            ${db.comments.length ? db.comments.map((c) => `
              <tr>
                <td><strong>${c.author_name}</strong><br/><small>${new Date(c.created_at).toLocaleString()}</small></td>
                <td>${c.body}</td>
                <td>${c.approved ? "✅ Approved" : "⏳ Pending"}</td>
                <td>
                  <button type="button" class="btn btn-outline-dark btn-sm tog-c" data-id="${c.id}" data-app="${c.approved ? '0' : '1'}">${c.approved ? L("Hide", "إخفاء") : L("Approve", "موافقة")}</button>
                  <button type="button" class="btn btn-outline-dark btn-sm del-c" data-id="${c.id}" style="color:var(--danger);">${L("Delete", "حذف")}</button>
                </td>
              </tr>
            `).join("") : `<tr><td colspan="4" style="text-align:center;color:var(--muted);">${L("No comments yet.", "لا توجد تعليقات.")}</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
    body.querySelectorAll(".tog-c").forEach((b) => b.addEventListener("click", async () => {
      await STORE.setCommentApproval(b.dataset.id, b.dataset.app === "1");
      state.db = await STORE.getAll();
      renderComments(body);
    }));
    body.querySelectorAll(".del-c").forEach((b) => b.addEventListener("click", async () => {
      await STORE.deleteComment(b.dataset.id);
      state.db = await STORE.getAll();
      renderComments(body);
    }));
  }

  function renderSettings(body) {
    const s = state.db.settings;
    body.innerHTML = `
      <div class="admin-card">
        <form id="settings-form" class="admin-grid-2">
          <div class="form-group"><label>${L("Journal Name (EN)", "اسم المجلة (إنجليزي)")}</label><input class="input" name="name_en" value="${s.name_en || ''}"/></div>
          <div class="form-group"><label>${L("Journal Name (AR)", "اسم المجلة (عربي)")}</label><input class="input" name="name_ar" value="${s.name_ar || ''}"/></div>
          <div class="form-group"><label>${L("Abbreviation", "الاختصار")}</label><input class="input" name="abbr" value="${s.abbr || 'JoES'}"/></div>
          <div class="form-group"><label>${L("Banner Target Date", "تاريخ العدّ التنازلي للبانر")}</label><input class="input" name="banner_date" value="${s.banner_date || '2026-12-25T00:00:00'}"/></div>
          <div class="form-group"><label>${L("Banner Text (EN)", "نص البانر (إنجليزي)")}</label><input class="input" name="banner_text_en" value="${s.banner_text_en || ''}"/></div>
          <div class="form-group"><label>${L("Banner Text (AR)", "نص البانر (عربي)")}</label><input class="input" name="banner_text_ar" value="${s.banner_text_ar || ''}"/></div>
          <div class="form-group"><label>${L("WhatsApp Number (with country code)", "رقم الواتساب (مع رمز الدولة)")}</label><input class="input" name="whatsapp" value="${s.whatsapp || ''}"/></div>
          <div class="form-group"><label>${L("Phone Number", "رقم الهاتف")}</label><input class="input" name="phone" value="${s.phone || ''}"/></div>
          <div class="form-group"><label>${L("Email", "البريد الإلكتروني")}</label><input class="input" name="email" value="${s.email || ''}"/></div>
          <div class="form-group"><label>${L("Website", "الموقع الإلكتروني")}</label><input class="input" name="website" value="${s.website || ''}"/></div>
          <div class="form-group"><label><input type="checkbox" name="banner_enabled" ${s.banner_enabled ? 'checked' : ''}/> ${L("Show Top Announcement Banner", "إظهار بانر الإعلان العلوي")}</label></div>
          <div class="form-group"><label><input type="checkbox" name="auto_approve_comments" ${s.auto_approve_comments ? 'checked' : ''}/> ${L("Auto-approve Comments Immediately", "نشر التعليقات تلقائياً دون مراجعة")}</label></div>
          <div><button type="submit" class="btn btn-primary">${L("Save Settings", "حفظ الإعدادات")}</button></div>
        </form>
      </div>
    `;
    document.getElementById("settings-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      await STORE.saveSettings({
        name_en: f.name_en.value.trim(),
        name_ar: f.name_ar.value.trim(),
        abbr: f.abbr.value.trim(),
        banner_date: f.banner_date.value.trim(),
        banner_text_en: f.banner_text_en.value.trim(),
        banner_text_ar: f.banner_text_ar.value.trim(),
        whatsapp: f.whatsapp.value.trim(),
        phone: f.phone.value.trim(),
        email: f.email.value.trim(),
        website: f.website.value.trim(),
        banner_enabled: f.banner_enabled.checked,
        auto_approve_comments: f.auto_approve_comments.checked
      });
      state.db = await STORE.getAll();
      toast(L("Settings saved.", "تم حفظ الإعدادات."));
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
