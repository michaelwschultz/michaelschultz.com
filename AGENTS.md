## Learned User Preferences

- In `web/`, follow SvelteKit and Svelte idioms; reuse content and copy, not Next.js components, folder layout, or React patterns.
- When extending the Svelte site, migrate and normalize content first, then build UI to match the existing look; use Next only as a visual reference until cutover.
- Keep the work page intro prominent; list past tech roles in a minimal, de-emphasized way with no company logos.
- Run the legacy Next app (`pnpm dev` at repo root) and the Svelte site (`cd web && pnpm dev`) side by side before replacing production.

## Learned Workspace Facts

- The repo has two apps: Next.js at the root (legacy) and a SvelteKit static site in `web/` (target stack).
- `web/` uses `@sveltejs/adapter-static`, mdsvex (`.svx` in `src/content/thoughts/`), and `$lib/content/*` plus `$lib/config/*` for posts, work, games, and site config.
- Static assets live under `web/static/static/` so URLs stay `/static/images/...` like the Next site.
- Search is Pagefind: `pnpm build` in `web/` runs `vite build` then `scripts/postbuild.mjs` to index `build/`.
- Pagefind UI uses the `pagefind-modal` web component; dev search needs a production build (index is not available in `vite dev`).
- `export const trailingSlash = 'always'` in `web/src/routes/+layout.ts` emits directory-style HTML (`work/index.html`) for correct Pagefind paths.
- Layout sets `data-pagefind-meta` with clean route URLs (e.g. `url:/work`); `content-check` routes use `data-pagefind-ignore` so they are not indexed.
- Node is locked to 24.x (`engines` in `package.json`, `.nvmrc`, `.node-version`).
