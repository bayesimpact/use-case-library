/* =============================================================================
   Bayes Demos — shared engine (lib/bayes.js)
   Dependency-free. Drives: slide navigation, FR/EN toggle (inline data-lang),
   the website-style earth hero, the chat & copilot demo helpers (data from
   inline <script type="application/json"> in each demo slide), and PDF export
   (Cmd-P / button → desktop layout with demos rendered to their finished state).
   You should not need to edit this to make a deck. See CLAUDE.md.
   ========================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- shared slides (from lib/bayes-slides.js) ----------------
     Replace each <… data-shared="name"> placeholder with the canonical slide
     from window.BAYES_SLIDES. Options come from data-opts="{…}" or an inner
     <script type="application/json">. Editing a shared slide updates every deck
     that includes it; to override, just write your own <section> instead. */
  (function injectShared() {
    var lib = window.BAYES_SLIDES; if (!lib) return;
    [].slice.call(document.querySelectorAll("[data-shared]")).forEach(function (h) {
      var name = h.getAttribute("data-shared"), fn = lib[name];
      if (typeof fn !== "function") { console.warn("bayes: unknown shared slide '" + name + "'"); return; }
      var opts = {}, os = h.getAttribute("data-opts"), sc = h.querySelector('script[type="application/json"]');
      try { if (os) opts = JSON.parse(os); else if (sc) opts = JSON.parse(sc.textContent); }
      catch (e) { console.warn("bayes: bad opts for shared '" + name + "'", e); }
      var tmp = document.createElement("div"); tmp.innerHTML = (fn(opts) || "").trim();
      var node = tmp.firstElementChild;
      if (node) h.parentNode.replaceChild(node, h); else h.parentNode.removeChild(h);
    });
  })();

  /* nav state (assigned when the nav is built, referenced by chrome()/setLang) */
  var navEl = null, logoEl = null, langCurEl = null, langBtns = [];
  var LOGO = document.body.getAttribute("data-logo") || "";
  var LOGO_DARK = document.body.getAttribute("data-logo-dark") || LOGO;

  /* ---------------- language (inline data-lang) ---------------- */
  var present = {};
  document.querySelectorAll("[data-lang]").forEach(function (e) { present[e.getAttribute("data-lang")] = 1; });
  var LANGS = ["fr", "en"].filter(function (l) { return present[l]; });
  if (!LANGS.length) LANGS = ["fr"];
  var lang = localStorage.getItem("bayesLang") || document.documentElement.getAttribute("data-lang") || LANGS[0];
  if (LANGS.indexOf(lang) < 0) lang = LANGS[0];

  var UI = {
    fr: { online: "en ligne", typing: "en train d'écrire…", today: "Aujourd'hui", pause: "⏸ Pause", play: "▶ Lecture",
      replay: "↻ Rejouer", restart: "▶ Relancer", autofill: "Pré-remplissage automatique", transcribed: "transcrit",
      compiled: "Dossier compilé", compiledStamp: "✓ Compilé", payNow: "Payer maintenant →", paid: "✓ Réglé",
      payUnique: "🔒 lien unique", running: "en cours…", ok: "OK", who: "Demande", search: "Recherche", copilot: "Copilote", live: "en direct" },
    en: { online: "online", typing: "typing…", today: "Today", pause: "⏸ Pause", play: "▶ Play",
      replay: "↻ Replay", restart: "▶ Restart", autofill: "Auto-filled", transcribed: "transcribed",
      compiled: "Request compiled", compiledStamp: "✓ Compiled", payNow: "Pay now →", paid: "✓ Paid",
      payUnique: "🔒 secure link", running: "running…", ok: "OK", who: "Query", search: "Search", copilot: "Copilot", live: "live" }
  };
  function ui(k) { return (UI[lang] && UI[lang][k] != null) ? UI[lang][k] : (UI.fr[k] || k); }
  function pick(o) { if (o == null) return o; return (typeof o === "object" && !Array.isArray(o)) ? (o[lang] != null ? o[lang] : o[LANGS[0]]) : o; }
  function applyLang() { document.documentElement.setAttribute("data-lang", lang); }
  applyLang();

  /* ---------------- slide engine ---------------- */
  var deck = document.getElementById("deck");
  if (!deck) return;
  var slides = [].slice.call(deck.querySelectorAll(".slide"));
  var pfill = document.getElementById("pfill"), counter = document.getElementById("counter"), dotsWrap = document.getElementById("dots");
  var cur = 0;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  if (dotsWrap) slides.forEach(function (s, i) { var b = document.createElement("button"); b.className = "dot"; b.addEventListener("click", function () { go(i); }); dotsWrap.appendChild(b); });
  var dots = dotsWrap ? [].slice.call(dotsWrap.children) : [];
  function chrome() {
    if (pfill) pfill.style.width = ((cur + 1) / slides.length * 100) + "%";
    if (counter) counter.textContent = pad(cur + 1) + " / " + pad(slides.length);
    dots.forEach(function (d, i) { d.classList.toggle("active", i === cur); });
    var onDark = slides[cur].hasAttribute("data-dark");
    if (dotsWrap) dotsWrap.classList.toggle("on-dark", onDark);
    if (navEl) navEl.classList.toggle("on-dark", onDark);
    var pdfEl = document.querySelector(".pdf-btn"); if (pdfEl) pdfEl.classList.toggle("on-dark", onDark);
    if (logoEl && LOGO) logoEl.src = onDark ? LOGO_DARK : LOGO;
  }
  function go(i) { i = Math.max(0, Math.min(slides.length - 1, i)); cur = i; slides[i].scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var idx = slides.indexOf(e.target);
      if (e.isIntersecting && e.intersectionRatio >= 0.45) { cur = idx; e.target.classList.add("show"); chrome(); try { history.replaceState(null, "", "#" + e.target.id); } catch (x) {} enter(idx); }
      else if (e.intersectionRatio < 0.3) leave(idx);
    });
  }, { threshold: [0, 0.25, 0.45, 0.7, 1] });
  slides.forEach(function (s) { io.observe(s); });
  window.addEventListener("keydown", function (e) {
    if (["ArrowRight", "ArrowDown", "PageDown", " "].indexOf(e.key) > -1) { e.preventDefault(); go(cur + 1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp"].indexOf(e.key) > -1) { e.preventDefault(); go(cur - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(slides.length - 1); }
  });
  function enter(i) { var d = slides[i].getAttribute("data-demo"); if (d && DEMOS[d]) DEMOS[i + ""] = DEMOS[i + ""] || DEMOS[d](slides[i]); var inst = DEMOS[i + ""]; if (inst) inst.start(); }
  function leave(i) { var inst = DEMOS[i + ""]; if (inst) inst.pause(); }

  /* ---------------- earth hero (orbiting dots cloud + fade-cycle) ----------------
     A cloud of data-dots on tilted orbital shells around the planet — the Bayes
     dots/data motif, not a starfield. Each shell tilts (static) and spins inside. */
  (function () {
    var box = document.getElementById("believeBox"); if (!box) return;
    var orbit = box.querySelector("#planetOrbit"); if (!orbit) return;
    var SHELLS = [
      { r: 33, n: 20, d: 92,  tilt: -16, sy: .34 },
      { r: 38, n: 24, d: 122, tilt: 22,  sy: .50, rev: 1 },
      { r: 43, n: 28, d: 158, tilt: -6,  sy: .40 },
      { r: 48, n: 30, d: 198, tilt: 17,  sy: .58, rev: 1 },
      { r: 54, n: 24, d: 250, tilt: -27, sy: .30 }
    ];
    SHELLS.forEach(function (S) {
      var shell = document.createElement("div"); shell.className = "oshell";
      shell.style.transform = "rotate(" + S.tilt + "deg) scaleY(" + S.sy + ")";
      var ring = document.createElement("div"); ring.className = "oring" + (S.rev ? " rev" : "");
      ring.style.animationDuration = S.d + "s";
      for (var k = 0; k < S.n; k++) {
        var a = ((360 / S.n) * k + Math.random() * 9) * Math.PI / 180, rr = S.r + (Math.random() * 3 - 1.5);
        var dt = document.createElement("span"); dt.className = "odot";
        var s = (Math.random() * 2.4 + 2.2).toFixed(1);   // 2.2–4.6px — Bayes data points
        var cols = ["255,132,0", "16,103,254", "16,103,254", "206,220,255"];   // orange / blue / blue / light
        var c = cols[Math.floor(Math.random() * cols.length)];
        dt.style.cssText = "left:" + (50 + rr * Math.cos(a)).toFixed(2) + "%;top:" + (50 + rr * Math.sin(a)).toFixed(2) +
          "%;width:" + s + "px;height:" + s + "px;background:rgba(" + c + ",.95);box-shadow:0 0 6px rgba(" + c + ",.45);opacity:" + (Math.random() * .4 + .5).toFixed(2);
        ring.appendChild(dt);
      }
      shell.appendChild(ring); orbit.appendChild(shell);
    });
  })();
  var Believe = (function () {
    var el = document.getElementById("believeCycle"); if (!el) return { lang: function () {} };
    var data = readJSON(document.querySelector(".believe-data")) || {};
    var timer = null, i = 0;
    function phrases() { return (data[lang] || data[LANGS[0]] || []); }
    function step() { var p = phrases(); if (!p.length) return; el.style.opacity = "0"; timer = setTimeout(function () { el.textContent = p[i % p.length]; el.style.opacity = "1"; i++; timer = setTimeout(step, 2800); }, 450); }
    function start() { var p = phrases(); if (!p.length || timer) return; el.textContent = p[0]; el.style.opacity = "1"; i = 1; timer = setTimeout(step, 2600); }
    function setLang() { clearTimeout(timer); timer = null; i = 0; start(); }
    return { start: start, lang: setLang };
  })();

  /* ---------------- demo helpers ---------------- */
  function readJSON(node) { if (!node) return null; try { return JSON.parse(node.textContent); } catch (e) { console.warn("bayes: bad demo JSON", e); return null; } }
  function elFrom(h) { var d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; }

  // ----- CHAT (WhatsApp-style) -----
  function ChatDemo(slide) {
    var thread = slide.querySelector(".wa-thread"), sub = slide.querySelector(".wa-sub");
    var nodes = [].slice.call(slide.querySelectorAll(".bpmn-node")), toggle = slide.querySelector(".dc-toggle"), replay = slide.querySelector(".dc-replay");
    var data = readJSON(slide.querySelector(".demo-data")) || {}, pay = data.pay || { provider: "Mobile Money", host: "" };
    var timers = [], idx = 0, playing = false, started = false, done = false;
    function script() { return data[lang] || data[LANGS[0]] || []; }
    function t(ms) { return new Promise(function (r) { var id = setTimeout(r, ms); timers.push(id); }); }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function bottom() { thread.scrollTop = thread.scrollHeight; }
    function add(n) { thread.appendChild(n); bottom(); return n; }
    function now() { return "9:4" + (1 + Math.min(8, idx)); }
    function bp(i) { nodes.forEach(function (n, k) { n.classList.toggle("active", k === i); n.classList.toggle("done", i > -1 && k < i); }); }
    function wt(extra) { return '<span class="wt">' + now() + (extra || "") + "</span>"; }
    function tool(s, fin) { return '<div class="wa-tool"><div class="tt-head"><span class="tt-name"><span class="tt-ico">⚡</span>' + s.name + '</span><span class="tt-st" style="color:' + (fin ? "var(--ok)" : "var(--muted)") + '">' + (fin ? ui("ok") : ui("running")) + '</span></div><div class="tt-arg">{ <span class="k">' + s.arg + '</span> }</div>' + (fin ? '<div class="tt-res" style="display:flex"><span>✓</span> ' + s.result + "</div>" : '<div class="tt-res" style="display:none"></div>') + "</div>"; }
    function fill(s) { return '<div class="wa-fill"><div class="wf-head"><span class="wf-title">' + ui("autofill") + '</span><span class="wf-src">' + s.src + "</span></div>" + s.rows.map(function (r, i) { return '<div class="wf-row" style="animation-delay:' + (i * .18) + 's"><span class="wf-k">' + r[0] + '</span><span class="wf-v">' + r[1] + ' <span class="wf-badge auto">auto</span></span></div>'; }).join("") + "</div>"; }
    function voiceBars() { var b = ""; for (var i = 0; i < 26; i++) b += '<i style="height:' + (4 + Math.round(Math.abs(Math.sin(i * 1.7)) * 16)) + 'px"></i>'; return b; }
    function dossier(s) { return '<div class="wa-dossier"><div class="wd-top"><div><div class="wd-lab">' + ui("compiled") + '</div><div class="wd-num">' + s.num + '</div></div><span class="wd-stamp">' + ui("compiledStamp") + '</span></div><div class="wd-rows">' + s.rows.map(function (r) { return "<div><span>" + r[0] + "</span><b>" + r[1] + "</b></div>"; }).join("") + "</div></div>"; }
    function paylink(s, fin) { return '<div class="wa-pay"><div class="wa-pay-top"><span class="wa-pay-logo">' + pay.provider + '</span><span class="wa-pay-secure">' + ui("payUnique") + '</span></div><div class="wa-pay-body"><div class="wa-pay-amt">' + s.amount + '</div><div class="wa-pay-ref">' + s.ref + '</div><div class="wa-pay-btn' + (fin ? " paid" : "") + '">' + (fin ? ui("paid") : ui("payNow")) + '</div><div class="wa-pay-url">' + (pay.host || "") + s.code + "</div></div></div>"; }
    async function render(s) {
      if (s.bp != null) bp(s.bp);
      if (s.type === "in") { var n = add(elFrom('<div class="wa-typing"><span></span><span></span><span></span></div>')); await t(750); if (n.parentNode) n.remove(); add(elFrom('<div class="wb in">' + s.text + wt() + "</div>")); }
      else if (s.type === "out") add(elFrom('<div class="wb out' + (s.digits ? " mono-digits" : "") + '">' + s.text + wt('<span class="ck">✓✓</span>') + "</div>"));
      else if (s.type === "tool") { var nd = add(elFrom(tool(s, false))); await t(900); var st = nd.querySelector(".tt-st"); st.textContent = ui("ok"); st.style.color = "var(--ok)"; var r = nd.querySelector(".tt-res"); r.style.display = "flex"; r.innerHTML = "<span>✓</span> " + s.result; bottom(); }
      else if (s.type === "fill") add(elFrom(fill(s)));
      else if (s.type === "voice") { var n2 = add(elFrom('<div class="wb out voice"><span class="v-play">▶</span><span class="v-wave">' + voiceBars() + '</span><span class="v-dur">' + s.dur + '</span><span class="wt" style="position:absolute;right:8px;bottom:2px">' + now() + '<span class="ck">✓✓</span></span></div>')); var w = n2.querySelectorAll(".v-wave i"); for (var j = 0; j < w.length; j++) (function (b, d) { var id = setTimeout(function () { b.classList.add("played"); }, 70 * d); timers.push(id); })(w[j], j); await t(1900); add(elFrom('<div class="v-transcript">« ' + s.transcript + ' » <b>· ' + ui("transcribed") + "</b></div>")); bottom(); }
      else if (s.type === "dossier") add(elFrom(dossier(s)));
      else if (s.type === "paylink") { var p = add(elFrom(paylink(s, false))); await t(1400); var b = p.querySelector(".wa-pay-btn"); if (b) { b.textContent = ui("paid"); b.classList.add("paid"); } bottom(); }
      else if (s.type === "notif") add(elFrom('<div class="wa-notif"><span class="nt-tag">' + s.tag + '</span><div>' + s.text + "</div></div>"));
    }
    function hold(s) { return { tool: 1700, fill: 1900, voice: 2600, dossier: 2000, paylink: 2100, notif: 1500, out: 950 }[s.type] || 1250; }
    async function tick() { if (!playing) return; var sc = script(); if (idx >= sc.length) { fin(); return; } var s = sc[idx++]; if (s.type === "in" && sub) sub.textContent = ui("typing"); await render(s); if (sub) sub.textContent = ui("online"); if (!playing) return; var id = setTimeout(tick, hold(s)); timers.push(id); }
    function fin() { playing = false; done = true; bp(-1); nodes.forEach(function (n) { n.classList.add("done"); }); if (toggle) toggle.textContent = ui("restart"); if (sub) sub.textContent = ui("online"); }
    function reset() { clear(); idx = 0; done = false; thread.innerHTML = '<div class="wa-day">' + ui("today") + "</div>"; bp(0); if (sub) sub.textContent = ui("online"); }
    function start() { if (started && !done && playing) return; if (!started || done) reset(); started = true; playing = true; if (toggle) toggle.textContent = ui("pause"); var id = setTimeout(tick, 500); timers.push(id); }
    function pause() { playing = false; clear(); if (!done && toggle) toggle.textContent = ui("play"); }
    if (toggle) toggle.addEventListener("click", function () { if (playing) pause(); else { if (done) reset(); playing = true; started = true; toggle.textContent = ui("pause"); var id = setTimeout(tick, 200); timers.push(id); } });
    if (replay) replay.addEventListener("click", function () { pause(); reset(); start(); });
    if (thread) thread.addEventListener("click", function () { pause(); var sc = script(); if (idx < sc.length) { playing = true; tick(); playing = false; } });
    function renderFinal() { clear(); idx = 0; thread.innerHTML = '<div class="wa-day">' + ui("today") + "</div>"; var sc = script(); sc.forEach(function (s) { idx++; var h = s.type === "in" ? '<div class="wb in">' + s.text + wt() + "</div>" : s.type === "out" ? '<div class="wb out' + (s.digits ? " mono-digits" : "") + '">' + s.text + wt('<span class="ck">✓✓</span>') + "</div>" : s.type === "tool" ? tool(s, true) : s.type === "fill" ? fill(s) : s.type === "voice" ? '<div class="wb out voice"><span class="v-play">▶</span><span class="v-wave">' + voiceBars().replace(/class=/g, 'class="played" data-x=') + '</span><span class="v-dur">' + s.dur + "</span></div><div class=\"v-transcript\">« " + s.transcript + " » <b>· " + ui("transcribed") + "</b></div>" : s.type === "dossier" ? dossier(s) : s.type === "paylink" ? paylink(s, true) : s.type === "notif" ? '<div class="wa-notif"><span class="nt-tag">' + s.tag + '</span><div>' + s.text + "</div></div>" : ""; if (h) { var wrap = document.createElement("div"); wrap.innerHTML = h; while (wrap.firstChild) thread.appendChild(wrap.firstChild); } }); nodes.forEach(function (n) { n.classList.add("done"); }); }
    return { start: start, pause: pause, setLang: function () { pause(); started = false; reset(); }, renderFinal: renderFinal };
  }

  // ----- COPILOT (back-office NL → sourced answer + pipeline) -----
  function CopilotDemo(slide) {
    var body = slide.querySelector(".cp-body"), db = slide.querySelector(".pl-stage.db"), panel = slide.querySelector(".copilot");
    var data = readJSON(slide.querySelector(".demo-data")) || {}, meta = data.meta || {};
    var timers = [], i = 0, playing = false;
    function ex() { return data[lang] || data[LANGS[0]] || []; }
    function who() { return pick(meta.who) || ui("who"); }
    function searchLabel() { return pick(meta.search) || ui("search"); }
    function name() { return pick(meta.name) || ui("copilot"); }
    function t(ms) { return new Promise(function (r) { var id = setTimeout(r, ms); timers.push(id); }); }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    async function stream(node, text) { node.classList.add("streaming"); node.textContent = ""; var w = text.split(" "); for (var k = 0; k < w.length; k++) { if (!playing) { node.classList.remove("streaming"); return; } node.textContent += (k ? " " : "") + w[k]; await t(42); } node.classList.remove("streaming"); }
    function ansHTML(e, full) { return '<div class="cp-a"><div class="cp-a-head"><svg class="mark"><use href="#bi-mark"/></svg>' + name() + '</div><div class="cp-a-txt">' + (full ? e.a : "") + '</div><div class="cp-cites">' + (full ? e.s.map(function (c) { return '<span class="cp-cite">' + c + "</span>"; }).join("") : "") + "</div></div>"; }
    async function run(e) {
      body.innerHTML = "";
      body.appendChild(elFrom('<div class="cp-q"><span class="cp-who">' + who() + '</span>' + e.q + "</div>"));
      await t(750); if (!playing) return;
      var tool = elFrom('<div class="cp-tool"><span class="cp-tool-ico">⌕</span><span>' + searchLabel() + '</span><span class="cp-tool-arg">{ ' + e.arg + ' }</span><span class="cp-tool-st">…</span></div>');
      body.appendChild(tool); if (db) db.classList.add("searching");
      await t(1150); if (!playing) return; tool.classList.add("done"); tool.querySelector(".cp-tool-st").innerHTML = "✓ " + e.res;
      await t(450); if (!playing) return;
      var a = elFrom(ansHTML(e, false)); body.appendChild(a);
      await stream(a.querySelector(".cp-a-txt"), e.a); if (!playing) return;
      var cites = a.querySelector(".cp-cites"); for (var k = 0; k < e.s.length; k++) { if (!playing) return; await t(320); cites.appendChild(elFrom('<span class="cp-cite">' + e.s[k] + "</span>")); }
      if (db) db.classList.remove("searching");
    }
    async function tick() { if (!playing) return; var e = ex(); if (!e.length) return; await run(e[i % e.length]); if (!playing) return; i = (i + 1) % e.length; var id = setTimeout(tick, 2800); timers.push(id); }
    function start() { if (playing) return; playing = true; var id = setTimeout(tick, 350); timers.push(id); }
    function pause() { playing = false; clear(); if (db) db.classList.remove("searching"); }
    if (panel) panel.addEventListener("click", function () { if (playing) pause(); else start(); });
    function renderFinal() { var e = ex(); if (!e.length) return; var x = e[0]; body.innerHTML = '<div class="cp-q"><span class="cp-who">' + who() + '</span>' + x.q + "</div>" + '<div class="cp-tool done"><span class="cp-tool-ico">⌕</span><span>' + searchLabel() + '</span><span class="cp-tool-arg">{ ' + x.arg + ' }</span><span class="cp-tool-st">✓ ' + x.res + "</span></div>" + ansHTML(x, true); }
    return { start: start, pause: pause, setLang: function () { pause(); i = 0; if (body) body.innerHTML = ""; }, renderFinal: renderFinal };
  }

  var DEMOS = { chat: ChatDemo, copilot: CopilotDemo };

  /* ---------------- top nav (logo backlink · label · language · PDF) ---------------- */
  var LANG_NAMES = { fr: "Français", en: "English", es: "Español", de: "Deutsch", it: "Italiano", pl: "Polski" };
  function setLang(l) {
    lang = l; localStorage.setItem("bayesLang", l); applyLang();
    if (langCurEl) langCurEl.textContent = l.toUpperCase();
    langBtns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-l") === l); });
    Believe.lang();
    for (var k in DEMOS) { if (/^\d+$/.test(k) && DEMOS[k].setLang) DEMOS[k].setLang(); }
    enter(cur);
  }
  (function buildNav() {
    navEl = document.createElement("nav"); navEl.className = "nav";
    var home = document.createElement("a"); home.className = "nav-home";
    home.href = "https://www.bayesimpact.org"; home.target = "_blank"; home.rel = "noopener"; home.title = "bayesimpact.org";
    if (LOGO) { logoEl = document.createElement("img"); logoEl.src = LOGO; logoEl.alt = "Bayes Impact"; home.appendChild(logoEl); }
    else { home.innerHTML = '<svg width="22" height="22" viewBox="0 0 415 410" aria-label="Bayes Impact"><use href="#bi-mark"/></svg>'; }
    navEl.appendChild(home);

    var fr = document.body.getAttribute("data-label-fr"), en = document.body.getAttribute("data-label-en");
    var label = document.createElement("span"); label.className = "nav-sep";
    label.textContent = pick({ fr: fr || "BAYES · DÉMO", en: en || "BAYES · DEMO" });
    navEl.appendChild(label);

    var spacer = document.createElement("div"); spacer.className = "nav-spacer"; navEl.appendChild(spacer);

    var back = document.createElement("a"); back.className = "nav-back";
    back.href = "https://www.bayesimpact.org"; back.target = "_blank"; back.rel = "noopener";
    back.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 9 4 6l3.5-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>bayesimpact.org</span>';
    navEl.appendChild(back);

    if (LANGS.length > 1) {
      var lc = document.createElement("div"); lc.className = "nav-btn lang-toggle"; lc.tabIndex = 0; lc.setAttribute("aria-label", "Language");
      lc.innerHTML =
        '<svg class="lang-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
        '<span class="lang-current">' + lang.toUpperCase() + '</span>' +
        '<svg class="lang-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      langCurEl = lc.querySelector(".lang-current");
      var menu = document.createElement("div"); menu.className = "lang-menu"; menu.setAttribute("role", "menu");
      LANGS.forEach(function (l) {
        var b = document.createElement("button"); b.type = "button"; b.setAttribute("data-l", l);
        b.textContent = LANG_NAMES[l] || l.toUpperCase(); if (l === lang) b.className = "active";
        b.addEventListener("click", function (e) { e.stopPropagation(); setLang(l); lc.classList.remove("open"); });
        menu.appendChild(b); langBtns.push(b);
      });
      lc.appendChild(menu);
      lc.addEventListener("click", function () { lc.classList.toggle("open"); });
      document.addEventListener("click", function (e) { if (!lc.contains(e.target)) lc.classList.remove("open"); });
      navEl.appendChild(lc);
    }

    var pdf = document.createElement("button"); pdf.type = "button"; pdf.className = "pdf-btn"; pdf.title = "PDF"; pdf.setAttribute("aria-label", "Save as PDF");
    pdf.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h9l3 3v3"/><rect x="6" y="13" width="12" height="8" rx="1"/><path d="M6 17H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/></svg><span>PDF</span>';
    pdf.addEventListener("click", function () { preparePrint(); setTimeout(function () { window.print(); }, 60); });
    document.body.appendChild(pdf);   // bottom-right corner control, not a flex child of the nav

    document.body.appendChild(navEl);
  })();

  function preparePrint() {
    slides.forEach(function (s, i) {
      s.classList.add("show");
      if (!s.querySelector(".print-mark")) {
        var src = s.hasAttribute("data-dark") ? LOGO_DARK : LOGO;
        if (src) { var m = document.createElement("img"); m.className = "print-mark"; m.src = src; m.alt = "Bayes Impact"; s.appendChild(m); }
      }
    });
    for (var k in DEMOS) { if (/^\d+$/.test(k) && DEMOS[k].renderFinal) DEMOS[k].renderFinal(); }
  }
  // instantiate demos so renderFinal exists, then prepare on native print (Cmd/Ctrl-P)
  window.addEventListener("beforeprint", function () { slides.forEach(function (s, i) { var d = s.getAttribute("data-demo"); if (d && DEMOS[d] && !DEMOS[i + ""]) DEMOS[i + ""] = DEMOS[d](s); }); preparePrint(); });

  /* ---------------- boot ---------------- */
  Believe.start();
  window.addEventListener("load", function () {
    var h = location.hash.replace("#", ""); if (h) { var t = document.getElementById(h); if (t && slides.indexOf(t) > -1) { cur = slides.indexOf(t); t.scrollIntoView(); } }
    slides[cur].classList.add("show"); chrome(); enter(cur);
  });
})();
