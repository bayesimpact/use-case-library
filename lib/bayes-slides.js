/* =============================================================================
   Bayes Demos — shared slide library (lib/bayes-slides.js)
   ---------------------------------------------------------------------------
   Canonical, bilingual Bayes slides. A deck includes one with a placeholder:

       <div data-shared="about"></div>
       <div data-shared="earth">
         <script type="application/json">{ "lead": {"fr":"…","en":"…"} }</script>
       </div>

   bayes.js replaces the placeholder with the section below. Edit a slide HERE and
   every deck that includes it updates. To OVERRIDE for one deck, don't use the
   placeholder — write your own <section> (e.g. Togo's GouvAI-specific cover).
   To CUSTOMISE a shared slide, pass options via the inner JSON (see each fn).

   All copy is inline FR+EN (data-lang spans). Keep it that way.
   ========================================================================== */
(function () {
  "use strict";
  var A = document.body.getAttribute("data-assets") || "../../assets/";
  if (A && A.slice(-1) !== "/") A += "/";
  function bi(fr, en) { return '<span data-lang="fr">' + fr + '</span><span data-lang="en">' + (en == null ? fr : en) + "</span>"; }
  function L(o, k) { return o && o[k] ? o[k] : null; }          // optional {fr,en} override
  function pair(o, dfr, den) { return o ? bi(o.fr || dfr, o.en || den) : bi(dfr, den); }

  /* simple inline icons (no external deps) */
  var IC = {
    form: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-3.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8Z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6l-9-4Z"/><path d="m9 12 2 2 4-4"/></svg>',
    db: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>'
  };
  function winbar(title, tag) {
    return '<div class="win-bar"><div class="win-dots"><i></i><i></i><i></i></div><div class="win-title">' + title +
      "</div>" + (tag ? '<div class="win-tag">' + tag + "</div>" : "") + "</div>";
  }

  var S = {};

  /* ---- COVER / standard Bayes hero ------------------------------------------
     opts: { eyebrow?:{fr,en}, title?:{fr,en}, sub?:{fr,en},
             chips?:[{fr,en}], foot?:{fr,en} }
     Defaults to generic Bayes Platform copy; override any field via JSON. */
  S.cover = function (o) {
    o = o || {};
    var eye = pair(L(o, "eyebrow"), "Bayes Platform", "Bayes Platform");
    var ttl = pair(L(o, "title"),
      "La plateforme d’IA pour le service public.",
      "The AI platform for public services.");
    var sub = pair(L(o, "sub"),
      "La plateforme open-source d’agents IA, pour le service public.",
      "The open-source AI agent platform, built for public services.");
    var chips = (o.chips || []).map(function (c) {
      return '<div class="chip"><span class="dot-ok"></span> ' + bi(c.fr, c.en) + "</div>";
    }).join("");
    var footLeft = pair(L(o, "foot"), "Bayes Impact", "Bayes Impact");
    var logo = A + "logos/bi-white.svg";
    return '<section class="slide dark cover" id="cover" data-dark>' +
      '<div class="slide-inner">' +
        '<div class="cover-mark reveal"><img class="bilogo" src="' + logo + '" alt="Bayes Impact"/></div>' +
        '<p class="eyebrow reveal">' + eye + "</p>" +
        '<h1 class="reveal">' + ttl + "</h1>" +
        '<p class="sub reveal">' + sub + "</p>" +
        (chips ? '<div class="chips reveal">' + chips + "</div>" : "") +
      "</div>" +
      '<div class="cover-foot">' + footLeft + '<span class="cf-r">Bayes Impact · 2026</span></div>' +
      "</section>";
  };

  /* ---- EARTH / vision hero --------------------------------------------------
     opts: { eyebrow?, lead?:{fr,en}, believe?:{fr:[…],en:[…]} } */
  S.earth = function (o) {
    o = o || {};
    var believe = o.believe || {
      fr: ["chacun reçoit l'aide dont il a besoin.", "l'administration parle la langue de chacun.",
           "un agent public n'est jamais seul face à la complexité.", "la technologie sert d'abord l'intérêt général."],
      en: ["everyone receives the help they need.", "public services speak everyone's language.",
           "no public servant faces complexity alone.", "technology serves the common good first."]
    };
    var lead = pair(o.lead,
      "L'IA pour aider celles et ceux qui en ont besoin, et celles et ceux qui les accompagnent.",
      "AI to empower people in need and those who help them.");
    return '<section class="slide dark earth" id="earth" data-dark>' +
      '<div class="slide-inner"><div class="hero believe-box" id="believeBox">' +
        '<div class="hero-txt">' +
          '<h1 class="believe">' + bi("Nous croyons en un monde où", "We believe in a world where") +
            '<span class="believe-cycle" id="believeCycle"></span></h1>' +
          '<p class="lead">' + lead + "</p>" +
        "</div>" +
        '<div class="hero-planet"><div class="planet-wrap"><img src="' + A + 'planet.webp" alt="Earth"/>' +
          '<div class="planet-orbit" id="planetOrbit"></div></div></div>' +
      "</div></div>" +
      '<script type="application/json" class="believe-data">' + JSON.stringify(believe) + "<\/script>" +
      "</section>";
  };

  /* ---- ABOUT / who we are (identical across decks) -------------------------- */
  S.about = function (o) {
    o = o || {};
    return '<section class="slide" id="about"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("QUI SOMMES-NOUS", "WHO WE ARE") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "L'IA pour <em class=\"hl\">aider</em> celles et ceux qui en ont besoin, et celles et ceux qui les accompagnent.",
        "AI to <em class=\"hl\">empower</em> people in need and those who help them.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Bayes Impact est une organisation à but non lucratif fondée dans la Silicon Valley en 2014. Nous construisons des technologies open-source au service de l'intérêt général, déjà utilisées par des millions de personnes sur trois continents.",
        "Bayes Impact is a nonprofit founded in Silicon Valley in 2014. We build open-source technology for the public good, already used by millions of people across three continents.") + "</p>" +
      '<div class="chips reveal">' +
        '<div class="chip"><b>2014</b> ' + bi("Silicon Valley", "Silicon Valley") + "</div>" +
        '<div class="chip"><b>3</b> ' + bi("continents", "continents") + "</div>" +
        '<div class="chip"><b>10M+</b> ' + bi("personnes aidées", "people served") + "</div>" +
        '<div class="chip"><span class="dot-ok"></span> ' + bi("open-source", "open-source") + "</div>" +
      "</div>" +
      '<div class="partners-grid reveal">' +
        '<img src="' + A + 'partners/google.webp" alt="Google.org"/>' +
        '<img src="' + A + 'partners/gates.webp" alt="Gates Foundation"/>' +
        '<img src="' + A + 'partners/yc.webp" alt="Y Combinator"/>' +
        '<img src="' + A + 'partners/france-travail.webp" alt="France Travail"/>' +
        '<img class="va" src="' + A + 'partners/va.svg" alt="U.S. Dept of Veterans Affairs"/>' +
      "</div>" +
      "</div></section>";
  };

  /* ---- CONTEXT / engagement-specific (optional, position 3 in partner decks) --
     opts: { partner?:{fr,en}, country?:{fr,en}, date?:"string",
             theme?:{fr,en}, bullets?:[{fr,en}] }
     Eyebrow = partner · country · date.  Theme = the meeting / project title.
     Bullets = agenda items (chips).  Omit any field you don't need. */
  S.context = function (o) {
    o = o || {};
    var p = o.partner, c = o.country, d = o.date || '';
    var eyeFr = [p && p.fr, c && c.fr, d].filter(Boolean).join(' · ');
    var eyeEn = [p && p.en, c && c.en, d].filter(Boolean).join(' · ');
    if (!eyeFr) { eyeFr = 'Contexte'; eyeEn = 'Context'; }
    var head = o.theme ? bi(o.theme.fr, o.theme.en) : bi('Notre démarche', 'Our approach');
    var chips = '';
    if (o.bullets && o.bullets.length) {
      chips = '<div class="chips reveal">' +
        o.bullets.map(function (b) { return '<div class="chip">' + bi(b.fr, b.en) + '</div>'; }).join('') +
        '</div>';
    }
    return '<section class="slide" id="context"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi(eyeFr, eyeEn) + '</div>' +
      '<h2 class="title reveal">' + head + '</h2>' +
      chips +
      '</div></section>';
  };

  /* ---- PLATFORM · overview -------------------------------------------------- */
  S["platform-overview"] = function () {
    return '<section class="slide" id="platform"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("LA BAYES PLATFORM", "THE BAYES PLATFORM") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "La plateforme d'IA <em class=\"hl\">pensée pour le service public</em>.",
        "The AI platform <em class=\"hl\">purpose-built for public services</em>.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Open-source et déployable sur votre infrastructure, avec une orchestration d'agents à l'état de l'art. Mais surtout : dix ans d'expérience du service public, intégrés dès la conception.",
        "Open-source and deployable on your own infrastructure, with state-of-the-art agent orchestration. But above all: ten years of public-service experience, built in from the ground up.") + "</p>" +
      '<div class="cards c3 reveal">' +
        '<div class="card"><div class="kicker">' + bi("SOUVERAIN", "SOVEREIGN") + "</div><h3>" +
          bi("Open-source, chez vous", "Open-source, in-house") + "</h3><p>" +
          bi("Hébergez la plateforme sur votre propre infrastructure. Vos données ne sortent jamais.",
             "Host the platform on your own infrastructure. Your data never leaves.") + "</p></div>" +
        '<div class="card"><div class="kicker">' + bi("ORCHESTRATION", "ORCHESTRATION") + "</div><h3>" +
          bi("Les meilleurs modèles", "State-of-the-art models") + "</h3><p>" +
          bi("Une orchestration multi-agents à l'état de l'art, indépendante de tout fournisseur de modèle.",
             "State-of-the-art multi-agent orchestration, independent of any single model provider.") + "</p></div>" +
        '<div class="card"><div class="kicker">' + bi("ADN SERVICE PUBLIC", "PUBLIC-SERVICE DNA") + "</div><h3>" +
          bi("Conçue pour l'intérêt général", "Built for the public good") + "</h3><p>" +
          bi("Dix ans aux côtés des services publics : observabilité, conformité et maîtrise des risques pensées dès l'origine.",
             "Ten years alongside public services: observability, compliance and risk control designed in from day one.") + "</p></div>" +
      "</div></div></section>";
  };

  /* ---- PLATFORM · no/low-code Studio + bias incident ------------------------ */
  S["platform-studio"] = function () {
    function agent(type, cls, ic, fr, en, sfr, sen) {
      return '<div class="agent-card ' + (cls || "") + '"><span class="ac-type">' + type + '</span>' +
        '<div class="ac-name">' + ic + bi(fr, en) + "</div>" +
        '<div class="ac-meta">' + bi(sfr, sen) + "</div></div>";
    }
    return '<section class="slide" id="platform-studio"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("STUDIO · SANS CODE", "STUDIO · NO-CODE") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Les experts métier <em class=\"hl\">créent leurs propres agents</em>.",
        "Domain experts <em class=\"hl\">build their own agents</em>.") + "</h2>" +
      '<div class="split reveal">' +
        "<div>" +
          '<p class="lead">' + bi(
            "Pas besoin d'être ingénieur. Le Studio gère le découpage documentaire, l'indexation et l'atténuation des biais : les détails techniques où une erreur coûte cher.",
            "No engineering required. The Studio handles document chunking, indexing and bias mitigation, the technical details where a mistake is costly.") + "</p>" +
          '<div class="incident">' +
            '<div class="inc-ico">!</div><div>' +
              '<div class="inc-src">' + bi("INCIDENT IA · OECD.AI · 2024", "AI INCIDENT · OECD.AI · 2024") + "</div>" +
              '<div class="inc-head">' + bi(
                "Un chatbot d'emploi public reproduit des biais de genre",
                "A public employment chatbot reproduced gender bias") + "</div>" +
              '<div class="inc-sub">' + bi(
                "Hommes orientés vers l'ingénierie, femmes vers l'hôtellerie. Un RAG mal calibré en production : précisément ce que la plateforme prévient par défaut.",
                "Men steered toward engineering, women toward hospitality. A miscalibrated RAG in production: precisely what the platform prevents by default.") + "</div>" +
            "</div></div>" +
        "</div>" +
        '<div class="win">' + winbar(bi("Studio · Espace de travail", "Studio · Workspace"), "no-code") +
          '<div class="win-body"><div class="agent-grid">' +
            agent("Form", "", IC.form, "Demande d'attestation", "Certificate request", "Formulaire guidé", "Guided form") +
            agent("Form", "", IC.form, "Prise de rendez-vous", "Appointment booking", "Formulaire guidé", "Guided form") +
            agent("Conversation", "conv", IC.chat, "Assistant éligibilité", "Eligibility assistant", "Conversationnel", "Conversational") +
            agent("Form", "", IC.form, "Signalement", "Report an issue", "Formulaire guidé", "Guided form") +
            agent("Conversation", "conv", IC.chat, "FAQ réglementaire", "Policy FAQ", "Conversationnel", "Conversational") +
            '<div class="agent-card new"><span class="ac-add"><span class="plus">+</span>' + bi("Nouvel agent", "New agent") + "</span>" +
              '<span style="font-size:11.5px">' + bi("sans une ligne de code", "without a line of code") + "</span></div>" +
          "</div></div>" +
        "</div>" +
      "</div></div></section>";
  };

  /* ---- PLATFORM · observability & process improvement ----------------------- */
  S["platform-observability"] = function () {
    var heights = [34, 52, 41, 68, 47, 83, 60, 72, 90, 64, 78, 96];
    var bars = heights.map(function (h) { return '<i style="height:' + h + '%"></i>'; }).join("");
    function topic(fr, en, pct, n, gap) {
      return '<div class="topic' + (gap ? " gap" : "") + '"><span>' + bi(fr, en) + "</span>" +
        '<div class="t-bar"><span style="width:' + pct + '%"></span></div>' +
        (gap ? '<span class="t-flag">' + bi("à enrichir", "needs docs") + "</span>"
             : '<span class="t-n">' + n + "</span>") + "</div>";
    }
    return '<section class="slide" id="platform-observability"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("OBSERVABILITÉ", "OBSERVABILITY") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Voir ce que vivent les usagers, et <em class=\"hl\">où renforcer</em>.",
        "See what citizens experience, and <em class=\"hl\">where to improve</em>.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Chaque conversation alimente des métriques : volume, sujets les plus fréquents, et surtout les sujets où vos documents manquent de couverture.",
        "Every conversation feeds metrics: volume, top topics, and crucially the topics where your documents lack coverage.") + "</p>" +
      '<div class="win reveal">' + winbar(bi("Analytique", "Analytics"), bi("30 derniers jours", "last 30 days")) +
        '<div class="win-body"><div class="metric-grid">' +
          '<div class="metric"><div class="m-lab">' + bi("Conversations / jour", "Conversations / day") + "</div>" +
            '<div class="m-big">2,4k</div><div class="bars">' + bars + "</div></div>" +
          '<div class="metric"><div class="m-lab">' + bi("Sujets · couverture documentaire", "Topics · document coverage") + "</div>" +
            '<div class="topics" style="margin-top:12px">' +
              topic("Pièces justificatives", "Required documents", 88, "1 204", false) +
              topic("Délais de traitement", "Processing times", 71, "842", false) +
              topic("Prise de rendez-vous", "Appointments", 63, "610", false) +
              topic("Recours & contestation", "Appeals & disputes", 26, "", true) +
            "</div></div>" +
        "</div></div></div>" +
      "</div></section>";
  };

  /* ---- PLATFORM · compliance & sandboxed connectors (MCP) -------------------- */
  S["platform-compliance"] = function () {
    function chip(fr, en, dark) {
      var st = dark
        ? "background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:#fff;"
        : "background:var(--cream);border:1px solid var(--border-soft);color:var(--ink-soft);";
      return '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10.5px;font-weight:600;padding:5px 10px;border-radius:7px;' + st + '">' + bi(fr, en) + "</span>";
    }
    function lab(fr, en, col) {
      return '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:' + col + ';margin-bottom:9px;">' + bi(fr, en) + "</div>";
    }
    return '<section class="slide" id="platform-compliance"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("L'ARCHITECTURE", "THE ARCHITECTURE") + "</div>" +
      '<h2 class="title reveal" style="max-width:24ch">' + bi(
        "Le système d'exploitation du <em class=\"hl\">service public agentique</em>.",
        "The operating system of the <em class=\"hl\">agentic public service</em>.") + "</h2>" +
      '<p class="lead reveal" style="max-width:62ch">' + bi(
        "La Bayes Platform s'installe par-dessus vos fondations : les systèmes d'information du service public. Tout reste chez vous ; la donnée ne sort jamais.",
        "The Bayes Platform sits on top of your foundations: the information systems of the public sector. Everything stays in-house; data never leaves.") + "</p>" +
      '<div class="reveal" style="display:flex;flex-direction:column;max-width:880px;margin-top:16px;">' +
        '<div style="background:var(--card);border:1px solid var(--border-soft);border-radius:14px;padding:13px 18px;">' +
          lab("Vos agents &amp; applications", "Your agents &amp; apps", "var(--muted)") +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + chip("Copilote clinicien", "Clinician copilot") + chip("Assistant citoyen", "Citizen assistant") + chip("Analytique métier", "Business analytics") + chip("↔ DPI / études", "↔ EHR / studies") + "</div>" +
        "</div>" +
        '<div style="text-align:center;color:var(--border-soft);font-size:15px;padding:5px 0;">↑</div>' +
        '<div style="background:var(--ink);color:#fff;border-radius:14px;padding:15px 18px;box-shadow:0 0 0 2px rgba(255,132,0,.16), var(--shadow);">' +
          lab("Bayes Platform · l'OS agentique", "Bayes Platform · the agentic OS", "var(--accent-orange)") +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + chip("Orchestration multi-agents", "Multi-agent orchestration", 1) + chip("Ancrage &amp; protocoles", "Grounding &amp; protocols", 1) + chip("Garde-fous &amp; conformité", "Guardrails &amp; compliance", 1) + chip("Observabilité", "Observability", 1) + chip("No-code", "No-code", 1) + "</div>" +
        "</div>" +
        '<div style="text-align:center;padding:5px 0;"><span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;font-weight:700;color:var(--ink-soft);background:var(--cream);border:1px solid var(--border-soft);border-radius:999px;padding:5px 13px;">↑ ' + bi("la donnée ne sort jamais", "data never leaves") + "</span></div>" +
        '<div style="background:var(--cream);border:1.5px dashed var(--border-soft);border-radius:14px;padding:13px 18px;">' +
          lab("Vos fondations · les SI du service public", "Your foundations · public-sector IS", "var(--muted)") +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + chip("Ministères", "Ministries") + chip("DPI / EHR", "EHR") + chip("Back-offices", "Back-offices") + chip("Bases métier", "Business databases") + chip("Hébergé chez vous · sécurisé", "Hosted in-house · secured") + "</div>" +
        "</div>" +
      "</div></div></section>";
  };

  /* ---- PLATFORM · privacy / compliance (PII detection + pseudonymization) ---- */
  S["platform-privacy"] = function () {
    function pii(s) { return '<mark style="background:rgba(216,54,45,.14);color:#b3261e;border-radius:3px;padding:0 4px;font-weight:600;">' + s + "</mark>"; }
    function tok(s) { return '<span style="font-family:\'JetBrains Mono\',monospace;font-size:11.5px;background:var(--card);border:1px solid var(--border-soft);border-radius:4px;padding:1px 5px;color:var(--accent-blue);">' + s + "</span>"; }
    function comp(fr, en) { return '<div class="chip"><span class="dot-ok"></span> ' + bi(fr, en) + "</div>"; }
    return '<section class="slide" id="platform-privacy"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("CONFORMITÉ & VIE PRIVÉE", "COMPLIANCE & PRIVACY") + "</div>" +
      '<h2 class="title reveal" style="max-width:26ch">' + bi(
        "Pensé conformité, <em class=\"hl\">vie privée par défaut</em>.",
        "Built for compliance, <em class=\"hl\">private by design</em>.") + "</h2>" +
      '<p class="lead reveal" style="max-width:64ch">' + bi(
        "Avant même que le LLM ne voie la donnée, les informations personnelles sont détectées et pseudonymisées. Notre service de détection est open-source, à l'état de l'art.",
        "Before the LLM even sees the data, personal information is detected and pseudonymized. Our detection service is open-source and state-of-the-art.") + "</p>" +
      '<div class="win reveal" style="max-width:880px">' + winbar(bi("Détection PII + pseudonymisation · avant le LLM", "PII detection + pseudonymization · before the LLM"), "open-source") +
        '<div class="win-body" style="font-size:13.5px;line-height:1.7;color:var(--ink-soft);">' +
          '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:5px;">' + bi("Entrée", "Input") + "</div>" +
          "<div>M. " + pii("Romaric Agbagla") + ", " + bi("né le", "born") + " " + pii("12/03/1984") + ", n° " + pii("4827 1593 0641") + ", " + bi("tél.", "tel.") + " " + pii("06 12 34 56 78") + "…</div>" +
          '<div style="text-align:center;color:var(--accent-orange);font-weight:800;margin:9px 0;">↓ ' + bi("détection + pseudonymisation", "detect + pseudonymize") + "</div>" +
          '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:5px;">' + bi("Envoyé au LLM", "Sent to the LLM") + "</div>" +
          "<div>M. " + tok("⟨PERSON⟩") + ", " + bi("né le", "born") + " " + tok("⟨DATE⟩") + ", n° " + tok("⟨ID⟩") + ", " + bi("tél.", "tel.") + " " + tok("⟨PHONE⟩") + "…</div>" +
          '<div style="margin-top:11px;font-size:11px;color:var(--muted);">' + bi("Entités : PERSON · DATE · ID · PHONE · EMAIL · LOCATION… · stratégies : remplacer, masquer, chiffrer.", "Entities: PERSON · DATE · ID · PHONE · EMAIL · LOCATION… · strategies: replace, mask, encrypt.") + "</div>" +
        "</div></div>" +
      '<div class="chips reveal" style="margin-top:16px;">' +
        comp("HDS", "HDS-certified") + comp("SOC 2", "SOC 2") + comp("ISO 27001", "ISO 27001") + comp("Private by design", "Private by design") + comp("On-premise", "On-premise") + comp("Chiffré au repos &amp; en transit", "Encrypted at rest &amp; in transit") + comp("Logs &amp; contrôle d'accès", "Logging &amp; access control") +
      "</div>" +
      '<p class="footnote reveal" style="margin-top:14px;">' + bi(
        "Détection PII open-source (Microsoft Presidio + ai4privacy + modèle eds-pseudo de l'AP-HP) : ",
        "Open-source PII detection (Microsoft Presidio + ai4privacy + AP-HP's eds-pseudo model): ") +
        '<a href="https://github.com/bayesimpact/privacy-service" target="_blank" rel="noopener" style="color:var(--accent-blue);font-weight:600;text-decoration:none;">github.com/bayesimpact/privacy-service</a></p>' +
      "</div></section>";
  };

  /* ---- PLATFORM · human review / evaluation --------------------------------- */
  S["platform-evaluation"] = function () {
    function rq(fr, en, tfr, ten, off) {
      return '<div class="rq"><span class="rq-q">' + bi(fr, en) + "</span>" +
        '<span class="rq-type">' + bi(tfr, ten) + "</span>" +
        '<span class="rq-toggle' + (off ? " off" : "") + '"></span></div>';
    }
    return '<section class="slide" id="platform-evaluation"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("ÉVALUATION HUMAINE", "HUMAN REVIEW") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Validé par des experts <em class=\"hl\">avant la mise en service</em>.",
        "Validated by experts <em class=\"hl\">before going live</em>.") + "</h2>" +
      '<div class="split reveal">' +
        "<div>" +
          '<p class="lead">' + bi(
            "Lancez des campagnes de revue : des testeurs interrogent l'agent, des relecteurs notent les réponses à l'aveugle. Vous mesurez la qualité avant d'ouvrir le service.",
            "Run review campaigns: testers query the agent, reviewers rate answers blind. You measure quality before opening the service.") + "</p>" +
          '<div class="chips"><div class="chip"><b>Blind</b> ' + bi("relecture", "review") + "</div>" +
            '<div class="chip"><span class="dot-ok"></span> ' + bi("testeurs + relecteurs", "testers + reviewers") + "</div></div>" +
        "</div>" +
        '<div class="win">' + winbar(bi("Campagne de revue", "Review campaign"), "active") +
          '<div class="win-body"><div class="review-q">' +
            rq("Le document fourni était-il le bon ?", "Was the right document returned?", "Choix unique", "Single choice", false) +
            rq("La réponse répond-elle à la question ?", "Did the answer address the question?", "Note 1–5", "Rating 1–5", false) +
            rq("Améliorations suggérées ?", "Suggested improvements?", "Texte libre", "Free text", true) +
          "</div></div>" +
        "</div>" +
      "</div></div></section>";
  };

  /* ---- PLATFORM · grounding (the MCP point, as a simple before/after) --------
     Why a public service must ground LLMs in its own protocols. Health example. */
  S["platform-grounding"] = function () {
    return '<section class="slide" id="platform-grounding"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("ANCRAGE · MCP + RAG", "GROUNDING · MCP + RAG") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Pourquoi ancrer l'IA dans <em class=\"hl\">vos protocoles</em>.",
        "Why ground AI in <em class=\"hl\">your own protocols</em>.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Un assistant généraliste répond de façon plausible, mais générique, parfois fausse pour votre contexte. Connectée à vos référentiels officiels, la même question reçoit la bonne réponse, sourcée.",
        "A general-purpose assistant answers plausibly, but generically, sometimes wrongly for your context. Connected to your official guidelines, the same question gets the right answer, with a source.") + "</p>" +
      '<div class="vs-compare reveal">' +
        '<div class="vs-col plain">' +
          '<div class="vs-tag">' + bi("Assistant IA généraliste", "General-purpose AI") + "</div>" +
          '<div class="vs-q">' + bi("Conduite à tenir devant une fièvre chez un nourrisson&nbsp;?", "What to do about a fever in an infant?") + "</div>" +
          '<div class="vs-a">' + bi("Surveillez la température, donnez du paracétamol et consultez un médecin si elle persiste.", "Monitor the temperature, give paracetamol, and see a doctor if it persists.") + "</div>" +
          '<div class="vs-flag warn">⚠ ' + bi("Plausible, sans source, et hors du protocole national.", "Plausible, unsourced, and off the national protocol.") + "</div>" +
        "</div>" +
        '<div class="vs-mid">vs</div>' +
        '<div class="vs-col grounded">' +
          '<div class="vs-tag ok">' + bi("Bayes Platform · ancrée", "Bayes Platform · grounded") + "</div>" +
          '<div class="vs-q">' + bi("Conduite à tenir devant une fièvre chez un nourrisson&nbsp;?", "What to do about a fever in an infant?") + "</div>" +
          '<div class="vs-a">' + bi("Avant 3 mois, toute fièvre impose une consultation en urgence, conformément au protocole national.", "Under 3 months, any fever requires urgent medical review, per the national protocol.") + "</div>" +
          '<div class="vs-flag ok">✓ ' + bi("Protocole officiel (HAS) cité · vérifiable.", "Official guideline (HAS) cited · verifiable.") + "</div>" +
        "</div>" +
      "</div>" +
      '<p class="footnote reveal">' + bi(
        "À titre illustratif. C'est l'enjeu du service public : une réponse générique peut être dangereuse. L'agent doit suivre vos protocoles, pas le web ouvert.",
        "Illustrative. This is the public-service stakes: a generic answer can be dangerous. The agent must follow your protocols, not the open web.") + "</p>" +
      "</div></section>";
  };

  /* ---- PLATFORM · sources (your documents + indexing status, RAG) ----------- */
  S["platform-sources"] = function () {
    function tier(n, labFr, labEn, fr, en, exFr, exEn) {
      var col = n === 1 ? "var(--accent-orange)" : "var(--muted)";
      return '<div style="display:flex;align-items:center;gap:14px;padding:11px 15px;border:1px solid var(--border-soft);border-radius:11px;background:var(--cream);margin-bottom:9px;">' +
        '<span style="flex:0 0 92px;font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:' + col + ';">' + bi("Niveau " + n + " · " + labFr, "Tier " + n + " · " + labEn) + "</span>" +
        '<div style="flex:1 1 auto;"><b style="color:var(--ink);font-size:13.5px;">' + bi(fr, en) + '</b><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.4;">' + bi(exFr, exEn) + "</div></div>" +
        "</div>";
    }
    return '<section class="slide" id="platform-sources"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("SOURCES · BASE DE CONNAISSANCES", "SOURCES · KNOWLEDGE BASE") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Pas un RAG générique : une base <em class=\"hl\">hiérarchique</em>.",
        "Not a generic RAG: a <em class=\"hl\">hierarchical</em> knowledge base.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "L'agent ne pioche pas au hasard. Les sources sont hiérarchisées par autorité, re-classées (reranking) et réconciliées selon des règles propres à votre domaine.",
        "The agent doesn't pick at random. Sources are ranked by authority, reranked, and reconciled by rules specific to your domain.") + "</p>" +
      '<div class="win reveal" style="max-width:880px">' + winbar(bi("Base de connaissances", "Knowledge base"), "RAG+") +
        '<div class="win-body">' +
          tier(1, "Autorité", "Authority", "Référentiels officiels", "Official guidelines", "HAS · ministère · gouvernement · recommandations nationales", "HAS · ministry · government · national recommendations") +
          tier(2, "Référence", "Reference", "Littérature &amp; corpus de référence", "Literature &amp; reference corpus", "publications, revue de littérature, données probantes", "publications, literature review, evidence base") +
          tier(3, "Local", "Local", "Protocoles locaux", "Local protocols", "par établissement et par service : vos propres procédures", "per establishment and service: your own procedures") +
          '<div style="display:flex;align-items:center;gap:11px;margin-top:12px;padding:11px 15px;border-radius:11px;background:var(--ink);color:#fff;">' +
            '<span style="color:var(--accent-orange);font-weight:800;font-size:15px;flex:0 0 auto;">⇅</span>' +
            '<div style="font-size:12.5px;line-height:1.45;"><b>' + bi("Reranking + règles de réconciliation", "Reranking + reconciliation rules") + "</b> : " + bi("l'agent compose la réponse, source et niveau cités. En cas de conflit, l'autorité supérieure et vos règles locales priment.", "the agent composes the answer, with source and tier cited. On conflict, higher authority and your local rules win.") + "</div>" +
          "</div>" +
        "</div></div>" +
      '<p class="footnote reveal">' + bi(
        "Chaque réponse cite sa source et son niveau. Vous savez exactement sur quoi l'agent s'appuie.",
        "Every answer cites its source and tier. You know exactly what the agent relies on.") + "</p>" +
      "</div></section>";
  };

  /* ---- CLOSING / thank-you --------------------------------------------------
     opts: { tagline?:{fr,en} } */
  S.closing = function (o) {
    o = o || {};
    var tag = pair(o.tagline,
      "Construisons un futur positif ensemble.",
      "Let's build a positive future together.");
    var email = o.email || "hello@bayesimpact.org";
    return '<section class="slide dark cover" id="thanks" data-dark><div class="slide-inner">' +
      '<div class="cover-mark"><img class="bilogo" src="' + A + 'logos/bi-white.svg" alt="Bayes Impact"/></div>' +
      '<h1 class="big">' + bi("Merci !", "Thank you!") + "</h1>" +
      '<p class="tagline">' + tag + "</p>" +
      '<p class="thanks-contact"><a href="mailto:' + email + '">' + email + "</a></p>" +
      '<div class="cover-foot"><span>bayesimpact.org</span><span class="cf-r">Bayes Impact</span></div>' +
      "</div></section>";
  };

  window.BAYES_SLIDES = S;
})();
