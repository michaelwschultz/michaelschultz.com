## Learned User Preferences

- Follow SvelteKit and Svelte idioms; reuse existing content, components, and patterns rather than porting React-style structure.
- When extending the site, migrate and normalize content first, then build UI to match the existing look.
- Keep the work page intro prominent; list past tech roles in a minimal, de-emphasized way with no company logos.
- Avoid implicit `any`; type route `+page.ts` loaders with `PageLoad` from `./$types`.

## Learned Workspace Facts

- SvelteKit static site at the repo root: `@sveltejs/adapter-static`, mdsvex (`.svx` in `src/content/thoughts/`), and `$lib/content/*` plus `$lib/config/*` for posts, work, games, and site config.
- Static assets live under `static/static/` so URLs stay `/static/images/...`.
- Search is Pagefind: `pnpm build` runs `vite build` then `scripts/postbuild.mjs` to index `build/`.
- Pagefind UI uses the `pagefind-modal` web component; dev search needs a production build (index is not available in `vite dev`).
- `export const trailingSlash = 'always'` in `src/routes/+layout.ts` emits directory-style HTML (`work/index.html`) for correct Pagefind paths.
- Layout sets `data-pagefind-meta` with clean route URLs (e.g. `url:/work`); `content-check` routes use `data-pagefind-ignore` so they are not indexed.
- Node is locked to 24.x (`engines` in `package.json`, `.nvmrc`, `.node-version`).
- Open Graph and Twitter meta come from `SocialMeta` in the root layout and `getPageSocialMeta` in `$lib/utils/social-meta.ts`; default image is `site.socialBanner` (`/static/images/michael-schultz-social.jpg`).
- `pnpm check` runs `svelte-check` then `tsc --noEmit` so untyped route loaders are caught in CI and locally.
