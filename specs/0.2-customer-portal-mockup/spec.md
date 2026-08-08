# Spec 0.2 — Customer Portal Mockup

## Overview
A static SPA mockup of a customer-facing battery observability portal, hosted at `/portal`. No real authentication or data — all values are hardcoded. The goal is to demonstrate the UX and visual design of the portal to customers.

---

## Routes

| Path | Description |
|---|---|
| `/portal` | Login screen |
| `/portal/dashboard` | Battery dashboard |

---

## Layout
The portal uses its own layout (`src/app/portal/layout.tsx`) that excludes the site-wide Footer.

---

## Login (`/portal`)
- Centred card on a dark background
- HourPower logo/wordmark at the top of the card
- Email field — prefilled with `demo@hourpower.co.uk`
- Password field — prefilled with `••••••••`
- Submit on button click or Enter key
- Navigates client-side to `/portal/dashboard` (no real auth)

---

## Dashboard (`/portal/dashboard`)

### Summary Bar
Four top-level stat cards:
- Total Capacity (kWh)
- System Uptime
- Last Sync timestamp
- Overall Health Score (%)

### Battery Grid
Mock data: 3 batteries. One card per battery containing:
- Battery ID / name
- Status badge: Online | Degraded | Offline
- State of Health (SoH %)
- State of Charge (SoC %)
- Temperature (°C)
- Charge Cycles
- SoH trend sparkline (inline SVG — no chart library)

### Responsiveness
- Mobile: 1-column stack
- Tablet (md): 2-column grid
- Desktop (lg): 3-column grid

---

## Design
- Dark theme throughout
- Modern tech-portal aesthetic (think EV/energy management SaaS)
- Tailwind CSS only — no inline styles, no additional CSS frameworks

---

## Constraints
- `"use client"` components — compatible with `output: 'export'`
- All mock data hardcoded in component files
- No new npm packages
- Navigation is client-side only (`useRouter`)
