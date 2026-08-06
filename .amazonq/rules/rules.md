# Project Rules

## Spec Process
- All work is spec-driven. Specs live in `/specs/`
- Do not begin implementation until the spec has been reviewed and approved
- Do not create design documents until the spec is approved
- Reflect all decisions consistently throughout the spec before moving to tasks

## Stack
- Next.js with static export (`output: 'export'`)
- Tailwind CSS for all styling — no other CSS frameworks
- TypeScript preferred
- No backend, no API routes, no server components that require a runtime

## Code Style
- Write minimal, readable code — no over-engineering
- Components should have a single responsibility
- No inline styles; use Tailwind classes only
- Keep components small and composable

## GitHub Actions
- Use GitHub's first-party Actions suite only — no third-party actions
- Workflow uses OIDC permissions (`pages: write`, `id-token: write`) — no `contents: write`, no stored tokens
- Pages source must be set to **GitHub Actions** in repository Settings → Pages
- Use `actions/configure-pages` to handle `basePath` automatically — do not hardcode it in `next.config.ts`
- Use `concurrency: group: pages` to prevent racing deploys
- Do not commit build artifacts to the main branch

## Local Preview
- At the end of every task and every spec, run `npm run build && npx serve out` so the site can be viewed locally before committing
- Confirm there are no build errors before moving to the next task
- The static export is served from the `out/` directory

## .gitignore
- A `.gitignore` must exist at the repo root and must exclude: `node_modules/`, `out/`, `.next/`, `.env*.local`
- Never commit build artifacts or local environment files

## Security
- Never generate, hardcode, or suggest committing credentials, API keys, tokens, or secrets of any kind
- All secrets must go in `.env.local` (gitignored) and be referenced via `process.env`
- If a service requires a token at build time, it must be added as a GitHub Actions secret and injected via the workflow — never stored in the repo
- Before the first commit, initialise `gitleaks` as a pre-commit hook so secrets are caught before they reach git

## General
- Combine shell commands where sensible to reduce manual steps
- At the end of each task, git commit so we can roll back one task at a time
- Do not create summary documents
- Do not add dependencies that aren't needed
