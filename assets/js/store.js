// =========================================================
// JoES Data Store (Supabase Live Mode + LocalStorage Demo Mode)
// =========================================================

(function () {
  const LS_KEY = "joes_local_db_v1";
  const cfg = window.JOES_CONFIG || {};
  const isLive = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);

  let sb = null;
  if (isLive) {
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }

  function cloneDefaults() {
    return JSON.parse(JSON.stringify(window.JOES_DEFAULT_DATA));
  }

  function readLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) {
        const d = cloneDefaults();
        localStorage.setItem(LS_KEY, JSON.stringify(d));
        return d;
      }
      return JSON.parse(raw);
    } catch {
      return cloneDefaults();
    }
  }

  function writeLocal(db) {
    localStorage.setItem(LS_KEY, JSON.stringify(db));
  }

  function uid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  }

  window.JOES_STORE = {
    isLive,
    client: sb,

    async getAll() {
      if (!isLive) {
        return readLocal();
      }
      try {
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000));
        const query = Promise.all([
          sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
          sb.from("volumes").select("*").order("sort_order", { ascending: true }),
          sb.from("issues").select("*").order("created_at", { ascending: false }),
          sb.from("board_members").select("*").order("sort_order", { ascending: true }),
          sb.from("pages").select("*"),
          sb.from("videos").select("*").order("created_at", { ascending: false }),
          sb.from("important_links").select("*").order("sort_order", { ascending: true }),
          sb.from("comments").select("*").order("created_at", { ascending: false })
        ]);
        const [settingsRes, volRes, issRes, boardRes, pagesRes, vidRes, linkRes, comRes] = await Promise.race([query, timeout]);

        const defaults = cloneDefaults();
        const pagesMap = { ...defaults.pages };
        (pagesRes.data || []).forEach((p) => { pagesMap[p.slug] = p; });

        return {
          settings: settingsRes.data || defaults.settings,
          volumes: (volRes.data && volRes.data.length) ? volRes.data : defaults.volumes,
          issues: issRes.data || defaults.issues,
          board: (boardRes.data && boardRes.data.length) ? boardRes.data : defaults.board,
          pages: pagesMap,
          videos: vidRes.data || defaults.videos,
          links: linkRes.data || [],
          comments: comRes.data || []
        };
      } catch {
        return readLocal();
      }
    },

    // ---- Auth ----
    async getSession() {
      if (!isLive) {
        return sessionStorage.getItem("joes_demo_auth") === "1"
          ? { user: { email: "admin@joes.edu (Demo)" } }
          : null;
      }
      const { data } = await sb.auth.getSession();
      return data.session;
    },

    async signIn(email, password) {
      if (!isLive) {
        if (email === "admin@joes.edu" && password === "admin123") {
          sessionStorage.setItem("joes_demo_auth", "1");
          return { ok: true };
        }
        return { ok: false, error: "Demo credentials: admin@joes.edu / admin123" };
      }
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    },

    async signOut() {
      if (!isLive) {
        sessionStorage.removeItem("joes_demo_auth");
        return;
      }
      await sb.auth.signOut();
    },

    // ---- File Upload ----
    async uploadFile(bucket, file) {
      if (!file) return "";
      if (!isLive) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await sb.storage.from(bucket).upload(path, file, { upsert: true });
      if (error) throw error;
      const { data } = sb.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    },

    // ---- Settings ----
    async saveSettings(settings) {
      if (!isLive) {
        const db = readLocal();
        db.settings = { ...db.settings, ...settings };
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("site_settings").upsert({ id: 1, ...settings });
      if (error) throw error;
    },

    // ---- Volumes ----
    async saveVolume(vol) {
      if (!isLive) {
        const db = readLocal();
        if (vol.id) {
          db.volumes = db.volumes.map((v) => v.id === vol.id ? { ...v, ...vol } : v);
        } else {
          db.volumes.push({ ...vol, id: uid("vol") });
        }
        db.volumes.sort((a, b) => a.sort_order - b.sort_order);
        writeLocal(db);
        return;
      }
      const payload = { ...vol };
      if (!payload.id) payload.id = uid("vol");
      const { error } = await sb.from("volumes").upsert(payload);
      if (error) throw error;
    },

    async deleteVolume(id) {
      if (!isLive) {
        const db = readLocal();
        db.volumes = db.volumes.filter((v) => v.id !== id);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("volumes").delete().eq("id", id);
      if (error) throw error;
    },

    // ---- Issues ----
    async saveIssue(issue) {
      if (!isLive) {
        const db = readLocal();
        if (issue.id) {
          db.issues = db.issues.map((i) => i.id === issue.id ? { ...i, ...issue } : i);
        } else {
          db.issues.unshift({ ...issue, id: uid("iss"), created_at: new Date().toISOString() });
        }
        writeLocal(db);
        return;
      }
      const payload = { ...issue };
      if (!payload.id) payload.id = uid("iss");
      const { error } = await sb.from("issues").upsert(payload);
      if (error) throw error;
    },

    async deleteIssue(id) {
      if (!isLive) {
        const db = readLocal();
        db.issues = db.issues.filter((i) => i.id !== id);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("issues").delete().eq("id", id);
      if (error) throw error;
    },

    // ---- Pages ----
    async savePage(slug, pageData) {
      if (!isLive) {
        const db = readLocal();
        db.pages[slug] = { ...db.pages[slug], ...pageData, slug };
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("pages").upsert({ slug, ...pageData });
      if (error) throw error;
    },

    // ---- Board Members ----
    async saveBoardMember(member) {
      if (!isLive) {
        const db = readLocal();
        if (member.id) {
          db.board = db.board.map((m) => m.id === member.id ? { ...m, ...member } : m);
        } else {
          db.board.push({ ...member, id: uid("b") });
        }
        db.board.sort((a, b) => (a.sort_order || 99) - (b.sort_order || 99));
        writeLocal(db);
        return;
      }
      const payload = { ...member };
      if (!payload.id) payload.id = uid("b");
      const { error } = await sb.from("board_members").upsert(payload);
      if (error) throw error;
    },

    async deleteBoardMember(id) {
      if (!isLive) {
        const db = readLocal();
        db.board = db.board.filter((m) => m.id !== id);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("board_members").delete().eq("id", id);
      if (error) throw error;
    },

    // ---- Videos ----
    async saveVideo(video) {
      if (!isLive) {
        const db = readLocal();
        if (video.id) {
          db.videos = db.videos.map((v) => v.id === video.id ? { ...v, ...video } : v);
        } else {
          db.videos.unshift({ ...video, id: uid("vid"), created_at: new Date().toISOString() });
        }
        writeLocal(db);
        return;
      }
      const payload = { ...video };
      if (!payload.id) payload.id = uid("vid");
      const { error } = await sb.from("videos").upsert(payload);
      if (error) throw error;
    },

    async deleteVideo(id) {
      if (!isLive) {
        const db = readLocal();
        db.videos = db.videos.filter((v) => v.id !== id);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("videos").delete().eq("id", id);
      if (error) throw error;
    },

    // ---- Important Links ----
    async saveLink(link) {
      if (!isLive) {
        const db = readLocal();
        if (link.id) {
          db.links = db.links.map((l) => l.id === link.id ? { ...l, ...link } : l);
        } else {
          db.links.push({ ...link, id: uid("lnk") });
        }
        writeLocal(db);
        return;
      }
      const payload = { ...link };
      if (!payload.id) payload.id = uid("lnk");
      const { error } = await sb.from("important_links").upsert(payload);
      if (error) throw error;
    },

    async deleteLink(id) {
      if (!isLive) {
        const db = readLocal();
        db.links = db.links.filter((l) => l.id !== id);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("important_links").delete().eq("id", id);
      if (error) throw error;
    },

    // ---- Comments ----
    async addComment(comment, autoApprove) {
      const payload = {
        id: uid("com"),
        issue_id: comment.issue_id,
        author_name: comment.author_name,
        body: comment.body,
        approved: Boolean(autoApprove),
        created_at: new Date().toISOString()
      };
      if (!isLive) {
        const db = readLocal();
        db.comments.unshift(payload);
        writeLocal(db);
        return payload;
      }
      const { error } = await sb.from("comments").insert(payload);
      if (error) throw error;
      return payload;
    },

    async setCommentApproval(id, approved) {
      if (!isLive) {
        const db = readLocal();
        db.comments = db.comments.map((c) => c.id === id ? { ...c, approved } : c);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("comments").update({ approved }).eq("id", id);
      if (error) throw error;
    },

    async deleteComment(id) {
      if (!isLive) {
        const db = readLocal();
        db.comments = db.comments.filter((c) => c.id !== id);
        writeLocal(db);
        return;
      }
      const { error } = await sb.from("comments").delete().eq("id", id);
      if (error) throw error;
    },

    resetDemo() {
      localStorage.removeItem(LS_KEY);
    }
  };
})();
