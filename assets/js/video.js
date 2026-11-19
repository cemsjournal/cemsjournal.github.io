// =========================================================
// JoES Video Helper (YouTube & Google Drive Embed Parser)
// =========================================================

window.JOES_VIDEO = {
  parse(url) {
    if (!url) return { type: "unknown", embedUrl: "", thumbUrl: "", badge: "Video" };
    const u = url.trim();

    // YouTube patterns
    let ytId = null;
    const ytPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/
    ];
    for (const p of ytPatterns) {
      const m = u.match(p);
      if (m) { ytId = m[1]; break; }
    }
    if (ytId) {
      return {
        type: "youtube",
        id: ytId,
        embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`,
        thumbUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
        badge: "YouTube"
      };
    }

    // Google Drive patterns
    let gdId = null;
    const gdMatch = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([A-Za-z0-9_-]+)/);
    if (gdMatch) {
      gdId = gdMatch[1];
      return {
        type: "gdrive",
        id: gdId,
        embedUrl: `https://drive.google.com/file/d/${gdId}/preview`,
        thumbUrl: "",
        badge: "Google Drive"
      };
    }

    // Fallback (external link such as Blogspot / share.google)
    return {
      type: "external",
      embedUrl: u,
      thumbUrl: "",
      badge: "Academy Portal"
    };
  },

  openModal(url, title) {
    const info = this.parse(url);
    if (info.type === "external") {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    let modal = document.getElementById("joes-video-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "joes-video-modal";
      modal.className = "modal-backdrop";
      modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <strong id="joes-modal-title"></strong>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div class="video-embed-wrap">
            <iframe id="joes-modal-iframe" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("modal-close")) {
          modal.classList.remove("open");
          document.getElementById("joes-modal-iframe").src = "";
        }
      });
    }
    document.getElementById("joes-modal-title").textContent = title || window.JOES_I18N.t("watch_modal_title");
    document.getElementById("joes-modal-iframe").src = info.embedUrl;
    modal.classList.add("open");
  }
};
