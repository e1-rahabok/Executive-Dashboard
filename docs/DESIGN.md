# Design Decisions

Source of truth: `design/Main.dc.html`.

## Page structure

1. **Header.** Logo, name, section links, date, live indicator.
2. **Hero.** Headline, three raw-capacity meters, five location towers, selected-location readout.
3. **Location detail.** Opens under the hero when a tower is selected.
4. **Is it healthy?** Three question cards with drill-down panel.
5. **How long until we need more?** Gauge, per-resource runway bars, decision date, per-location table.
6. **What the private cloud delivers.** Cost, risk, speed cards with drill-down panel.
7. **Footer.** Data note, back to top.

## Progressive disclosure

| Level | What the user sees | Trigger |
|---|---|---|
| 1 | Summary: headline numbers, chips, sparklines | Page load |
| 2 | Detail panel: 7-day and 1-hour charts, stats, events | "See detail" button |
| 3 | Breakdown: per location, per cost line, per risk | Panel content, "Show by location" |

Rules:
- Only one panel open per section.
- Buttons use `aria-expanded`. Towers use `aria-pressed`.
- Every panel has a Close button.

## Visual language

- Dark navy hero on a warm light page. White cards with soft shadow.
- Single teal accent for healthy and in-use. Amber for watch. Red for act now.
- Typeface: Manrope.
- Numbers use tabular figures.
- Custom SVG illustrations: isometric towers, dial gauge, shield, layered cost stack, stopwatch, donut. No emoji. No stock icon packs.
- Chart reference lines: dashed amber for targets, dotted amber for incident markers.
- Status never relies on colour alone. A chip with text accompanies each colour.

## Towers

- One tower per location.
- Height: raw capacity, one slab per 1,500 units.
- Lit slabs: share in use.
- Floor tile glows when selected. Other towers dim to 50%.
- Animated dashed line under towers shows locations working as one. Disabled for reduced motion.

## Sample data in the mockup

| Item | Value |
|---|---|
| Locations | Singapore, Virginia, Frankfurt, Tokyo, London |
| Computing power | 76,800 units (about 9,600 laptops) |
| Working memory | 480 TB |
| Storage | 21 PB |
| Days remaining | 167 headline, set by working memory |
| Tightest location | Tokyo, 119 days |
| Yearly cost | $38.6M against $61.2M public estimate |
| Recovery time | 14 min against 30 min target |
| Delivery time | 3.8 hours against 11 days a year ago |

All values are fictional. Replace with live data in the build.

## Brand

- Mockup brand: fictional **ACME Corp**, original "A" mark. Teal and navy.
- Do not use third-party company names or logos without rights.
- Brand tokens should move into a single theme file in the build.
