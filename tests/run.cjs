// Headless checks for index.html.  Usage: node tests/run.cjs [screenshot-dir]
// Needs Playwright with Chromium (preinstalled in the build sandbox).
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const FILE = "file://" + path.resolve(__dirname, "..", "index.html");
const SHOTS = process.argv[2] || path.resolve(__dirname, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

let failed = 0;
const ok = (cond, msg) => { console.log((cond ? "PASS " : "FAIL ") + msg); if (!cond) failed++; };

(async () => {
  const browser = await chromium.launch();

  /* ---------- desktop, offline ---------- */
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, deviceScaleFactor: 1 });
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
  await ctx.setOffline(true);
  const page = await ctx.newPage();
  const problems = [], external = [];
  page.on("console", m => { if (["error", "warning"].includes(m.type())) problems.push(m.type() + ": " + m.text()); });
  page.on("pageerror", e => problems.push("pageerror: " + e.message));
  page.on("request", r => { if (!/^(file|data|blob|about):/.test(r.url())) external.push(r.url()); });

  await page.goto(FILE);
  await page.waitForTimeout(400);
  ok(problems.length === 0, "no console errors or warnings" + (problems.length ? ": " + problems.join(" | ") : ""));
  ok(external.length === 0, "no network requests while offline" + (external.length ? ": " + external.join(", ") : ""));

  const counts = await page.evaluate(() => ({
    chapters: document.querySelectorAll(".chapter").length,
    steps: document.querySelectorAll(".step").length,
    cmds: document.querySelectorAll(".cmd").length,
    danger: document.querySelectorAll(".cmd.is-danger").length,
    srcs: document.querySelectorAll(".srcs").length,
    gloss: document.querySelectorAll("#glossaryList dt").length,
    faq: document.querySelectorAll("#c14 .step.faq").length,
    uv: document.querySelectorAll(".badge.uv, .callout.uvbox").length
  }));
  console.log("     counts", JSON.stringify(counts));
  ok(counts.chapters === 16, "16 chapters rendered");
  ok(counts.srcs === 16, "every chapter has a sources list");
  ok(counts.faq >= 35, "troubleshooting has >= 35 entries (" + (counts.faq - 1) + ")");
  ok(counts.gloss >= 40, "glossary rendered");

  /* RTL / LTR */
  const dirs = await page.evaluate(() => ({
    html: document.documentElement.dir,
    p: getComputedStyle(document.querySelector(".step p")).direction,
    pre: getComputedStyle(document.querySelector(".cmd pre")).direction,
    code: getComputedStyle(document.querySelector(".step p code") || document.querySelector("code")).direction,
    font: document.fonts.check("16px VazirGuide")
  }));
  ok(dirs.html === "rtl" && dirs.p === "rtl", "prose is RTL");
  ok(dirs.pre === "ltr" && dirs.code === "ltr", "code blocks and inline code are LTR");
  ok(dirs.font, "embedded Vazirmatn subset loaded");

  /* every chapter has an end checklist except reference chapters */
  const endLists = await page.$$eval(".chapter", secs => secs.map(s => [...s.querySelectorAll(".step-h h3")].some(h => h.textContent.includes("چک‌لیست پایان فصل"))));
  ok(endLists.slice(0, 14).every(Boolean), "chapters 0-13 end with a checklist");

  /* values panel + placeholders */
  await page.keyboard.press("v");
  ok(await page.isVisible("#valsOv.open"), "v opens the values panel");
  await page.screenshot({ path: path.join(SHOTS, "values-panel.png") });
  await page.fill('#valsForm input[name="USER"]', "testuser");
  await page.fill('#valsForm input[name="SOCKS"]', "2080");
  const phUser = await page.$$eval('.ph[data-k="USER"]', els => els.every(e => e.textContent === "testuser") && els.length);
  ok(phUser > 3, "USER placeholders update live (" + phUser + ")");
  await page.keyboard.press("Escape");
  ok(!(await page.isVisible("#valsOv.open")), "Esc closes the panel");

  /* copy fills placeholders */
  const btn = await page.$('#c5 .cmd .copy[data-code]:not([disabled])');
  const proxyCmd = await page.$$eval("#c5 .cmd", cs => { const c = cs.find(x => x.textContent.includes("proxy-on\nproxy-status") || x.textContent.includes("proxy-status")); return c ? c.dataset.code : null; });
  await page.click(`.copy[data-code="${proxyCmd}"]`);
  await page.waitForTimeout(200);
  let copied = await page.evaluate(() => window.__lastCopied || "");
  ok(copied.includes("proxy-status"), "copy button copies the command");
  const userFile = await page.$$eval("#c5 .cmd", cs => cs.find(x => x.textContent.includes("PROXY_SOCKS")).dataset.code);
  await page.click(`.copy[data-code="${userFile}"]`);
  await page.waitForTimeout(200);
  copied = await page.evaluate(() => window.__lastCopied || "");
  ok(copied.includes("set -g PROXY_SOCKS 2080") && !copied.includes("{{"), "copied text has the filled-in values");
  let clip = "";
  try { clip = await page.evaluate(() => navigator.clipboard.readText()); } catch (e) { clip = "(unreadable: " + e.message + ")"; }
  ok(clip.includes("PROXY_SOCKS 2080"), "system clipboard holds the filled text");

  /* danger commands are locked until confirmed */
  const dangerId = await page.$eval(".cmd.is-danger", c => c.dataset.code);
  ok(await page.$eval(`.copy[data-code="${dangerId}"]`, b => b.disabled), "dangerous command copy is locked");
  const boxes = await page.$$(`.danger-box[data-for="${dangerId}"] .dconf`);
  for (const b of boxes) await b.check();
  ok(!(await page.$eval(`.copy[data-code="${dangerId}"]`, b => b.disabled)), "ticking the checklist unlocks copy");

  /* keyboard navigation */
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.click(5, 300); // focus the document, outside inputs
  await page.keyboard.press("j");
  await page.waitForTimeout(150);
  const f1 = await page.$eval(".kfocus", e => e.id || e.dataset.code);
  await page.keyboard.press("j");
  await page.waitForTimeout(150);
  const f2 = await page.$eval(".kfocus", e => e.id || e.dataset.code);
  ok(f1 && f2 && f1 !== f2, "j moves the focus ring");
  await page.keyboard.press("k");
  await page.waitForTimeout(150);
  ok((await page.$eval(".kfocus", e => e.id || e.dataset.code)) === f1, "k moves back");
  await page.screenshot({ path: path.join(SHOTS, "focus-ring.png") });

  // x toggles the focused step, and progress persists across reloads
  const stepId = await page.$eval(".kfocus", e => (e.closest(".step") || e).id);
  await page.keyboard.press("x");
  ok(await page.$eval("#" + stepId, s => s.classList.contains("done")), "x checks the focused step");
  const pct1 = await page.textContent("#overallPct");

  // J / ] jumps chapters
  await page.keyboard.press("Shift+J");
  await page.waitForTimeout(700);
  const chAfterJ = await page.evaluate(() => { let ci = 0; document.querySelectorAll(".chapter").forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) ci = i; }); return ci; });
  ok(chAfterJ === 1, "J jumps to the next chapter");
  await page.keyboard.press("]");
  await page.waitForTimeout(700);
  const chAfterBr = await page.evaluate(() => { let ci = 0; document.querySelectorAll(".chapter").forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) ci = i; }); return ci; });
  ok(chAfterBr === 2, "] jumps to the next chapter");
  await page.keyboard.press("Shift+K");
  await page.waitForTimeout(700);

  // y copies the focused command
  await page.evaluate(() => { window.__lastCopied = ""; });
  const target = await page.$("#c4 .cmd");
  await target.scrollIntoViewIfNeeded();
  await page.evaluate(() => { const c = document.querySelector("#c4 .cmd"); c.scrollIntoView({ block: "center" }); });
  await page.waitForTimeout(300);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("j"); await page.waitForTimeout(120);
    if (await page.$eval(".kfocus", e => e.classList.contains("cmd"))) break;
  }
  const fc = await page.$eval(".kfocus", e => e.classList.contains("cmd") ? "command" : "step");
  await page.keyboard.press("y"); await page.waitForTimeout(250);
  ok((await page.evaluate(() => window.__lastCopied)).length > 0, "y copies the focused " + fc);

  // G and gg
  await page.keyboard.press("Shift+G"); await page.waitForTimeout(900);
  ok(await page.evaluate(() => scrollY > document.body.scrollHeight - innerHeight * 3), "G goes to the bottom");
  await page.keyboard.press("g"); await page.keyboard.press("g"); await page.waitForTimeout(900);
  ok(await page.evaluate(() => scrollY < 50), "g g goes to the top");

  // t theme
  await page.keyboard.press("t");
  ok((await page.getAttribute("html", "data-theme")) === "light", "t switches to the light theme");
  await page.screenshot({ path: path.join(SHOTS, "desktop-light.png") });
  await page.keyboard.press("t");

  // ? help
  await page.keyboard.press("Shift+Slash");
  ok(await page.isVisible("#helpOv.open"), "? opens the shortcut help");
  await page.screenshot({ path: path.join(SHOTS, "help.png") });
  await page.keyboard.press("Escape");

  // Persian layout: key='ت' on the J key position still moves
  await page.evaluate(() => document.querySelector("main").focus());
  const before = await page.$eval(".kfocus", e => e.id || e.dataset.code).catch(() => null);
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ت", code: "KeyJ", bubbles: true })));
  await page.waitForTimeout(200);
  const after = await page.$eval(".kfocus", e => e.id || e.dataset.code).catch(() => null);
  ok(after && after !== before, "keys work with the Persian layout active (physical key position)");

  /* search */
  await page.keyboard.press("/");
  ok(await page.isVisible("#searchOv.open"), "/ opens search");
  await page.keyboard.type("limine-snapper-restore");
  await page.waitForTimeout(200);
  const nres = await page.$$eval("#searchResults li[data-i]", l => l.length);
  ok(nres >= 2, "search finds a command (" + nres + " results)");
  await page.screenshot({ path: path.join(SHOTS, "search.png") });
  await page.fill("#searchInput", "پروکسی sudo");
  await page.waitForTimeout(200);
  ok((await page.$$eval("#searchResults li[data-i]", l => l.length)) > 0, "search matches Persian + Latin terms together");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(800);
  ok(!(await page.isVisible("#searchOv.open")) && (await page.$(".kfocus")) !== null, "Enter jumps to the result");

  /* glossary tooltip on focus */
  await page.focus("dfn.term");
  await page.waitForTimeout(100);
  ok(await page.isVisible("#tip.show"), "glossary tooltip shows on focus");

  /* persistence */
  await page.reload();
  await page.waitForTimeout(400);
  ok(await page.$eval("#" + stepId, s => s.classList.contains("done") && s.querySelector(".chk").checked), "progress survives a reload");
  ok((await page.textContent("#overallPct")) === pct1, "overall progress survives a reload");
  ok((await page.$eval('.ph[data-k="USER"]', e => e.textContent)) === "testuser", "values survive a reload");

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(SHOTS, "desktop-dark.png") });
  const cmdEl = await page.$("#c1 .cmd");
  await cmdEl.scrollIntoViewIfNeeded();
  await page.$eval("#c1 .cmd details", d => d.open = true);
  await (await page.$("#c1 .step:nth-of-type(3)")).screenshot({ path: path.join(SHOTS, "command-block.png") });
  await (await page.$("#c1 .danger-box")).scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(SHOTS, "danger.png") });

  // reset progress
  page.once("dialog", d => d.accept());
  await page.click("#resetBtn");
  ok(!(await page.$eval("#" + stepId, s => s.classList.contains("done"))), "reset clears progress");

  // print emulation
  await page.emulateMedia({ media: "print" });
  ok(await page.$eval(".sidebar", e => getComputedStyle(e).display === "none"), "print hides the sidebar");
  await page.emulateMedia({ media: "screen" });
  await ctx.close();

  /* ---------- phone ---------- */
  const phone = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await phone.setOffline(true);
  const pp = await phone.newPage();
  await pp.goto(FILE);
  await pp.waitForTimeout(400);
  const overflow = await pp.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [...document.querySelectorAll("body *")].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > vw + 1 || r.left < -1) && !e.closest("pre,.tbl-wrap,.sidebar,#tip,.overlay,.sr"); }).slice(0, 8).map(e => (e.className || e.tagName) + "@" + Math.round(e.getBoundingClientRect().left) + ".." + Math.round(e.getBoundingClientRect().right));
    return { sw: document.documentElement.scrollWidth, vw, bad };
  });
  ok(overflow.sw <= overflow.vw, "no horizontal page scroll at phone width (" + overflow.sw + " / " + overflow.vw + ")" + (overflow.bad.length ? " offenders: " + overflow.bad.join(",") : ""));
  ok(await pp.isVisible("#menuBtn"), "menu button visible on phone");
  await pp.screenshot({ path: path.join(SHOTS, "phone.png") });
  await pp.click("#menuBtn");
  await pp.waitForTimeout(300);
  ok(await pp.$eval("#sidebar", e => e.getBoundingClientRect().right <= innerWidth + 1 && e.classList.contains("open")), "sidebar drawer opens on phone");
  await pp.screenshot({ path: path.join(SHOTS, "phone-menu.png") });
  await pp.keyboard.press("Escape");
  await pp.waitForTimeout(300);
  ok(!(await pp.$eval("#sidebar", e => e.classList.contains("open"))), "Esc closes the drawer");
  await (await pp.$("#c5 .cmd")).scrollIntoViewIfNeeded();
  await pp.screenshot({ path: path.join(SHOTS, "phone-command.png") });
  await phone.close();

  await browser.close();
  console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
  process.exit(failed ? 1 : 0);
})();
