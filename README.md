# Bayes Platform — Use-Case Library

A curated library of **interactive use-case mockups and partner presentations** for the
**[Bayes Platform](https://www.bayesimpact.org)** — Bayes Impact's open-source AI-agent platform for
public services. Each page shows what the platform looks like applied to a concrete public-service
context — a ministry, a hospital, an employment service — as an interactive mockup or a
ready-to-present deck. They are illustrations of the product in context, not throwaway demos.

Everything runs on one shared, dependency-free design system: bilingual (FR/EN), mobile-readable,
PDF-exportable, and published straight to GitHub Pages.

**Live → https://bayesimpact.github.io/use-case-library/**

## About the Bayes Platform

The Bayes Platform is *the open-source AI agent platform, built for public services* — agents that
strictly follow their own protocols, resources and guardrails, built no-code by the people who run
the service, and private by design: deployable on your own infrastructure, with your data staying
in-house. It is built specifically for the demands of public-service AI — observability and process
improvement, protocol and guideline compliance, sandboxed access to back-office systems, and human
review before a service goes live.

- The platform is open-source — see **[bayesimpact/agent-studio](https://github.com/bayesimpact/agent-studio)**.
- Learn more at **[bayesimpact.org](https://www.bayesimpact.org)**.

## About Bayes Impact

Bayes Impact is a **nonprofit building AI for the public good**, founded in Silicon Valley in 2014
and now working across three continents. Its mission:

> **AI to empower people in need — and those who serve them.**
> *L'IA pour aider celles et ceux qui en ont besoin — et celles et ceux qui les accompagnent.*

Its open-source technology has served **10M+ people**, with support from funders including
Google.org and the Gates Foundation.

## What's inside

- A **generic Bayes Platform overview** — the cold-share introduction to the platform:
  [→ open](https://bayesimpact.github.io/use-case-library/demos/bayes/)
- **Partner use cases** — contexts such as government digital public infrastructure, health, and
  employment, each as an interactive mockup or presentation. These sit behind the splash gate at the
  site root (enter the use case's short code); confidential pitches are marked as such.
- A **maximalist template** every new use case starts from, with each canonical slide present.

## Design system

The look matches [bayesimpact.org](https://www.bayesimpact.org): warm beige and ink, restrained
orange used as punctuation, gold-marker emphasis, the living-Earth vision hero, and a site-matching
top nav (logo backlink, language menu, PDF export).

- **Shared slides** — the Bayes intro, the vision hero and the optional Platform-showcase slides live
  in `lib/bayes-slides.js`. Edit once → every page updates; override per page when needed.
- **Two interactive engines** — a WhatsApp-style conversational service and a back-office copilot,
  both driven by inline JSON you rewrite per use case.
- **Zero build** — open a file locally, or push to GitHub Pages.

Demo data throughout is **illustrative** — names, figures and citations need an expert check before
any real audience.

## Add a new use case

Designed to be done **by prompting Claude** with your content (a brief, meeting notes, a context).
Claude follows [`CLAUDE.md`](CLAUDE.md) — the full playbook. The manual path:

```bash
cp -r demos/_template demos/<slug>     # slug = kebab-case, e.g. demos/charite-health
# edit demos/<slug>/index.html  → title, slides, and the two interactive JSON blocks (keep FR+EN)
```

Preview locally with any static server:

```bash
python3 -m http.server 8016
# → http://localhost:8016/                 splash gate
# → http://localhost:8016/demos/<slug>/    your use case
```

Commit and push — it goes live at
`https://bayesimpact.github.io/use-case-library/demos/<slug>/`.

## Layout

```
index.html      splash gate (enter a short code → /demos/<slug>/)
lib/            bayes.css · bayes.js · bayes-slides.js   — the shared engine (rarely edited)
assets/         logos · planet · partner logos
demos/          _template/  +  one folder per use case
CLAUDE.md       the playbook (design system, voice, shared slides, engines, requirements)
```

---

Built on the Bayes brand system — Inter + JetBrains Mono; beige `#F2EFE9`, ink black, orange
`#FF8400`. Open-source, for the public good.
