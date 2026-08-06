# HourPower Website

[![Deploy](https://github.com/HourPowerLimited/hourpower-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/HourPowerLimited/hourpower-website/actions/workflows/deploy.yml)

Marketing site for [HourPower](https://hourpowerlimited.github.io/hourpower-website) — high-capacity solar storage powered by reconditioned EV batteries.

## Stack

- [Next.js](https://nextjs.org) — static export (`output: 'export'`)
- [Tailwind CSS](https://tailwindcss.com)
- TypeScript
- Hosted on GitHub Pages via GitHub Actions

## Local Development

```bash
npm install
npm run dev
```

## Build & Preview

```bash
npm run build && npx serve out
```

## Deploy

Pushes to `main` that affect source files trigger an automatic deploy to GitHub Pages via the [Deploy workflow](.github/workflows/deploy.yml).

To deploy manually: Actions → Deploy → Run workflow.

## Project Structure

```
src/
  app/        # Next.js app router pages
  components/ # Shared components
specs/        # Feature specs and ideas backlog
public/       # Static assets
```
