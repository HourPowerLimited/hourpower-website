# Spec: Coming Soon Page

## Intent

HourPower is a solar battery company based in Ireland. We use reconditioned EV batteries
to provide cost-effective access to large-scale energy storage — making serious storage
capacity accessible to homes and businesses that couldn't otherwise afford it.

This website will grow over time. The first milestone is a coming soon page that
establishes the brand and signals what's coming.

## Goal

A single static page that:
- Communicates who HourPower is and what we do
- Signals that the full site is coming soon
- Looks clean and credible
- Is fully responsive across mobile, tablet, and laptop
- Has a footer with "Hour Power Limited — Ireland"

## Content

**Headline:** Coming Soon

**Subheading:** Affordable large-scale solar storage, powered by reconditioned EV batteries.

**Body:** We're building something to make serious energy storage accessible to everyone.
Check back soon.

**Footer:** © {current year} Hour Power Limited — year is dynamic via `new Date().getFullYear()`

> Note: brand name is always written as "Hour Power" (two words). Ireland was omitted — too limiting if the company expands.

## Design

- Full-viewport-height centered layout
- Clean, minimal — white/light background, dark text
- No images required at this stage
- Tailwind only, no inline styles
- Responsive: single-column layout that works on mobile (≥320px), tablet (≥768px), and laptop (≥1024px)
- Font sizes scale up at larger breakpoints

## Out of Scope

- Navigation, header, multiple pages
- Email capture or any form
- Any backend or API

## Tasks

- [x] Task 1: Build the coming soon page and footer
