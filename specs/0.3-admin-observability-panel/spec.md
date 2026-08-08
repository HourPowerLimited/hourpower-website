# Spec 0.3 — Admin Observability Panel

## Overview
A static SPA mockup of an internal operator-facing observability panel at `/admin`. Allows a system operator to scan all customer deployments at a glance and quickly identify issues. No real authentication or data — all values are hardcoded.

---

## Routes

| Path | Description |
|---|---|
| `/admin` | Admin login screen |
| `/admin/dashboard` | Operator observability panel |

---

## Layout
The admin section uses its own layout (`src/app/admin/layout.tsx`) that excludes the site-wide footer. Dark theme, consistent with the customer portal but visually distinct (e.g. amber accent instead of emerald to signal internal tooling).

---

## Login (`/admin`)
- Centred card on a dark background
- HourPower logo/wordmark with an "Admin" label
- Email field — prefilled with `admin@hourpower.ie`
- Password field — prefilled with `mockpassword`
- Submit on button click or Enter key
- Navigates client-side to `/admin/dashboard`

---

## Dashboard (`/admin/dashboard`)

### Header
- HourPower wordmark + "Operator Panel" label
- Summary counts: Total Deployments, Deployments with Warnings, Deployments Critical

### Customer Deployment Cards
One card per customer. Mock data: 4 customers. Each card contains:

**Header row:**
- Customer name
- Address / location
- Overall status badge: All OK | Warning | Critical

**System info row:**
- Hardware version
- Firmware version
- Last seen timestamp

**Battery summary row:**
- Number of batteries
- Per-battery inline chips showing: battery ID, SoH %, status dot (green/amber/red)

**Expandable battery detail:**
- Clicking the card toggles an expanded section showing full per-battery stats
- Same stats as customer portal: SoH, SoC, Temperature, Charge Cycles
- No navigation away — operator stays on the single scan-down view

### Mock Customers

| Customer | Location | Batteries | HW Ver | FW Ver | Status |
|---|---|---|---|---|---|
| Brennan Residence | Galway, IE | 2 | HW-2.1 | FW-1.4.2 | All OK |
| Murphy Farm | Cork, IE | 3 | HW-2.0 | FW-1.3.9 | Warning |
| Fitzgerald Commercial | Dublin, IE | 4 | HW-2.1 | FW-1.4.2 | All OK |
| O'Brien Residence | Limerick, IE | 2 | HW-1.9 | FW-1.2.1 | Critical |

### Responsiveness
- Mobile: 1-column stack
- Tablet (md): 2-column grid
- Desktop (lg): 2-column grid (cards are information-dense, 2-col max keeps them readable)

---

## Design
- Dark theme, amber accent colour to distinguish from customer-facing portal
- Tailwind CSS only — no inline styles, no additional CSS frameworks

---

## Constraints
- `"use client"` components — compatible with `output: 'export'`
- All mock data hardcoded in component files
- No new npm packages
- Expand/collapse state managed with `useState`
