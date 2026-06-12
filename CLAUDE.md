# Bayes Use-Case Library — agent playbook

You (Claude) build **Bayes Impact demos and presentations** in this repo, from a content brief a
teammate gives you (a meeting note, a pitch outline, "make a deck for hospital X", a use case to
show). You produce **one self-contained HTML page**, on the shared Bayes design system, **bilingual
FR/EN**, mobile-readable, PDF-exportable — then publish it. **This file is the contract.** Read it
fully before you start.

The golden rule: **a teammate points you at a brief and gets a beautiful, on-brand, working demo
without touching code.** You do the work. Don't hand them a template to fill in.

The second rule: **maximalist scaffold, minimalist result.** `demos/_template/` includes *every*
canonical slide. A new deck **keeps the few that fit, deletes the rest, customises the generic ones,
and adds bespoke slides freely** — without it ever becoming a *usine à gaz*. Lean to fewer slides.

---

## 1 · What Bayes is, and how we talk about it

Every word of copy must sound like Bayes. (Sources: www.bayesimpact.org and /about/.)

**Who we are.** A **nonprofit**, founded in **Silicon Valley in 2014**, now across **three
continents** (Europe, North America, Africa). **10M+ people served.** Funders & partners include
**Google.org, the Gates Foundation, Y Combinator, France Travail, and the U.S. Department of
Veterans Affairs**. **Open-source**, **for the public good** — not a vendor.

**Mission — the line everything ladders up to:**
> *L'IA pour aider celles et ceux qui en ont besoin, et celles et ceux qui les accompagnent.*
> *AI to empower people in need and those who help them.*

**The Bayes Platform** — our product: an **open-source platform of AI agents for public services**.
What's distinctive, and what backs the claim that we are *the* AI platform **purpose-built for public
services** (not just open-source & self-hostable, though we are both):
- **Sovereign** — open-source, **deployable on your own infrastructure; your data stays in-house.**
- **State-of-the-art orchestration** — multi-agent, model-provider-independent.
- **Ten years of public-service DNA** — we built the hard parts in *from the ground up*:
  - **Observability & process improvement** — top topics, and the topics where **documents lack
    coverage** (so you know what to improve).
  - **Protocol & guideline compliance** — agents follow official protocols (the **MCP** demo shows
    this) and stay in scope.
  - **Sandboxed agentic access** — connect to the org's **back-offices** with explicit, logged,
    revocable access.
  - **No/low-code for domain experts** — they build agents without getting **RAG chunking,
    embedding, or bias mitigation** wrong (easy to mess up, with real consequences — see the
    Austrian AMS bias incident on the Studio slide).
  - **Human evaluation** — blind review campaigns (testers + reviewers) before a service goes live.
- For a **government** audience the platform is the **"DPI of the agentic government"** (Digital
  Public Infrastructure). Elsewhere: "own your AI / a sovereign AI platform".

**Tone.** Mission-driven, calm, concrete, humble. Be **honest about maturity** ("à terme", "future
portal", "pilot"). Demo data is **illustrative** (names/figures/citations need an expert check).

**Banned phrasings** (never use): ~~"GouvAI"~~, ~~"le service public en un coup de fil"~~,
~~"digitalisation 360"~~, ~~"renforcer"~~ (use *aider* / *accompagner*).

---

## 2 · The design system (match the website; don't reinvent)

`lib/bayes.css` (tokens + components) and `lib/bayes.js` (engine) are **shared — you almost never edit
them.** You write **one deck file** that uses the classes below.

**Tokens:** `--bg #F2EFE9` (warm beige) · `--ink #000` · `--card #FFF` · `--border-soft #DBCCAF` ·
`--accent-orange #FF8400` · `--accent-blue #1067FE` · `--gold-bg #EBE092` · `--ok #1F7A3F` ·
`--wa-green #075E54` · `--radius 14px`. Fonts: **Inter** + **JetBrains Mono** (loaded in `<head>`).

**The orange rule — this is where decks go wrong.** On bayesimpact.org orange is **punctuation, not
paint**: a 6px dot before an eyebrow, a thin 2px left-border, a chevron, the progress line, the
active state. **Emphasis is the gold marker-highlight**, never orange text:
```html
<em class="hl">les mots importants</em>     <!-- gold underline-highlight, light slides -->
```
On **dark** slides, `em.hl` becomes a soft translucent-gold marker automatically; the earth's cycling
phrase uses the same warm gold. **Do not** set big headlines or fills in orange.

**No em dashes in copy.** The website doesn't use them and neither do we. Avoid `—` wherever possible
in user-facing deck text (FR + EN). Use a comma, a period (two short sentences), a colon, or
parentheses instead. `·` middots and `→` arrows for lists/flows are fine; the ban is specifically the
`—` em dash as a prose connector.

**Airy and épuré.** We like calm, uncluttered layouts. Favour whitespace and restraint: **one idea per
slide**, generous margins, large type, few elements. If a slide feels busy, **cut content rather than
shrink it**. Empty space is a feature, not a gap. This is the difference between an on-brand deck and a
*usine à gaz*: maximalist scaffold, minimalist result.

**Chrome is automatic — never add it.** `bayes.js` injects:
- a **top nav** matching the site — translucent/blurred, with the **Bayes logo (backlink to
  bayesimpact.org)**, the **section label** (`data-label-fr/en` on `<body>`), a **language dropdown**
  (globe + current + menu), and a **PDF** button. It adapts to dark slides automatically.
- the progress bar, slide dots, counter, and the keyboard hint.

**Core blocks** (already styled — compose them): `.slide` (full-screen; `data-dark` = dark) ·
`.slide-inner` · `.reveal` (fade-up on scroll) · `.eyebrow` · `.title`/`.big` · `.lead` ·
`<em class="hl">` · `.cards.c3`+`.card`(+`.kicker`) · `.chips`/`.chip` · `.split` (2-col) ·
`.cover` (title/closing) · `.partners-grid` (funder logos). **Platform mockups:** `.win`
(product-window frame) · `.agent-grid`/`.agent-card` · `.metric`/`.bars`/`.topic` · `.incident`
(cautionary callout) · `.conn-map`/`.conn-node`/`.guard` · `.review-q`/`.rq` · `.arch`/`.arch-layer`
(the layered **sovereign stack** — put `class="slide dark arch-slide" data-dark` on the section; it
reads bottom-up via an upward axis + step badges numbered from the ground, and the Bayes-Platform
layer, `.arch-layer.socle`, is the lit cream centerpiece with the `#bi-mark` watermark). The two
**demos** (§6) are their own blocks.

**Re-theme one deck** (rare): an inline `<style>:root{ --accent-orange:#0A7E5A; }</style>` in its
`<head>`. Never edit the shared CSS for one deck.

---

## 3 · Repo layout

```
use-cases/
├── index.html         splash gate — visitor types a code → /demos/<slug>/
├── lib/  bayes.css · bayes.js · bayes-slides.js   (shared — rarely edited)
├── assets/  logos/ · planet.webp · partners/      (shared brand assets)
├── demos/
│   ├── _template/index.html   ← copy this to start (the maximalist scaffold)
│   └── <slug>/index.html      ← one folder per demo / deck
├── CLAUDE.md   (this file)   └── README.md
```

Two content types share the system: **website-linkable demo pages** (a focused interactive
showcase) and **partner decks** (intro → vision → use cases → demos → platform → team → thanks).
`demos/bayes/` is the **master presentation**: the maximalist, fully-built Bayes deck (every
argument, both demos, every use-case family). It doubles as the cold-share deck when there's no
specific engagement yet, and is the **source you personalise down** for each partner (see §5).

---

## 4 · Shared slides — edit once, reuse everywhere

The slides that are **the same across every Bayes deck** live in `lib/bayes-slides.js`. A deck pulls
one in with a placeholder; `bayes.js` swaps it for the real `<section>` at load:

```html
<div data-shared="about"></div>

<div data-shared="earth">
  <script type="application/json">
  { "lead": {"fr":"…","en":"…"}, "believe": {"fr":["…"],"en":["…"]} }
  </script>
</div>
```

- **Edit a shared slide** in `lib/bayes-slides.js` → **every deck that includes it updates.** This is
  how a wording change propagates to all the localized variants at once.
- **Customise** a shared slide for one deck → pass options via the inner `<script type="application/
  json">` (or `data-opts="{…}"`). See each function in `bayes-slides.js` for its options.
- **Override** a shared slide for one deck → **don't use the placeholder; write your own
  `<section>` instead.** (This is exactly how the Togo deck keeps its bespoke GouvAI-specific cover
  while every other deck shares the generic one.)

**Available shared slides:** `cover` (title hero — customise via opts, or write your own `<section>`
to override) · `earth` (vision hero) · `context` (partner / meeting context, position 3 in partner
decks — omitted from the generic Bayes deck) · `about` (who we are) ·
`platform-overview` · `platform-grounding` (the MCP point as a simple before/after: generic LLM vs
grounded-in-your-protocols — the health example) · `platform-sources` (your documents + indexing
status, RAG) · `platform-studio` (no-code + the bias-incident) · `platform-compliance`
(MCP/sandbox) · `platform-observability` · `platform-evaluation` (human review) · `closing`
(thank-you).

The `platform-*` slides are the **optional Bayes Platform showcase** — each is the visual
*illustration* of a claim (grounding, sources, no-code, protocols, observability, review). Include
the ones that fit the story, delete the rest. They are **generic**: never paste a real customer's
workspace, document names, or metrics into them.

`<body>` carries the shared config: `data-assets` (asset base path), `data-logo` / `data-logo-dark`
(nav + per-page PDF mark), `data-label-fr` / `data-label-en` (the nav section label).

---

## 5 · The canonical slide structure

The Bayes narrative spine. Keep the bookends; **the use-case middle varies a lot — don't templatize
it.** A deck runs ~8–14 slides, one idea each.

1. **Cover** (`data-shared="cover"`, customise via opts — or override with your own `<section>`, as
   Togo does) — title, one-line pitch, partner/org name.
2. **Earth hero** (`data-shared="earth"`) — "We believe in a world where __" over the living planet.
   Our signature; keep it second. Living Earth + an **orbiting dots cloud** (the brand dots/data
   motif, JS-built, *not* a starfield), *quiet* glow. Harmonious on mobile too.
3. **Context** (`data-shared="context"`, *optional*) — partner · country · date + the meeting/project
   theme. Position 3 in a partner deck; **delete it** from a cold/generic deck (the `demos/bayes/` one
   has no context slide).
4. **Who we are** (`data-shared="about"`) — mission + credibility + funder logos.
5. **Arguments & use cases** — *the bespoke middle.* Problem, the offer (3 pillars in `.cards.c3`),
   one slide per sector/use case, the trust story (a layered-architecture `.arch` slide fits here for
   government decks). **Shape freely** — a hospital deck ≠ a ministry deck here.
6. **Interactive demos** — the proof. At least one of the two engines (§6); often both.
7. **Platform showcase** (the optional `platform-*` shared slides) — include what's relevant.
8. **Team / sponsors / how we work** (bespoke) — the partnership.
9. **Thank-you** (`data-shared="closing"`).

`demos/_template/index.html` is exactly this, maximalist (every shared slide present). Start there
and delete down.

### Personalising the master deck for a partner

`demos/bayes/` is the **master presentation** — maximalist on purpose. A partner declension is made by
**subtracting and swapping**, not starting from scratch. Three buckets:

- **Keep as-is (Bayes-canonical — don't touch the copy):** Cover (swap only the title / partner name),
  Earth · mission, Who-we-are · history, Team & references, the `platform-*` showcase, Open-source
  philosophy, How-we-work, Closing. These say who Bayes is and what the platform does; identical
  across partners.
- **Personalise (ask the partner-context questions first):** the **use-case slides** and the demos.
  Lead with the partner's own sector/example (e.g. the Togo or France Travail focus slides are the
  pattern), re-point the reference logos to the ones that matter to them, and add a `context` slide at
  position 3 (partner · country · date · meeting theme). Numbers and demo data always need an expert
  check.
- **Drop or move to an annex:** use-case examples from other sectors, and any `platform-*` slide whose
  claim isn't part of this conversation. Don't delete outright — park them after the Closing under an
  `<!-- ANNEX -->` marker so they're available if a question comes up, without cluttering the flow.

When the context is missing (which partner, which sector, default language, what the meeting is for),
**ask before personalising** rather than guessing. The master deck is the safe thing to share until
then.

---

## 6 · The demos (the part that makes it real)

Each demo is on its own slide, marked `data-demo="chat"` or `data-demo="copilot"`, driven by an
inline `<script type="application/json" class="demo-data">…</script>`. `bayes.js` auto-plays it on
scroll and renders its **finished state** for PDF. **You adapt the demo by editing the JSON.**

### Chat (`data-demo="chat"`) — any conversational service
WhatsApp-style thread: a citizen requesting a document, a patient's family asking pre-op questions, a
donor onboarding. `{ "pay": {...}, "fr": [steps…], "en": [steps…] }`. Step types:
`in` (assistant, `bp:0–N` lights the journey strip) · `out` (user, `digits:true` for IDs) · `tool`
(`name`,`arg`,`result`) · `fill` (`src`,`rows`) · `voice` (`dur`,`transcript`) · `dossier`
(`num`,`rows`) · `paylink` (`amount`,`ref`,`code`) · `notif` (`tag`,`text`). Relabel the left service
card + the BPMN journey + the header in the slide HTML. The **voice-note + local-language** angle is a
strong inclusion point.

### Copilot (`data-demo="copilot"`) — any NL query over a corpus/DB
Back-office agent answering with cited sources over a scan→agent→DB pipeline: case-law for a
magistrate, clinical analytics for a clinician, an internal knowledge base.
`{ "meta": {who,search,name as {fr,en}}, "fr": [{q,arg,res,a,s:[…]}], "en": [...] }`. Relabel the
pipeline stages in the slide HTML to the domain.

**Both demos need matching `fr` and `en` arrays.** Demo data is illustrative — say so.

---

## 7 · Bilingual (inline FR/EN) — non-negotiable

Every deck ships **FR + EN**. The approach is **inline `data-lang` spans** — no central dictionary:
```html
<span data-lang="fr">Texte français</span><span data-lang="en">English text</span>
```
`bayes.js` shows the language dropdown automatically and hides the inactive language. Shared slides
and demo JSON already carry both. **Rule: a French string never ships without its English twin in the
same place.** No orphans. (The switcher lists more languages on the site; decks are FR/EN — add a
third only if the brief asks.)

---

## 8 · Hard requirements (every deck, every time)

- **Mobile-readable.** Layout stacks and scrolls on phones (≤700px). Walk every slide at **375×812**
  — nothing clipped, demos animate, no horizontal overflow. Desktop is first-class for *presenting*.
- **PDF-exportable, as a rule.** The nav **PDF** button (and Cmd/Ctrl-P) must produce a clean export:
  **desktop layout**, every demo in its **finished state**, a Bayes mark on each page. Wired in
  `bayes.js` + the `@media print` block. Verify before shipping.
- **Dependency-free, zero-build.** Plain HTML/CSS/JS; works as a file and on GitHub Pages. Relative
  paths (`../../lib/…`, `../../assets/…`). Load order: `bayes-slides.js` **then** `bayes.js`, at end
  of `<body>`.
- **Console clean** on load and during the demos.

---

## 9 · How to make a variant

1. **Read the brief.** Audience, message, the 1–2 use cases to demo, the org, domain facts.
2. `cp -r demos/_template demos/<slug>` (slug = kebab-case).
3. **Edit only `demos/<slug>/index.html`.** Set `<title>` + the `<body>` `data-label-*`. Rewrite the
   cover, the use-case middle, and the two demo JSONs. **Delete the shared placeholders you don't
   need; customise the ones you keep** (§4). Keep every string FR+EN; keep the orange rule (§2).
4. **Verify** (§8): desktop + mobile + both demos + the FR/EN dropdown + PDF. Console clean.
5. **Publish** (§10); give the teammate the URL **and** the access code (the slug).

---

## 10 · Wording library (reuse — keep one voice)

| Use | FR | EN |
|---|---|---|
| Mission | L'IA pour aider celles et ceux qui en ont besoin et celles et ceux qui les accompagnent. | AI to empower people in need and those who serve them. |
| Vision (earth) | Nous croyons en un monde où chacun reçoit l'aide dont il a besoin. | We believe in a world where everyone receives the help they need. |
| Sovereignty | Open-source, souveraine — vos données restent chez vous. | Open-source, sovereign — your data stays in-house. |
| Trust | Fiabilisé par vos documents (RAG) : zéro hallucination, sources citées. | Grounded in your documents (RAG): zero hallucination, sources cited. |
| No-code | Vos experts métier créent et déploient des agents, sans coder. | Your domain experts build and deploy agents, no code. |
| Purpose-built | La plateforme d'IA pensée pour le service public. | The AI platform purpose-built for public services. |
| Partnership | Un partenariat, pas un fournisseur : Bayes accompagne, ne verrouille pas. | A partnership, not a vendor: Bayes supports, doesn't lock you in. |
| Gov positioning | La Bayes Platform, DPI du gouvernement agentique. | The Bayes Platform, the DPI of the agentic government. |
| Maturity caveat | À titre illustratif — à confirmer avant diffusion. | Illustrative — to be confirmed before any real audience. |

---

## 11 · Publish

Commit the new `demos/<slug>/` and push. It goes live at:
```
https://bayesimpact.github.io/use-cases/demos/<slug>/
```
Give the teammate that URL **and** the splash access code (the slug). The splash at `/` is a soft
gate (the repo is public — security-by-obscurity only). Mark genuinely confidential pitches as such.

---

### TL;DR
Copy `demos/_template/`, **delete the shared slides you don't need**, customise the ones you keep
(cover + context via opts), rewrite the use-case middle + the two demo JSONs. Keep every string **FR+EN**, keep the
**gold-marker emphasis (orange is only punctuation)**, keep the earth hero. Verify **desktop +
mobile + PDF**, push, share the URL. Sound like Bayes. Be honest about what's a demo.
