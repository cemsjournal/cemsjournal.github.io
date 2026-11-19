// =========================================================
// JoES A4 PDF Issue Composer
// =========================================================

(function () {
  const STORE = window.JOES_STORE;
  let db = null;

  let articles = [
    {
      title: "Mathematical Modeling of Hemodynamic Flow in Arterial Stents",
      authors: "Dr. Ahmed M. Hassan, Prof. Mohamed Ali Bashir",
      abstract: "This study presents a coupled finite-volume numerical model evaluating wall shear stress distribution across next-generation biomedical stents.",
      body: "Introduction: Cardiovascular stents play a vital role in restoring arterial patency. Understanding fluid-structure interactions is essential for minimizing restenosis.\n\nMaterials and Methods: Three-dimensional Navier-Stokes equations for non-Newtonian blood flow were solved under pulsatile inlet boundary conditions.\n\nResults and Discussion: Results demonstrate a 24% reduction in low-shear recirculation zones with streamlined strut geometry.\n\nConclusions: Mathematical optimization significantly enhances stent biocompatibility."
    }
  ];

  function renderEditorList() {
    const list = document.getElementById("articles-editor-list");
    list.innerHTML = articles.map((a, idx) => `
      <div style="border:1px solid var(--border); border-radius:10px; padding:12px; margin-bottom:12px; background:var(--bg);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong>Article #${idx + 1}</strong>
          ${articles.length > 1 ? `<button type="button" class="btn btn-outline-dark btn-sm rem-art" data-idx="${idx}" style="color:var(--danger);">Remove</button>` : ""}
        </div>
        <div class="form-group"><label>Title</label><input class="input art-in" data-idx="${idx}" data-field="title" value="${escapeAttr(a.title)}"/></div>
        <div class="form-group"><label>Authors</label><input class="input art-in" data-idx="${idx}" data-field="authors" value="${escapeAttr(a.authors)}"/></div>
        <div class="form-group"><label>Abstract</label><textarea class="textarea art-in" rows="2" data-idx="${idx}" data-field="abstract">${escapeHtml(a.abstract)}</textarea></div>
        <div class="form-group"><label>Body (paragraphs separated by blank lines)</label><textarea class="textarea art-in" rows="5" data-idx="${idx}" data-field="body">${escapeHtml(a.body)}</textarea></div>
      </div>
    `).join("");

    list.querySelectorAll(".art-in").forEach((el) => {
      el.addEventListener("input", () => {
        articles[Number(el.dataset.idx)][el.dataset.field] = el.value;
        renderPreview();
      });
    });

    list.querySelectorAll(".rem-art").forEach((b) => {
      b.addEventListener("click", () => {
        articles.splice(Number(b.dataset.idx), 1);
        renderEditorList();
        renderPreview();
      });
    });
  }

  function renderPreview() {
    const lang = document.getElementById("p-lang").value;
    const isAr = lang === "ar";
    const dir = isAr ? "rtl" : "ltr";
    const vol = document.getElementById("p-vol").value;
    const date = document.getElementById("p-date").value;
    const sub = document.getElementById("p-sub").value;
    const s = db.settings;

    const journalTitle = isAr ? s.name_ar : s.name_en;
    const boardList = (db.board || []).slice(0, 10).map((m) =>
      `<li><strong>${isAr ? m.role_ar : m.role_en}:</strong> ${isAr ? m.name_ar : m.name_en}</li>`
    ).join("");

    const tocItems = articles.map((a, i) =>
      `<li style="margin-bottom:8px;"><strong>${i + 1}. ${escapeHtml(a.title)}</strong><br/><span style="color:#64748B;font-size:9pt;">${escapeHtml(a.authors)}</span></li>`
    ).join("");

    let pageNum = 1;
    const articlePages = articles.map((a, i) => {
      pageNum++;
      const paras = (a.body || "").split(/\n\s*\n/).map((p) => `<p style="text-align:justify; margin-bottom:10px;">${escapeHtml(p)}</p>`).join("");
      return `
        <div class="a4-page" dir="${dir}">
          <div class="a4-header">
            <span>${journalTitle} (${s.abbr || "JoES"})</span>
            <span>${escapeHtml(vol)} · ${escapeHtml(date)}</span>
          </div>
          <div class="article-block">
            <h2>${i + 1}. ${escapeHtml(a.title)}</h2>
            <div class="authors">${escapeHtml(a.authors)}</div>
            <div class="abstract-box"><strong>${isAr ? "الملخص:" : "Abstract:"}</strong> ${escapeHtml(a.abstract)}</div>
            <div style="font-size:10.5pt; line-height:1.75;">${paras}</div>
          </div>
          <div class="a4-footer">
            <span>${s.website || "www.aes.edu.sd"} · ${s.email || "info@aes.edu.sd"}</span>
            <span>${isAr ? "صفحة" : "Page"} ${pageNum}</span>
          </div>
        </div>
      `;
    }).join("");

    document.getElementById("a4-preview").innerHTML = `
      <!-- Cover Page -->
      <div class="a4-page a4-cover" dir="${dir}">
        <div class="a4-cover-frame">
          <div>
            <div style="color:#EBC86A; letter-spacing:3px; font-size:10pt; font-weight:700;">${s.abbr || "JoES"} · PEER-REVIEWED JOURNAL</div>
            <h1 style="color:#FFFFFF; font-size:26pt; margin:28mm 0 10px;">${journalTitle}</h1>
            <p style="color:#CBD5E1; font-size:12pt;">${escapeHtml(sub)}</p>
          </div>
          <div style="background:rgba(255,255,255,0.08); border:1.5px solid #B88A1E; border-radius:10px; padding:18px;">
            <div style="color:#EBC86A; font-size:13pt; font-weight:700;">${escapeHtml(vol)}</div>
            <div style="color:#FFFFFF; font-size:11pt; margin-top:4px;">${escapeHtml(date)}</div>
          </div>
          <div style="color:#CBD5E1; font-size:10pt; display:flex; justify-content:space-between;">
            <span>${s.website || "www.aes.edu.sd"}</span>
            <span>${s.email || "info@aes.edu.sd"}</span>
          </div>
        </div>
      </div>

      <!-- Front Matter & Table of Contents -->
      <div class="a4-page" dir="${dir}">
        <div class="a4-header">
          <span>${journalTitle} (${s.abbr || "JoES"})</span>
          <span>${escapeHtml(vol)} · ${escapeHtml(date)}</span>
        </div>
        <h2 style="color:var(--navy);">${isAr ? "هيئة التحرير" : "Editorial Board"}</h2>
        <ul style="font-size:10pt; line-height:1.7; margin-bottom:24px;">${boardList}</ul>
        <h2 style="color:var(--navy); border-top:1.5px solid var(--gold); padding-top:14px;">${isAr ? "فهرس المحتويات" : "Table of Contents"}</h2>
        <ol style="font-size:10.5pt; padding-inline-start:18px;">${tocItems}</ol>
        <div class="a4-footer">
          <span>${s.website || "www.aes.edu.sd"}</span>
          <span>${isAr ? "صفحة 1" : "Page 1"}</span>
        </div>
      </div>

      ${articlePages}
    `;
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }

  document.addEventListener("DOMContentLoaded", async () => {
    db = await STORE.getAll();
    renderEditorList();
    renderPreview();

    ["p-lang", "p-vol", "p-date", "p-sub"].forEach((id) => {
      document.getElementById(id).addEventListener("input", renderPreview);
      document.getElementById(id).addEventListener("change", renderPreview);
    });

    document.getElementById("add-art-btn").addEventListener("click", () => {
      articles.push({ title: "New Article Title", authors: "Author Name", abstract: "Abstract...", body: "Article text..." });
      renderEditorList();
      renderPreview();
    });

    document.getElementById("print-pdf-btn").addEventListener("click", () => window.print());
  });
})();
