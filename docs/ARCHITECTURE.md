# Proposed Architecture

Status: **proposal.** Nothing is built.

## Shape

```
Data sources  ->  Collector  ->  Metrics store  ->  API  ->  Web UI
```

## Components

| Component | Role | Notes |
|---|---|---|
| Data sources | Capacity, availability, security, cost, DR, risk, provisioning | See `METRICS.md` |
| Collector | Pulls from sources on a schedule. Converts to business metrics. | Hides technical names here, not in the UI |
| Metrics store | Time series for 7 days at 2 h and 1 hour at 1 min. Daily and static values. | Small data volume |
| API | Read-only JSON endpoints per page section | One endpoint per card plus drill-down |
| Web UI | Single page. Desktop first. | Built from `design/Main.dc.html` |

## API sketch

| Endpoint | Returns |
|---|---|
| `GET /api/summary` | Hero meters, locations, health headlines, capacity headline, value headlines |
| `GET /api/locations/{id}` | One location's capacity and days remaining |
| `GET /api/health/{up\|fast\|secure}` | 7-day series (84 points at 2 h), last-hour series (60 points), stats, events |
| `GET /api/capacity` | Per-resource days, run-out date, decision date, per-location rows |
| `GET /api/value/{cost\|risk\|speed}` | Detail data for each value card |

## Front-end

- Static single page. No server rendering needed.
- Charts drawn as SVG. No heavy chart library required.
- Candidate stacks: React or Svelte with SVG components.
- Keep visual tokens in one theme file.
- Keep all copy in one text file for review by non-technical owners.

## Security

- Read-only access to sources.
- Service account per source, least privilege.
- Page behind company single sign-on.
- No technical identifiers sent to the browser.

## Deployment

- Internal hosting. Static UI plus small API.
- Environments: dev with fixture data, production with live sources.

## Testing

- Fixture data set matching the mockup values.
- Visual regression on summary and each drill-down.
- Accessibility checks in CI.
- Language check: fail build if banned IT terms appear in UI copy.
