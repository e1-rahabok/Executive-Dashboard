# CLAUDE.md

Project guide for Claude Code. Read this first.

## What this project is

- Executive dashboard for a VMware Cloud Foundation (VCF) private cloud.
- Audience: CEO, CFO, CIO, Head of IT Infrastructure. One common page. No personalisation.
- Theme: the private cloud is the largest computer in the organisation.
- Focus: TCO, risk mitigation, private cloud velocity.
- Status: design mockup done (`design/`). Application build not started.
- Mockup brand: fictional **ACME Corp** with sample data.

## Read before changing anything

- `README.md`: overview.
- `docs/PRD.md`: requirements and language rules.
- `docs/DESIGN.md`: page structure, disclosure levels, visual language.
- `docs/METRICS.md`: metric definitions. Data sources are hypotheses.
- `docs/ARCHITECTURE.md`: proposed build.
- `docs/ROADMAP.md`, `docs/OPEN-QUESTIONS.md`: plan and pending decisions.

## Hard rules

1. **No IT jargon in UI copy.** Banned on screen: VMware, vSphere, VCF, CPU, vCPU, vSAN, NSX, ESXi, cluster, host, VM, latency, IOPS, RTO. Use the plain labels in `docs/PRD.md`.
2. **Answer the three questions first:** Is it up? Is it fast? Is it secure?
3. **Capacity is shown as days remaining.** Not only percentages.
4. **Time model:** trend covers the last 7 days. Detail covers the last 1 hour.
5. **Progressive disclosure.** Summary on load. Detail on click. One panel open per section.
6. **Desktop first.** Target 1280 to 1440 px. No mobile or tablet work yet.
7. **Raw capacity by physical location** stays in the hero.
8. **Graphics are custom SVG.** No emoji. No stock icon packs.
9. **Brand:** do not add third-party company names or logos (for example Nike) without confirmed rights. Use ACME Corp for examples. Production brand is an open question.
10. **Accessibility:** text contrast 4.5:1, real buttons and inputs, no colour-only meaning, respect reduced motion.
11. **Sample data is fictional.** Never present it as real. Keep the footer note until live data exists.

## Where things are

| Path | Content |
|---|---|
| `design/Main.dc.html` | Mockup source. Claude Design component format. Needs the Claude Design runtime (`support.js`). Not standalone. |
| `design/canvas.json` | Canvas index. |
| `docs/` | Specs and decisions. |

## Working conventions

- Update the matching doc when behaviour changes. Metrics change goes in `docs/METRICS.md`. Layout or copy change goes in `docs/DESIGN.md`.
- Keep copy in one place once the build starts. Keep visual tokens in one theme file.
- Do not invent metric values or sources. Mark unknowns in `docs/OPEN-QUESTIONS.md`.
- Commit messages: short imperative subject. Explain why in the body if not obvious.
- Default branch: `main`.

## Build stack

- Not chosen. See `docs/OPEN-QUESTIONS.md` item 13.
- Candidate: React or Svelte with SVG charts. No heavy chart library.
- When chosen, add install, run, test and lint commands here.

## Next tasks

1. Get answers to `docs/OPEN-QUESTIONS.md`.
2. Validate metric sources.
3. Export the mockup as a standalone static page in `design/export/`.
4. Start phase 1 of `docs/ROADMAP.md`.
