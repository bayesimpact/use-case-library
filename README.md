# Bayes Use-Case Library

A single home for **Bayes Impact's interactive demos and presentations** — built on one shared,
dependency-free design system. Website-linkable demo pages and partner decks live side by side.

- 🛰️ **Signature Bayes look** — warm beige + ink, restrained orange, gold-marker emphasis, the
  living-Earth vision hero, and a site-matching top nav (logo backlink + language menu + PDF).
- ♻️ **Shared slides** — the Bayes intro, the vision hero and the optional Platform-showcase slides
  live in `lib/bayes-slides.js`. Edit once → every deck updates; override per deck when needed.
- 🧱 **Maximalist scaffold** — the template ships every canonical slide; a new deck keeps the few
  that fit and deletes the rest, without becoming a *usine à gaz*.
- 🌍 **Bilingual FR/EN** from the start, with a live switcher.
- 📱 **Mobile-readable**, 🖥️ **desktop-first for demos**, 🖨️ **PDF-exportable** (desktop layout,
  demos shown in their finished state).
- 🧩 **Animated demos included** — a WhatsApp-style conversational service and a back-office copilot,
  both driven by inline JSON you can rewrite per use case.
- 🚀 **Zero build** — open a file or push to GitHub Pages.

## Make a new demo

It's designed to be done **by prompting Claude** with your content (a brief, meeting notes, a use
case). Claude follows [`CLAUDE.md`](CLAUDE.md) — the full playbook. The manual path:

```bash
cp -r demos/_template demos/<slug>     # e.g. demos/charite-health
# edit demos/<slug>/index.html  → title, slides, and the two demo JSON blocks (keep FR+EN)
```

Preview locally (any static server), e.g.:

```bash
python3 -m http.server 8016
# → http://localhost:8016/                          (splash)
# → http://localhost:8016/demos/<slug>/             (your demo)
```

Then commit & push — it goes live at
`https://bayesimpact.github.io/bayes-use-case-library/demos/<slug>/`.

## Layout

```
index.html      splash gate (type a code → /demos/<slug>/)
lib/            bayes.css · bayes.js · bayes-slides.js   — the shared engine (rarely edited)
assets/         logos · planet · partner logos
demos/          _template/  +  one folder per demo
CLAUDE.md       the agent playbook (design system, voice, shared slides, demos, requirements)
```

Built with the Bayes brand system — Inter + JetBrains Mono; beige `#F2EFE9`, ink black, orange
`#FF8400`. Open-source, for the public good.
