# Spec 0.4 — Internal Inventory & Battery Lifecycle Tracker

## Overview
A static SPA mockup of an internal tool for tracking battery units from purchase through to dispatch. Hosted at `/inventory`. The page opens with a short explanatory blurb describing the process so the concept is immediately clear to anyone viewing the mockup. No real backend — all state is hardcoded mock data, except the "Add Battery" flow which uses local component state.

---

## Routes

| Path | Description |
|---|---|
| `/inventory` | Login screen |
| `/inventory/board` | Kanban pipeline board |

---

## Layout
Uses its own layout (`src/app/inventory/layout.tsx`) excluding the site-wide footer. Dark theme, teal accent to distinguish from customer portal (emerald) and admin panel (amber).

---

## Login (`/inventory`)
- Centred card on a dark background
- HourPower logo/wordmark with an "Inventory" label
- Email field — prefilled with `inventory_manager@hourpower.ie`
- Password field — prefilled with `mockpassword`
- Submit on button click or Enter key
- Navigates client-side to `/inventory/board`

---

## Process Blurb
Displayed at the top of `/inventory/board` above the kanban board. Short paragraph explaining:
- Each battery unit is assigned a unique serial number on intake
- A QR code is generated and printed, then physically attached to the battery
- The QR code allows any team member to instantly identify and look up the unit throughout the process
- Units move through the pipeline from purchase to dispatch; failed units are quarantined

---

## Pipeline Stages (Kanban Columns)

| Stage | Description |
|---|---|
| Purchased | Unit has been sourced and is awaiting physical arrival |
| Intake & Inspection | Unit has arrived; visual and physical inspection underway |
| Capacity Test | Charge/discharge cycle test to verify usable capacity |
| Health Test | BMS diagnostics, cell balance check, thermal performance |
| CE Certification | Compliance verification; documentation and labelling |
| Ready for Dispatch | Unit has passed all stages and is awaiting installation |
| Quarantine | Unit failed at one or more stages; removed from active pipeline |

Columns scroll horizontally on mobile. On desktop all columns are visible in a single scrollable board.

---

## Battery Card
Each card in the kanban board shows:
- Serial number (e.g. `HP-0042`)
- Source / supplier name
- Current stage badge
- Per-stage status indicators: pass ✓ / fail ✗ / pending — for each of: Capacity Test, Health Test, CE Certification
- QR code generated via the `qrcode` npm package encoding `https://hourpower.ie/inventory?serial=HP-XXXX`
- Destination customer (if assigned) or "Unassigned"

---

## Add Battery Flow
- "Add Battery" button in the page header
- Opens a modal overlay
- Auto-generates the next serial number (e.g. `BAT-0051`)
- Displays the QR code for that serial number (generated via `qrcode`)
- Print button — triggers `window.print()` on a print-only section containing the QR code, serial number, and the instruction: *"Print and affix this label to the battery unit before proceeding."*
- Confirm button adds the unit to the Purchased column in local state
- Cancel dismisses without adding

---

## Scan & Update Battery Flow
- "Scan Battery QR" button in the page header
- Opens a modal with a live camera feed (`getUserMedia`, rear camera preferred via `facingMode: 'environment'`)
- QR decoding via the browser-native `BarcodeDetector` API; graceful fallback message shown on unsupported browsers
- Once a valid `HP-XXXX` serial is detected the camera closes and the update form opens for that unit
- Update form shows:
  - Current stage (read-only)
  - Next stage selector (only valid forward progressions shown; Quarantine always available)
  - Approver dropdown — mock team members: Aoife Ryan, Ciarán Walsh, Niamh O'Brien, Seán Doyle
  - Confirm moves the unit to the selected stage in local state
- No navigation away from `/inventory`

---

## Mock Data — 8 battery units

| Serial | Supplier | Stage | Capacity | Health | CE | Customer |
|---|---|---|---|---|---|---|
| HP-0001 | Renault Recycling EU | Ready for Dispatch | ✓ | ✓ | ✓ | Brennan Residence |
| BAT-0002 | Renault Recycling EU | Ready for Dispatch | ✓ | ✓ | ✓ | Murphy Farm |
| BAT-0003 | VW Group Remarketing | CE Certification | ✓ | ✓ | pending | Murphy Farm |
| BAT-0004 | VW Group Remarketing | Health Test | ✓ | pending | — | Fitzgerald Commercial |
| BAT-0005 | Nissan Battery Recovery | Capacity Test | pending | — | — | Unassigned |
| BAT-0006 | Nissan Battery Recovery | Intake & Inspection | — | — | — | Unassigned |
| BAT-0007 | Renault Recycling EU | Quarantine | ✓ | ✗ | — | Unassigned |
| BAT-0008 | VW Group Remarketing | Purchased | — | — | — | Unassigned |

---

## Responsiveness
- Mobile: columns stack vertically, each column full width
- Desktop: horizontal scrolling kanban board, all columns visible

---

## Design
- Dark theme, teal accent (`teal-400`)
- Tailwind CSS only

---

## Dependencies
- `qrcode` — QR code generation (npm, bundles into static output)
- `BarcodeDetector` — QR decoding from camera feed (browser-native, no package needed)

---

## Constraints
- `"use client"` — compatible with `output: 'export'`
- All mock data hardcoded; Add Battery and Scan & Update state is local (`useState`) and resets on page refresh
- No navigation away from `/inventory`
