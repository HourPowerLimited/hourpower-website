# Ideas Backlog

Unordered ideas — not specs yet. These may become specs when prioritised.

---

## Research

- Solar panel efficiency comparisons (monocrystalline vs polycrystalline vs thin-film)
- Battery chemistry deep-dives (LiFePO4, NMC, lead-acid)
- Grid tie vs off-grid vs hybrid system trade-offs
- Net metering policies by region/state
- ROI and payback period calculators — methodology research
- Emerging tech: solid-state batteries, perovskite solar cells
- Incentives and rebates (federal ITC, state-level programs)

---

## Documentation

- Installation guides for common system configurations
- Wiring diagrams and safety standards
- Glossary of solar/battery/inverter terminology
- Maintenance schedules and troubleshooting guides
- FAQ section sourced from common customer questions
- Compliance and permitting overview by region

---

## User App (PWA / SPA)

A lightweight app for customers to monitor and manage their HourPower system.

**Possible features:**
- Real-time energy production and consumption dashboard
- Battery state-of-charge display
- Historical usage charts (daily / weekly / monthly)
- Alerts and notifications (low battery, grid outage, system fault)
- System health overview (inverter status, panel output)
- Export data to CSV
- Offline support via PWA service worker

**Open questions:**
- Data source — direct inverter API, cloud aggregator (e.g. SolarEdge, Enphase), or custom telemetry?
- Auth model — per-customer login or shareable read-only link?
- Native app vs PWA vs embedded SPA within the marketing site?
- Hosting — static SPA on GitHub Pages or separate backend needed for live data?
