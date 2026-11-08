/* Ryoku guide engine: renders the chapters in window.G.chapters and wires up
   the values panel, progress, search, glossary tooltips, copy and keys. */
(function () {
  "use strict";
  const G = window.G;
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const K_VALS = "rg-values-v1", K_PROG = "rg-progress-v1", K_THEME = "rg-theme";
  const FIELDS = [
    ["USER", "نام کاربری لپ‌تاپ", "nima"],
    ["HOST", "نام میزبان (hostname)", "k556"],
    ["LAPTOP_IP", "IP لپ‌تاپ", "192.168.1.50"],
    ["PC_IP", "IP سیستم اصلی (Fedora)", "192.168.1.10"],
    ["PC_USER", "نام کاربری روی Fedora", "nima"],
    ["SOCKS", "پورت SOCKS در Happ", "10808"],
    ["HTTP", "پورت HTTP در Happ", "10809"],
    ["USB", "دستگاه فلش (روی Fedora)", "/dev/sdX"],
    ["HDD", "دستگاه هارد ۱ ترابایتی", "/dev/sdY"],
    ["HDD_UUID", "UUID پارتیشن هارد (از blkid)", "PUT-UUID-HERE"],
    ["WIFI", "نام وای‌فای (SSID)", "MyWiFi"],
    ["ISO", "نام فایل ISO", "ryoku-DATE-x86_64.iso"]
  ];
  let vals = Object.assign({}, Object.fromEntries(FIELDS.map(f => [f[0], f[2]])), LS.get(K_VALS, {}));
  let prog = LS.get(K_PROG, {});

  /* ---------- helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const phSpan = k => `<span class="ph" data-k="${k}" title="مقدار از پنل «مقادیر من»">${esc(vals[k] || "{{" + k + "}}")}</span>`;
  const fillPh = s => String(s).replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in vals ? phSpan(k) : m));
  const fillText = s => String(s).replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (vals[k] || m));
  let seenTerms = new Set();
  // prose: HTML authored by hand; [[key]] / [[label|key]] become glossary terms
  function prose(html) {
    html = String(html).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => {
      const key = (b || a).trim(), label = a.trim();
      const g = G.glossary[key];
      if (!g) { console.warn("glossary: missing", key); return label; }
      if (seenTerms.has(key)) return label;
      seenTerms.add(key);
      return `<dfn class="term" tabindex="0" data-term="${esc(key)}">${label}</dfn>`;
    });
    // isolate Latin paths (/mnt/usb, ~/.config, user@host:/x) so the RTL bidi algorithm cannot reorder them
    html = html.split(/(<[^>]+>)/).map(seg => seg.charAt(0) === "<" ? seg :
      seg.replace(/[\w.:{}@+~\/-]*(?:[\/~]|\w[.-]\w)[\w.:{}@+~\/-]*/g, m => (m.length > 1 && /[\w}]/.test(m) ? `<bdi dir="ltr"${m.length <= 28 ? ' class="nw"' : ""}>${m}</bdi>` : m))).join("");
    return fillPh(html);
  }
  // code: plain text, comments dimmed, placeholders highlighted
  function codeHtml(src) {
    return String(src).split("\n").map(line => {
      let e = esc(line);
      if (/^\s*#/.test(line) || /^\s*\/\//.test(line) || /^\s*--\s/.test(line)) e = `<span class="cm">${e}</span>`;
      return e.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in vals ? phSpan(k) : m));
    }).join("\n");
  }
  let uid = 0;
  const CODES = {}; // id -> raw template

  const ON = { pc: ["on-pc", "🖥️ روی Fedora"], laptop: ["on-laptop", "💻 روی لپ‌تاپ"], live: ["on-live", "💿 در محیط نصب (USB)"], any: ["", "هر جا"] };
  const CT = { concept: "💡 مفهوم", warn: "⚠️ هشدار", fix: "🧯 اگر این مشکل پیش آمد", check: "✅ چک کن", ex: "🎯 تمرین", uv: "⚠️ تأیید نشده" };

  function renderBlock(b) {
    if (typeof b === "string") return `<p>${prose(b)}</p>`;
    switch (b.k) {
      case "p": return `<p>${prose(b.h)}</p>`;
      case "h": return `<h3 class="sub">${prose(b.h)}</h3>`;
      case "raw": return prose(b.h);
      case "ul": return `<ul>${b.items.map(i => `<li>${prose(i)}</li>`).join("")}</ul>`;
      case "ol": return `<ol>${b.items.map(i => `<li>${prose(i)}</li>`).join("")}</ol>`;
      case "tbl": return `<div class="tbl-wrap"><table${b.cls ? ` class="${b.cls}"` : ""}><thead><tr>${b.head.map(h => `<th>${prose(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${prose(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      case "c": {
        const t = b.type === "uv" ? CT.uv : CT[b.type] + (b.title ? ": " + b.title : "");
        return `<div class="callout ${b.type === "uv" ? "uvbox" : b.type}"><span class="ct">${prose(t)}</span>${b.items.map(x => renderBlock(x)).join("")}</div>`;
      }
      case "cmd": return renderCmd(b);
      case "file": return renderFile(b);
      default: return "";
    }
  }
  function badges(b) {
    let s = "";
    if (b.on && ON[b.on] && ON[b.on][0]) s += `<span class="badge ${ON[b.on][0]}">${ON[b.on][1]}</span>`;
    if (b.root) s += `<span class="badge root" title="با sudo، یعنی با دسترسی مدیر اجرا می‌شود">🔑 sudo</span>`;
    if (b.net) s += `<span class="badge net" title="اینترنت لازم دارد؛ در ایران معمولاً یعنی پروکسی روشن باشد">🌐 ${b.net === "proxy" ? "پروکسی لازم" : "اینترنت لازم"}</span>`;
    if (b.danger) s += `<span class="badge danger">⛔ خطرناک</span>`;
    if (b.uv) s += `<span class="badge uv">⚠️ تأیید نشده</span>`;
    if (b.shell) s += `<span class="badge">${esc(b.shell)}</span>`;
    return s;
  }
  function renderCmd(b) {
    const id = "code" + (++uid);
    CODES[id] = b.c;
    let h = "";
    if (b.danger) {
      const conf = b.confirm || ["مطمئنم دستگاه درست را انتخاب کرده‌ام.", "می‌دانم این کار برگشت‌ناپذیر است."];
      h += `<div class="danger-box" data-for="${id}"><b>⛔ قبل از کپی، این‌ها را تیک بزن:</b>${conf.map(x => `<label><input type="checkbox" class="dconf">${prose(x)}</label>`).join("")}</div>`;
    }
    h += `<div class="cmd nav-item${b.danger ? " is-danger" : ""}" tabindex="-1" data-code="${id}">`;
    h += `<div class="cmd-top"><span class="desc">${prose(b.d || "")}</span>${badges(b)}</div>`;
    h += `<div class="pre-wrap"><pre class="has-copy" dir="ltr">${codeHtml(b.c)}</pre><button class="copy" type="button" data-code="${id}"${b.danger ? " disabled" : ""}>کپی</button></div>`;
    const det = [];
    if (b.parts && b.parts.length) det.push(`<ul class="parts">${b.parts.map(p => `<li><code>${fillPh(esc(p[0]))}</code><span>${prose(p[1])}</span></li>`).join("")}</ul>`);
    if (b.out) det.push(`<div class="muted">خروجی مورد انتظار (نمونه):</div><pre class="out" dir="ltr">${codeHtml(b.out)}</pre>`);
    if (b.ok) det.push(`<div class="ok-line">✅ ${prose(b.ok)}</div>`);
    if (b.uv) det.push(`<div class="callout uvbox"><span class="ct">${CT.uv}</span><p>${prose(b.uv)}</p></div>`);
    if (b.note) det.push(`<p>${prose(b.note)}</p>`);
    if (det.length) h += `<details${b.open ? " open" : ""}><summary>توضیح بخش‌به‌بخش، خروجی و بررسی</summary><div class="dbody">${det.join("")}</div></details>`;
    return h + `</div>`;
  }
  function renderFile(b) {
    const id = "code" + (++uid);
    // file contents always end with a newline, so repeated `wl-paste >> file` never glues lines together
    CODES[id] = /\n$/.test(b.c) ? b.c : b.c + "\n";
    return `<div class="cmd nav-item" tabindex="-1" data-code="${id}">` +
      (b.d ? `<div class="cmd-top"><span class="desc">${prose(b.d)}</span>${badges(b)}</div>` : "") +
      (b.path ? `<div class="file-title">📄 ${fillPh(esc(b.path))}</div>` : "") +
      `<div class="pre-wrap"><pre class="has-copy" dir="ltr">${codeHtml(b.c)}</pre><button class="copy" type="button" data-code="${id}">کپی</button></div>` +
      (b.note ? `<details><summary>توضیح</summary><div class="dbody"><p>${prose(b.note)}</p></div></details>` : "") + `</div>`;
  }

  /* ---------- render chapters ---------- */
  const main = $("#content");
  const toc = $("#toc");
  let html = "", tocHtml = "";
  G.chapters.forEach((ch, ci) => {
    seenTerms = new Set();
    const steps = ch.steps.slice();
    if (ch.end && ch.end.length) steps.push({ t: "✅ چک‌لیست پایان فصل", end: true, b: [{ k: "ul", items: ch.end.map(x => "☐ " + x) }] });
    let s = `<section class="chapter" id="${ch.id}" data-ci="${ci}"><header class="ch-head"><div class="ch-kicker">فصل ${ch.n}</div><h2>${prose(ch.t)}</h2>`;
    s += `<div class="intro"><div><b>چه کار می‌کنیم</b>${prose(ch.what)}</div><div><b>چرا</b>${prose(ch.why)}</div><div><b>زمان تقریبی</b>${prose(ch.time)}</div><div><b>چه لازم داری</b>${prose(ch.need)}</div></div>`;
    s += `<div class="bar"><i></i></div><div class="ch-pct"></div></header>`;
    steps.forEach((st, si) => {
      const sid = `${ch.id}-s${si + 1}`;
      const done = !!prog[sid];
      const box = st.faq ? "" : `<input type="checkbox" class="chk" aria-label="انجام شد" data-step="${sid}"${done ? " checked" : ""}>`;
      s += `<article class="step nav-item${st.faq ? " faq" : ""}${done && !st.faq ? " done" : ""}" id="${sid}" tabindex="-1" data-step="${sid}"><div class="step-h">${box}<h3><span class="sn">${st.end || st.faq ? "" : toFa(si + 1) + ". "}</span>${prose(st.t)}</h3></div>`;
      s += st.b.map(renderBlock).join("") + `</article>`;
    });
    if (ch.probs && ch.probs.length) {
      s += `<div class="callout fix"><span class="ct">🧯 مشکلات رایج این فصل</span><ul>${ch.probs.map(p => `<li><b>${prose(p[0])}</b> ${prose(p[1])}</li>`).join("")}</ul></div>`;
    }
    if (ch.extra) s += ch.extra.map(renderBlock).join("");
    if (ch.src && ch.src.length) {
      s += `<div class="srcs"><b>📚 منابع</b><ul>${ch.src.map(x => `<li>${esc(x[0])}: <a href="${esc(x[1])}" dir="ltr">${esc(x[1])}</a></li>`).join("")}</ul></div>`;
    }
    s += `</section>`;
    html += s;
    tocHtml += `<li><a href="#${ch.id}" data-ci="${ci}"><span class="num">${ch.n}</span> ${ch.short || ch.t}<div class="mini"><div class="bar"><i></i></div><span></span></div></a></li>`;
  });
  main.innerHTML = html + `<footer class="footer">این راهنما کاملاً آفلاین است. فونت: Vazirmatn (SIL Open Font License). آخرین بررسی منابع: ۱۸ آبان ۱۴۰۵ (۸ نوامبر ۲۰۲۶).</footer>`;
  toc.innerHTML = tocHtml;
  function toFa(n) { return String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]); }

  /* ---------- glossary chapter body ---------- */
  const gl = $("#glossaryList");
  if (gl) {
    const keys = Object.keys(G.glossary).sort((a, b) => G.glossary[a].t.localeCompare(G.glossary[b].t, "fa"));
    gl.innerHTML = keys.map(k => { const g = G.glossary[k]; return `<dt id="g-${esc(k)}">${esc(g.t)}${g.en ? `<span class="en" dir="ltr">${esc(g.en)}</span>` : ""}</dt><dd>${fillPh(g.d)}</dd>`; }).join("");
  }

  /* ---------- placeholders ---------- */
  function refreshPh() { $$(".ph").forEach(el => { const k = el.dataset.k; el.textContent = vals[k] || "{{" + k + "}}"; }); }

  /* ---------- copy ---------- */
  const toastEl = $("#toast");
  let toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 1600); }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
    let ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta); return ok;
  }
  async function copyText(text) {
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) { /* fall through */ }
    return fallbackCopy(text);
  }
  function copyById(id, btn) {
    const b = btn || $(`.copy[data-code="${id}"]`);
    if (b && b.disabled) { toast("اول چک‌لیست قرمز بالای دستور را تیک بزن."); return; }
    const text = fillText(CODES[id]);
    copyText(text).then(ok => {
      window.__lastCopied = text;
      if (!ok) { // select the command so Ctrl+C works by hand
        const pre = b && b.parentElement && b.parentElement.querySelector("pre");
        if (pre) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      }
      toast(ok ? "کپی شد ✓" : "کپی نشد؛ متن انتخاب شد، Ctrl+C بزن.");
      if (b && ok) { b.classList.add("ok"); b.textContent = "کپی شد"; setTimeout(() => { b.classList.remove("ok"); b.textContent = "کپی"; }, 1300); }
    });
  }
  document.addEventListener("click", e => {
    const c = e.target.closest(".copy");
    if (c) { copyById(c.dataset.code, c); }
  });
  document.addEventListener("change", e => {
    if (e.target.classList.contains("dconf")) {
      const box = e.target.closest(".danger-box");
      const all = $$(".dconf", box).every(x => x.checked);
      const btn = $(`.copy[data-code="${box.dataset.for}"]`);
      if (btn) btn.disabled = !all;
    }
    if (e.target.classList.contains("chk")) setStep(e.target.dataset.step, e.target.checked);
  });

  /* ---------- progress ---------- */
  function setStep(sid, on) {
    if (on) prog[sid] = 1; else delete prog[sid];
    LS.set(K_PROG, prog);
    const st = document.getElementById(sid);
    if (st) { st.classList.toggle("done", on); const cb = $(".chk", st); if (cb) cb.checked = on; }
    updateProgress();
  }
  function updateProgress() {
    let total = 0, done = 0;
    $$(".chapter").forEach(sec => {
      const all = $$(".step:not(.faq)", sec), d = all.filter(s => s.classList.contains("done")).length;
      if (!all.length) sec.classList.add("no-prog");
      total += all.length; done += d;
      const pct = all.length ? Math.round(d * 100 / all.length) : 0;
      $(".ch-head .bar>i", sec).style.width = pct + "%";
      $(".ch-pct", sec).textContent = `${toFa(d)} از ${toFa(all.length)} گام (${toFa(pct)}٪)`;
      const a = $(`#toc a[data-ci="${sec.dataset.ci}"]`);
      if (a) { $(".bar>i", a).style.width = pct + "%"; $(".mini span", a).textContent = toFa(pct) + "٪"; a.classList.toggle("done", pct === 100); }
    });
    const p = total ? Math.round(done * 100 / total) : 0;
    $("#overallBar").style.width = p + "%";
    $("#overallPct").textContent = toFa(p) + "٪";
  }
  updateProgress();
  // two-step confirm inside the page (confirm() dialogs are blocked in the artifact viewer)
  const resetBtn = $("#resetBtn"), resetLabel = resetBtn.textContent;
  let resetArmed = 0;
  resetBtn.addEventListener("click", () => {
    if (!resetArmed) {
      resetArmed = setTimeout(() => { resetArmed = 0; resetBtn.textContent = resetLabel; }, 4000);
      resetBtn.textContent = "مطمئنی؟ دوباره بزن تا پاک شود";
      return;
    }
    clearTimeout(resetArmed); resetArmed = 0; resetBtn.textContent = resetLabel;
    prog = {}; LS.set(K_PROG, prog);
    $$(".step:not(.faq)").forEach(s => { s.classList.remove("done"); const c = $(".chk", s); if (c) c.checked = false; });
    updateProgress(); toast("پیشرفت صفر شد.");
  });

  /* ---------- theme ---------- */
  // stored choice wins; otherwise the offline file defaults to dark and the published page follows the viewer's theme
  const root = document.documentElement;
  if (window.__ARTIFACT) root.classList.add("in-artifact");
  const effTheme = () => root.dataset.theme || (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const themeBtn = () => { $("#themeBtn").textContent = effTheme() === "dark" ? "☀️" : "🌙"; };
  function setTheme(t) { root.dataset.theme = t; LS.set(K_THEME, t); themeBtn(); }
  const storedTheme = LS.get(K_THEME, null);
  if (storedTheme) root.dataset.theme = storedTheme;
  else if (!root.dataset.theme && !window.__ARTIFACT) root.dataset.theme = "dark";
  themeBtn();
  if (window.matchMedia) matchMedia("(prefers-color-scheme: light)").addEventListener("change", themeBtn);
  $("#themeBtn").addEventListener("click", () => setTheme(effTheme() === "dark" ? "light" : "dark"));

  /* ---------- overlays ---------- */
  function openOv(id) { closeAll(); const o = document.getElementById(id); o.classList.add("open"); const f = $("#searchInput", o) || $("input", o) || $("button", o); if (f) f.focus(); }
  function closeAll() { $$(".overlay.open").forEach(o => o.classList.remove("open")); closeMenu(); }
  $$(".overlay").forEach(o => o.addEventListener("click", e => { if (e.target === o) closeAll(); }));
  $$(".overlay .close").forEach(b => b.addEventListener("click", closeAll));

  /* values panel */
  const vf = $("#valsForm");
  vf.innerHTML = FIELDS.map(f => `<label>${f[1]} <span dir="ltr" class="muted">{{${f[0]}}}</span><input name="${f[0]}" value="${esc(vals[f[0]])}" spellcheck="false" autocomplete="off"></label>`).join("");
  vf.addEventListener("input", e => {
    if (!e.target.name) return;
    vals[e.target.name] = e.target.value.trim();
    LS.set(K_VALS, vals); refreshPh();
  });
  $("#valsBtn").addEventListener("click", () => openOv("valsOv"));
  $("#valsReset").addEventListener("click", () => {
    vals = Object.fromEntries(FIELDS.map(f => [f[0], f[2]])); LS.set(K_VALS, vals);
    $$("input", vf).forEach(i => { i.value = vals[i.name]; }); refreshPh(); toast("مقادیر پیش‌فرض برگشت.");
  });
  $("#helpBtn").addEventListener("click", () => openOv("helpOv"));

  /* ---------- search ---------- */
  const norm = s => String(s).toLowerCase().replace(/[‌‍ً-ٟ]/g, "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/\s+/g, " ");
  let INDEX = [];
  function buildIndex() {
    const BLOCK = /^(P|LI|TD|TH|DIV|PRE|H3|DT|DD|TR|SUMMARY|LABEL)$/;
    INDEX = $$(".step").map(st => {
      const sec = st.closest(".chapter"), ch = G.chapters[+sec.dataset.ci];
      const title = $(".step-h h3", st).textContent;
      const c = st.cloneNode(true);
      $$(".copy,.badge,summary,.step-h", c).forEach(x => x.remove());
      $$("*", c).forEach(x => { if (BLOCK.test(x.tagName)) x.appendChild(document.createTextNode(" ")); });
      const text = c.textContent.replace(/\s+/g, " ").trim();
      return { id: st.id, ch: `فصل ${ch.n}: ${ch.short || ch.t}`, title, text, n: norm(title + " " + text) };
    });
  }
  buildIndex();
  const si = $("#searchInput"), sr = $("#searchResults");
  let sel = 0, results = [];
  function doSearch() {
    const q = norm(si.value.trim());
    if (!q) { sr.innerHTML = `<li class="muted">چیزی بنویس؛ مثلاً <code>pacman</code> یا «پروکسی».</li>`; results = []; return; }
    const terms = q.split(" ").filter(Boolean);
    results = INDEX.filter(r => terms.every(t => r.n.includes(t))).slice(0, 50);
    sel = 0;
    if (!results.length) { sr.innerHTML = `<li class="muted">چیزی پیدا نشد.</li>`; return; }
    sr.innerHTML = results.map((r, i) => {
      const nt = norm(r.text), pos = Math.max(0, nt.indexOf(terms[0]));
      // norm() drops ZWNJ, so positions can drift a little; widen the window
      let snip = esc(r.text.substr(Math.max(0, pos - 50), 160));
      const raw = si.value.trim().split(/\s+/).filter(t => t.length > 1).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      if (raw.length) snip = snip.replace(new RegExp("(" + raw.join("|") + ")", "gi"), "<mark>$1</mark>");
      return `<li data-i="${i}" class="${i === sel ? "sel" : ""}"><span class="r-c">${esc(r.ch)}</span><div class="r-t">${esc(r.title)}</div><span class="r-s">…${snip}…</span></li>`;
    }).join("");
  }
  function moveSel(d) { if (!results.length) return; sel = (sel + d + results.length) % results.length; $$("#searchResults li").forEach((li, i) => li.classList.toggle("sel", i === sel)); const el = $$("#searchResults li")[sel]; if (el) el.scrollIntoView({ block: "nearest" }); }
  function goResult(i) { const r = results[i]; if (!r) return; closeAll(); const el = document.getElementById(r.id); setFocus(el, false, true); el.classList.add("hl-flash"); setTimeout(() => el.classList.remove("hl-flash"), 1500); }
  si.addEventListener("input", doSearch);
  si.addEventListener("keydown", e => {
    if (e.key === "ArrowDown" || (e.ctrlKey && (e.key === "n" || e.key === "j"))) { e.preventDefault(); moveSel(1); }
    else if (e.key === "ArrowUp" || (e.ctrlKey && (e.key === "p" || e.key === "k"))) { e.preventDefault(); moveSel(-1); }
    else if (e.key === "Enter") { e.preventDefault(); goResult(sel); }
    else if (e.key === "Escape") { e.preventDefault(); closeAll(); }
  });
  sr.addEventListener("click", e => { const li = e.target.closest("li[data-i]"); if (li) goResult(+li.dataset.i); });
  $("#searchBtn").addEventListener("click", () => { openOv("searchOv"); doSearch(); });

  /* ---------- glossary tooltip ---------- */
  const tip = $("#tip");
  function showTip(el) {
    const g = G.glossary[el.dataset.term]; if (!g) return;
    tip.innerHTML = `<b>${esc(g.t)}</b>${g.en ? ` <span dir="ltr" class="muted">(${esc(g.en)})</span>` : ""}<br>${esc(fillText(g.d))}`;
    tip.classList.add("show");
    const r = el.getBoundingClientRect(), tw = Math.min(320, window.innerWidth - 20);
    let x = r.left + r.width / 2 - tw / 2; x = Math.max(10, Math.min(x, window.innerWidth - tw - 10));
    tip.style.width = tw + "px"; tip.style.left = x + "px";
    const th = tip.offsetHeight; let y = r.bottom + 8; if (y + th > window.innerHeight - 8) y = r.top - th - 8;
    tip.style.top = y + "px";
  }
  function hideTip() { tip.classList.remove("show"); }
  document.addEventListener("mouseover", e => { const t = e.target.closest("dfn.term"); if (t) showTip(t); });
  document.addEventListener("mouseout", e => { if (e.target.closest("dfn.term")) hideTip(); });
  document.addEventListener("focusin", e => { const t = e.target.closest && e.target.closest("dfn.term"); if (t) showTip(t); else hideTip(); });
  window.addEventListener("scroll", () => {
    const a = document.activeElement;
    if (a && a.matches && a.matches("dfn.term") && tip.classList.contains("show")) showTip(a); else hideTip();
  }, { passive: true });

  /* ---------- sidebar / menu ---------- */
  const side = $("#sidebar"), scrim = $("#scrim");
  function openMenu() { side.classList.add("open"); scrim.classList.add("open"); }
  function closeMenu() { side.classList.remove("open"); scrim.classList.remove("open"); }
  $("#menuBtn").addEventListener("click", () => side.classList.contains("open") ? closeMenu() : openMenu());
  scrim.addEventListener("click", closeMenu);
  toc.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
  const io = new IntersectionObserver(ents => {
    ents.forEach(en => { if (en.isIntersecting) { const ci = en.target.dataset.ci; $$("#toc a").forEach(a => a.classList.toggle("active", a.dataset.ci === ci)); } });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$(".chapter").forEach(c => io.observe(c));

  /* ---------- keyboard navigation ---------- */
  let cur = null;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setFocus(el, center, instant) {
    if (!el) return;
    if (cur) cur.classList.remove("kfocus");
    cur = el; el.classList.add("kfocus");
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: instant || reduce ? "auto" : "smooth", block: center || el.classList.contains("cmd") ? "center" : "start" });
  }
  function items() { return $$(".nav-item").filter(x => x.offsetParent !== null); }
  function firstVisibleIndex(list) {
    const h = window.innerHeight;
    for (let i = 0; i < list.length; i++) { const r = list[i].getBoundingClientRect(); if (r.bottom > 70 && r.top < h) return i; }
    return 0;
  }
  function moveItem(d) {
    const list = items(); if (!list.length) return;
    const i = cur && inView(cur) ? list.indexOf(cur) : -1;
    if (i < 0) { setFocus(list[firstVisibleIndex(list)]); return; }
    setFocus(list[Math.max(0, Math.min(list.length - 1, i + d))]);
  }
  function inView(el) { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; }
  function moveChapter(d) {
    const secs = $$(".chapter");
    let ci = 0; const h = window.innerHeight;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top < h * 0.4) ci = i; });
    const target = secs[Math.max(0, Math.min(secs.length - 1, ci + d))];
    if (cur) cur.classList.remove("kfocus"); cur = null;
    target.scrollIntoView({ behavior: "auto", block: "start" });
    const first = $(".nav-item", target); if (first) { cur = first; first.classList.add("kfocus"); first.focus({ preventScroll: true }); }
  }
  const CODEMAP = { KeyJ: "j", KeyK: "k", KeyY: "y", KeyX: "x", KeyT: "t", KeyG: "g", KeyV: "v", Slash: "/", BracketRight: "]", BracketLeft: "[" };
  function keyOf(e) {
    let k = e.key;
    if (k.length === 1 && /[\x20-\x7e]/.test(k)) return k;
    const base = CODEMAP[e.code]; if (!base) return k; // non-latin layout (e.g. Persian): fall back to key position
    if (e.shiftKey) { if (base === "/") return "?"; if (base === "]") return "}"; if (base === "[") return "{"; return base.toUpperCase(); }
    return base;
  }
  let gPending = 0;
  document.addEventListener("keydown", e => {
    const t = e.target;
    const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (e.key === "Escape") { closeAll(); hideTip(); return; }
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = keyOf(e);
    if (k === "g") { if (gPending && Date.now() - gPending < 700) { gPending = 0; window.scrollTo({ top: 0, behavior: "auto" }); const f = items()[0]; if (f) { if (cur) cur.classList.remove("kfocus"); cur = f; f.classList.add("kfocus"); } e.preventDefault(); } else gPending = Date.now(); return; }
    gPending = 0;
    const anyOpen = $(".overlay.open");
    if (anyOpen && k !== "?") return;
    switch (k) {
      case "j": e.preventDefault(); moveItem(1); break;
      case "k": e.preventDefault(); moveItem(-1); break;
      case "J": case "]": e.preventDefault(); moveChapter(1); break;
      case "K": case "[": e.preventDefault(); moveChapter(-1); break;
      case "G": e.preventDefault(); { const l = items(); setFocus(l[l.length - 1], false, true); window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" }); } break;
      case "/": e.preventDefault(); openOv("searchOv"); doSearch(); break;
      case "?": e.preventDefault(); if ($("#helpOv").classList.contains("open")) closeAll(); else openOv("helpOv"); break;
      case "t": e.preventDefault(); $("#themeBtn").click(); break;
      case "v": e.preventDefault(); openOv("valsOv"); break;
      case "y": {
        e.preventDefault();
        let c = cur && cur.classList.contains("cmd") ? cur : (cur ? $(".cmd", cur) : null);
        if (!c) { toast("اول با j/k روی یک دستور برو."); break; }
        copyById(c.dataset.code); break;
      }
      case "x": {
        e.preventDefault();
        const st = cur ? cur.closest(".step") : null;
        if (!st || st.classList.contains("faq")) { toast("این مورد چک‌باکس ندارد؛ روی یک گام برو."); break; }
        setStep(st.id, !st.classList.contains("done")); break;
      }
    }
  });
  window.__guide = { vals: () => vals, prog: () => prog, index: () => INDEX.length };
})();
