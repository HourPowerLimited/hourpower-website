# hourpower-website

Next.js static marketing site.

## Stack
- Next.js with static export (`output: 'export'`)
- Tailwind CSS — no other CSS frameworks
- TypeScript
- No backend, no API routes, no server components that require a runtime

---

## GitHub Actions
- OIDC permissions (`pages: write`, `id-token: write`) — no `contents: write`, no stored tokens
- Pages source: **GitHub Actions** in repository Settings → Pages
- Use `actions/configure-pages` to handle `basePath` — do not hardcode it in `next.config.ts`
- Use `concurrency: group: pages` to prevent racing deploys

---

## Local preview
After every task: `npm run build && npx serve out` — confirm no build errors before committing.  
Static export served from `out/`.

---

## Specs
Live in `/specs/`. Do not begin implementation until the spec has been reviewed and approved.

---

## .gitignore
Must exclude: `node_modules/`, `out/`, `.next/`, `.env*.local`

---

## Security
`gitleaks` pre-commit hook must be initialised before the first commit.
