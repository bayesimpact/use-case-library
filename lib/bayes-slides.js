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
      "Open-source, souveraine — déployée sur votre infrastructure.",
      "Open-source, sovereign — deployed on your infrastructure.");
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
      '<div class="cover-foot">' + footLeft + '<span class="cf-r">Bayes Impact — 2026</span></div>' +
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
      "L'IA pour aider celles et ceux qui en ont besoin — et celles et ceux qui les accompagnent.",
      "AI to empower people in need — and those who serve them.");
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
        "L'IA pour <em class=\"hl\">aider</em> celles et ceux qui en ont besoin — et celles et ceux qui les accompagnent.",
        "AI to <em class=\"hl\">empower</em> people in need — and those who serve them.") + "</h2>" +
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
      '<div class="eyebrow reveal">' + bi("STUDIO — SANS CODE", "STUDIO — NO-CODE") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Les experts métier <em class=\"hl\">créent leurs propres agents</em>.",
        "Domain experts <em class=\"hl\">build their own agents</em>.") + "</h2>" +
      '<div class="split reveal">' +
        "<div>" +
          '<p class="lead">' + bi(
            "Pas besoin d'être ingénieur. Le Studio gère le découpage documentaire, l'indexation et l'atténuation des biais — les détails techniques où une erreur coûte cher.",
            "No engineering required. The Studio handles document chunking, indexing and bias mitigation — the technical details where a mistake is costly.") + "</p>" +
          '<div class="incident">' +
            '<div class="inc-ico">!</div><div>' +
              '<div class="inc-src">' + bi("INCIDENT IA · OECD.AI · 2024", "AI INCIDENT · OECD.AI · 2024") + "</div>" +
              '<div class="inc-head">' + bi(
                "Un chatbot d'emploi public reproduit des biais de genre",
                "A public employment chatbot reproduced gender bias") + "</div>" +
              '<div class="inc-sub">' + bi(
                "Hommes orientés vers l'ingénierie, femmes vers l'hôtellerie. Un RAG mal calibré en production — précisément ce que la plateforme prévient par défaut.",
                "Men steered toward engineering, women toward hospitality. A miscalibrated RAG in production — precisely what the platform prevents by default.") + "</div>" +
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
        "Voir ce que vivent les usagers — et <em class=\"hl\">où renforcer</em>.",
        "See what citizens experience — and <em class=\"hl\">where to improve</em>.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Chaque conversation alimente des métriques : volume, sujets les plus fréquents, et surtout les sujets où vos documents manquent de couverture.",
        "Every conversation feeds metrics: volume, top topics, and crucially the topics where your documents lack coverage.") + "</p>" +
      '<div class="win reveal">' + winbar(bi("Analytique", "Analytics"), bi("30 derniers jours", "last 30 days")) +
        '<div class="win-body"><div class="metric-grid">' +
          '<div class="metric"><div class="m-lab">' + bi("Conversations / jour", "Conversations / day") + "</div>" +
            '<div class="m-big">2,4k</div><div class="bars">' + bars + "</div></div>" +
          '<div class="metric"><div class="m-lab">' + bi("Sujets — couverture documentaire", "Topics — document coverage") + "</div>" +
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
    function node(cls, ic, t, s) {
      return '<div class="conn-node ' + (cls || "") + '"><div class="cn-ico">' + ic + "</div>" +
        '<div class="cn-t">' + t + '</div><div class="cn-s">' + s + "</div></div>";
    }
    function guard(fr, en) { return '<span class="guard">' + bi(fr, en) + "</span>"; }
    return '<section class="slide" id="platform-compliance"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("CONFORMITÉ & PÉRIMÈTRE", "COMPLIANCE & GUARDRAILS") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Des agents qui <em class=\"hl\">respectent vos protocoles</em> et restent dans leur périmètre.",
        "Agents that <em class=\"hl\">follow your protocols</em> and stay within scope.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Via le protocole MCP, l'agent se connecte de façon encadrée aux back-offices de l'organisation — chaque accès est explicite, journalisé et révocable.",
        "Through the MCP protocol, the agent connects to the organization's back-offices in a sandboxed way — every access is explicit, logged and revocable.") + "</p>" +
      '<div class="conn-map reveal">' +
        node("", IC.spark, bi("Agent Bayes", "Bayes agent"), bi("guidé par vos référentiels", "guided by your guidelines")) +
        '<div class="conn-arrow"><b>MCP</b>⇄</div>' +
        node("mid", IC.shield, bi("Périmètre sécurisé", "Sandbox"), bi("accès explicite & journalisé", "explicit & logged access")) +
        '<div class="conn-arrow">⇄</div>' +
        node("", IC.db, bi("Back-offices", "Back-offices"), bi("vos systèmes métier", "your business systems")) +
      "</div>" +
      '<div class="guardrails reveal">' +
        guard("Réponses sourcées (RAG)", "Sourced answers (RAG)") +
        guard("Zéro hallucination", "Zero hallucination") +
        guard("Conforme aux guidelines", "Guideline-compliant") +
        guard("Accès révocables", "Revocable access") +
      "</div></div></section>";
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
        "Un assistant généraliste répond de façon plausible — mais générique, parfois fausse pour votre contexte. Connectée à vos référentiels officiels, la même question reçoit la bonne réponse, sourcée.",
        "A general-purpose assistant answers plausibly — but generically, sometimes wrongly for your context. Connected to your official guidelines, the same question gets the right answer, with a source.") + "</p>" +
      '<div class="vs-compare reveal">' +
        '<div class="vs-col plain">' +
          '<div class="vs-tag">' + bi("Assistant IA généraliste", "General-purpose AI") + "</div>" +
          '<div class="vs-q">' + bi("Conduite à tenir devant une fièvre chez un nourrisson&nbsp;?", "What to do about a fever in an infant?") + "</div>" +
          '<div class="vs-a">' + bi("Surveillez la température, donnez du paracétamol et consultez un médecin si elle persiste.", "Monitor the temperature, give paracetamol, and see a doctor if it persists.") + "</div>" +
          '<div class="vs-flag warn">⚠ ' + bi("Plausible, sans source — et hors du protocole national.", "Plausible, unsourced — and off the national protocol.") + "</div>" +
        "</div>" +
        '<div class="vs-mid">vs</div>' +
        '<div class="vs-col grounded">' +
          '<div class="vs-tag ok">' + bi("Bayes Platform · ancrée", "Bayes Platform · grounded") + "</div>" +
          '<div class="vs-q">' + bi("Conduite à tenir devant une fièvre chez un nourrisson&nbsp;?", "What to do about a fever in an infant?") + "</div>" +
          '<div class="vs-a">' + bi("Avant 3 mois, toute fièvre impose une consultation en urgence — conformément au protocole national.", "Under 3 months, any fever requires urgent medical review — per the national protocol.") + "</div>" +
          '<div class="vs-flag ok">✓ ' + bi("Protocole officiel (HAS) cité · vérifiable.", "Official guideline (HAS) cited · verifiable.") + "</div>" +
        "</div>" +
      "</div>" +
      '<p class="footnote reveal">' + bi(
        "À titre illustratif — c'est l'enjeu du service public : une réponse générique peut être dangereuse. L'agent doit suivre vos protocoles, pas le web ouvert.",
        "Illustrative — this is the public-service stakes: a generic answer can be dangerous. The agent must follow your protocols, not the open web.") + "</p>" +
      "</div></section>";
  };

  /* ---- PLATFORM · sources (your documents + indexing status, RAG) ----------- */
  S["platform-sources"] = function () {
    var FILE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>';
    function row(fr, en, tag, status) {
      var ok = status === "ready";
      return '<div class="doc-row"><div class="doc-t">' + FILE + "<span>" + bi(fr, en) + "</span></div>" +
        '<span class="doc-tag">' + tag + "</span>" +
        '<span class="doc-status ' + status + '">' + (ok ? bi("Indexé", "Ready") : bi("Échec", "Failed")) + "</span></div>";
    }
    return '<section class="slide" id="platform-sources"><div class="slide-inner">' +
      '<div class="eyebrow reveal">' + bi("SOURCES · VOS DOCUMENTS", "SOURCES · YOUR DOCUMENTS") + "</div>" +
      '<h2 class="title reveal">' + bi(
        "Ancrée dans <em class=\"hl\">vos documents</em>, pas dans le web ouvert.",
        "Grounded in <em class=\"hl\">your documents</em>, not the open web.") + "</h2>" +
      '<p class="lead reveal">' + bi(
        "Déposez vos protocoles, circulaires et référentiels : la plateforme les indexe, et l'agent ne répond qu'à partir d'eux — sources citées, statut d'indexation visible.",
        "Drop in your protocols, circulars and guidelines: the platform indexes them, and the agent only answers from them — sources cited, indexing status visible.") + "</p>" +
      '<div class="win reveal" style="max-width:840px">' + winbar(bi("Sources · Documents", "Sources · Documents"), "RAG") +
        '<div class="win-body"><div class="doc-list">' +
          row("Protocole national de prise en charge.pdf", "National care protocol.pdf", bi("Santé", "Health"), "ready") +
          row("Circulaire 2025-04 — éligibilité.pdf", "Circular 2025-04 — eligibility.pdf", bi("Droits", "Benefits"), "ready") +
          row("Référentiel des démarches.docx", "Procedures reference.docx", bi("Procédures", "Procedures"), "ready") +
          row("Guide usager — FAQ.pdf", "User guide — FAQ.pdf", "FAQ", "ready") +
          row("Barème 2024 (scanné).xlsx", "2024 fee schedule (scanned).xlsx", "—", "failed") +
        "</div>" +
        '<div class="doc-upload"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/></svg>' +
          bi("Glisser un document — ou téléverser", "Drag a document — or upload") + "</div>" +
        "</div></div>" +
      '<p class="footnote reveal">' + bi(
        "Chaque réponse cite sa source. Un document non indexé est signalé — vous savez ce que l'agent peut, et ne peut pas, utiliser.",
        "Every answer cites its source. A document that failed to index is flagged — you know what the agent can, and cannot, use.") + "</p>" +
      "</div></section>";
  };

  /* ---- CLOSING / thank-you --------------------------------------------------
     opts: { tagline?:{fr,en} } */
  S.closing = function (o) {
    o = o || {};
    var tag = pair(o.tagline,
      "Construisons-le ensemble.",
      "Let's build it together.");
    return '<section class="slide dark cover" id="thanks" data-dark><div class="slide-inner">' +
      '<div class="cover-mark"><img class="bilogo" src="' + A + 'logos/bi-white.svg" alt="Bayes Impact"/></div>' +
      '<h1 class="big">' + bi("Merci.", "Thank you.") + "</h1>" +
      '<p class="tagline">' + tag + "</p>" +
      '<div class="cover-foot"><span>bayesimpact.org</span><span class="cf-r">Bayes Impact</span></div>' +
      "</div></section>";
  };

  window.BAYES_SLIDES = S;
})();
