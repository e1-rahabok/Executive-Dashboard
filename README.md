# Private Cloud Executive Dashboard

An executive dashboard for a VMware Cloud Foundation (VCF) private cloud.

- Audience: CEO, CFO, CIO, Head of IT Infrastructure.
- One common page. No personalisation.
- Plain business language. No IT jargon on screen.
- Desktop first. No mobile or tablet yet.
- Status: **design mockup done. Build not started.**

The mockup uses a fictional company, **ACME Corp**, and sample data.

## The idea

The private cloud is the largest computer in the organisation. The page shows that, then answers the questions executives ask.

| Question | Answer shown |
|---|---|
| Is it up? | Availability over 7 days, last hour on drill-down |
| Is it fast? | Response time against target |
| Is it secure? | Attacks blocked, breaches, security score |
| How long until we need more? | Days of capacity remaining |
| What does it cost? | Total cost of ownership vs public alternative |
| What if it fails? | Recovery time, open risks |
| How quickly can we move? | Time to deliver a new business environment |

## Design principles

- **Summary first.** Nothing is expanded on load.
- **Progressive disclosure.** Click to drill down. Towers, cards and capacity rows open detail.
- **7 days, then 1 hour.** Executives visit a few times a week. Trend covers the week. Detail covers the last hour.
- **Days remaining, not percentages.** Capacity is shown as runway in days.
- **Raw capacity by physical location.** Five towers show the scale of the private cloud.
- **Graphic, not decorative.** Custom illustrations and charts. No stock icon sets.

## Repository layout

| Path | Content |
|---|---|
| `design/Main.dc.html` | Mockup source (Claude Design component format) |
| `design/canvas.json` | Canvas index for the mockup |
| `design/export/index.html` | Standalone page, generated. Open in a browser. |
| `design/export/build.mjs` | Generator: `Main.dc.html` to `index.html` |
| `design/export/engine.js` | Small template renderer inlined into the export |
| `docs/PRD.md` | Product requirements |
| `docs/DESIGN.md` | UX and visual design decisions |
| `docs/METRICS.md` | Metric definitions, plain-language label, candidate data source |
| `docs/ARCHITECTURE.md` | Proposed build architecture |
| `docs/ROADMAP.md` | Phased plan |
| `docs/OPEN-QUESTIONS.md` | Decisions still needed |
| `CLAUDE.md` | Guide for Claude Code sessions |

## Viewing the mockup

- **Standalone:** open `design/export/index.html` in any browser. One file. No server, no install.
  - GitHub.com shows it as source only. Download the file or clone the repo, then open it.
  - Fonts load from Google Fonts. Offline, the page falls back to system fonts.
- **GitHub Pages (optional):** repo Settings, Pages, deploy from branch `main`, folder `/ (root)`. The page is then at `https://e1-rahabok.github.io/Executive-Dashboard/design/export/`.
- **Source:** `design/Main.dc.html` needs the Claude Design runtime. It does not open standalone. It stays the source of truth.
- **Regenerate the standalone file** after editing `Main.dc.html`:

```
node design/export/build.mjs
```

`index.html` is generated. Do not edit it by hand.

## Next steps

1. Answer `docs/OPEN-QUESTIONS.md`.
2. Validate metric sources in `docs/METRICS.md`.
3. Pick the front-end stack. Build phase 1 from `docs/ROADMAP.md`.

## Licence

MIT. See `LICENSE`.
