# Product Requirements

## Goal

Give senior executives one page that shows the private cloud is healthy, has room to grow, costs less than the alternative and delivers fast.

Focus areas:
- Total cost of ownership (TCO)
- Risk mitigation
- Private cloud velocity

## Audience

- CEO, CFO, CIO, Head of IT Infrastructure.
- One shared page. No role-based views.
- Visit pattern: a few times a week.

## Language rules

- Business language only.
- Do not show: VMware, vSphere, CPU, vCPU, vSAN, NSX, ESXi, cluster, host, VM, latency, IOPS.
- Use instead:

| Technical term | Plain label |
|---|---|
| CPU | Computing power |
| Memory / RAM | Working memory |
| Storage / datastore | Storage |
| Availability / SLA | Is it up? |
| Latency / response time | Is it fast? |
| Security posture | Is it secure? |
| Capacity time remaining | Days remaining |
| Provisioning time | Time to deliver a new business environment |
| RTO | Time to recover from a major outage |
| Data centre / site | Location |

## Functional requirements

### FR1. Scale hero
- Show the private cloud as the largest computer in the organisation.
- Show raw capacity: computing power, working memory, storage.
- Show raw capacity per physical location.
- Show in-use share per resource.
- Click a location to see its detail.

### FR2. Health questions
- Three cards: up, fast, secure.
- Each card: status chip, headline number, 7-day sparkline, one-sentence summary.
- Drill-down per card:
  - 7-day chart.
  - Last-hour chart.
  - Hover or slider to read any moment.
  - Current stats.
  - Notable events this week, in plain words.

### FR3. Capacity remaining
- Headline: days remaining across all locations.
- Per resource: days remaining and projected run-out date.
- Colour bands: under 90 days act, 90 to 180 plan, over 180 comfortable.
- Decision date: when to order more, allowing for delivery lead time.
- Drill-down: per location, tightest first, with 7-day use trend.

### FR4. Value cards
- Cost: yearly cost against public-provider estimate. Drill-down: cost breakdown and daily cost trend.
- Risk: recovery time against target. Drill-down: risk matrix and protection checks.
- Speed: delivery time against a year ago. Drill-down: steps and requests per day.

### FR5. Time model
- Default window: last 7 days.
- Detail window: last 1 hour.
- Show "updated at" time and a live indicator.

## Non-functional requirements

- Desktop first. Target width 1280 to 1440 px. Mobile and tablet out of scope.
- Summary view readable in under 30 seconds.
- Accessible: text contrast 4.5:1, keyboard operable controls, no colour-only meaning.
- Respects reduced-motion setting.
- Read-only. No data entry.
- Data refresh: near real time for the last hour, hourly or slower for the 7-day trend.

## Out of scope (v1)

- Personalisation per role.
- Mobile and tablet layouts.
- Alerts and notifications.
- Technical operations views.
- Editing or acknowledging events.
