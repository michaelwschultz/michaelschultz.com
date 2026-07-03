## Learned User Preferences

- Follow SvelteKit and Svelte idioms; reuse existing content, components, and patterns rather than porting React-style structure.
- When extending the site, migrate and normalize content first, then build UI to match the existing look.
- Keep the work page intro prominent; list past tech roles in a minimal, de-emphasized way with no company logos.
- Avoid implicit `any`; type route `+page.ts` loaders with `PageLoad` from `./$types`.

## Learned Workspace Facts

- SvelteKit site at the repo root: `@sveltejs/adapter-node` (hybrid — most routes prerendered, `/listening` is SSR), mdsvex (`.svx` in `src/content/thoughts/`), and `$lib/content/*` plus `$lib/config/*` for posts, work, games, and site config.
- `/listening` reads recent Last.fm scrobbles from SQLite (`better-sqlite3`); sync runs via in-process `node-cron` (~5×/day at server startup) and stale refresh on page load; `GET /api/cron/sync-listening` (Bearer `CRON_SECRET`) is optional for external/manual HTTP sync only.
- Homepage status line reads `com.michaelschultz.status/self` from Bluesky via `/api/status` (60s server cache); publish with `pnpm status` using `BLUESKY_APP_PASSWORD` locally (not needed at runtime).
- Docker deployment: multi-stage `Dockerfile` + `docker-compose.yml` on external network `pangolin` for reverse-proxy routing; shared pnpm store cache mount with separate `prod-deps` and `build` stages (runtime copies prod `node_modules` from `prod-deps`, `build/` from `build`); `pnpm-workspace.yaml` sets `trustLockfile: true`; `deploy/deploy.sh` uses `docker buildx build` with local layer cache at `/var/lib/michaelschultzcom-build-cache`; SQLite at `DATABASE_PATH` (default `/app/data/listening.db`); `deploy/docker-entrypoint.sh` chowns the `listening-data` volume.
- Production deploy is automated via `.github/workflows/deploy.yml` (SSH pull + `deploy/write-env.sh` + `deploy/deploy.sh`); app and infrastructure settings live in GitHub Environment secrets, not in the repo.
- Static assets live under `static/static/` so URLs stay `/static/images/...`.
- Search is Pagefind: `pnpm build` runs `vite build` then `scripts/postbuild.mjs` to index `build/`; UI uses the `pagefind-modal` web component; dev search needs a production build (index not available in `vite dev`).
- `export const trailingSlash = 'always'` in `src/routes/+layout.ts` emits directory-style HTML (`work/index.html`) for correct Pagefind paths.
- Layout sets `data-pagefind-meta` with clean route URLs (e.g. `url:/work`); `content-check` routes use `data-pagefind-ignore` so they are not indexed.
- Node is locked to 24.x (`engines` in `package.json`, `.nvmrc`, `.node-version`).
- Open Graph and Twitter meta come from `SocialMeta` in the root layout and `getPageSocialMeta` in `$lib/utils/social-meta.ts`; default image is `site.socialBanner` (`/static/images/michael-schultz-social.jpg`).
- `pnpm check` runs `svelte-check` then `tsc --noEmit` so untyped route loaders are caught in CI and locally.

## Cursor Cloud specific instructions

- Node 24 is required (`engine-strict=true` in `.npmrc`); pnpm install will refuse to run on older Node. The VM has an `/exec-daemon/node` (Node 22) that shadows nvm on `PATH`, so run commands in a login shell (`bash -lc '...'`) where `~/.bashrc` puts nvm's Node 24 first. Verify with `node --version` before running pnpm.
- Standard commands are in `README.md`/`package.json`: `pnpm dev` (Vite dev server on `http://localhost:5173`, routes use `trailingSlash: 'always'` so bare paths 308-redirect to the trailing-slash URL), `pnpm check`, `pnpm build` (also runs Pagefind indexing over `build/`), `pnpm start` (serves the built app on port 3000).
- No secrets are needed to run/lint/build/test locally. Without `LASTFM_API_KEY` the `/listening` page renders normally but shows "No recent plays yet"; `pnpm status` (Bluesky) is a publishing script and not needed to run the site.
- There is no automated test suite; `pnpm check` (svelte-check + tsc) is the type/lint gate and the `.husky/pre-commit` hook runs it on commit.
