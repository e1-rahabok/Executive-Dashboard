# Metric Definitions

Each metric has a plain-language label for the screen and a candidate technical source for the build.

**Status of the "Candidate source" column: hypotheses. Validate against the real environment before building.**

| On screen | Definition | Candidate source | Refresh |
|---|---|---|---|
| Is it up? | Share of time business services were available. Target 99.95%. | Synthetic probes of business services, or service-level availability in VCF Operations | 1 min, rolled up to 2 h for 7-day view |
| Is it fast? | Typical response time for business applications. Target under 0.30 s. | Application probes, or VCF Operations application response metrics | 1 min |
| Is it secure? | Attacks blocked, breaches, security health score. | NSX firewall and intrusion-prevention events, security posture score | 1 min counts, 2 h roll-up |
| Computing power | Total and in-use compute across locations. Unit: "units". Laptop equivalent for scale. | VCF Operations capacity, per site | 5 min |
| Working memory | Total and in-use memory. | VCF Operations capacity | 5 min |
| Storage | Total and in-use storage. | VCF Operations capacity, vSAN or external storage | 5 min |
| Days remaining | Days until a resource runs out at the current growth rate. Headline is the minimum across resources. | VCF Operations capacity "time remaining" | Hourly |
| Decision date | Run-out date minus procurement lead time. | Derived. Lead time is a configured value. | Daily |
| Cost per year | Yearly running cost of the private cloud. | VCF Operations cost, finance feed | Daily |
| Public estimate | Estimated yearly cost of the same capacity from public providers. | Cost model with configured unit prices | Quarterly |
| Time to recover | Measured or tested time to restore service after a major outage. | DR test results | Per test |
| Open risks | Count of open risks by likelihood and impact. | Risk register | Daily |
| Time to deliver | Time from approved request to live environment. | Provisioning workflow timestamps | Per request |
| Requests delivered | Count of delivered environments per day. | Provisioning workflow | Daily |

## Derived values

- Laptop equivalent: units divided by a configured reference value. Mockup uses 8 units per laptop.
- Headline days remaining: minimum of per-resource days remaining.
- Cost per day: yearly cost divided by 365, plus actual daily variance.
- Zones for days remaining: under 90 red, 90 to 180 amber, over 180 teal.

## Open definitions

- What is a "business service" for availability. Needs a service list from IT.
- Which response-time measure represents "fast". Needs agreement with the CIO office.
- How to treat planned maintenance in availability. Include or exclude.
- Which cost lines count in total cost of ownership. Needs the CFO's definition.
- Source and owner of the public-provider estimate.
