![michael-schultz-social](static/static/images/michael-schultz-social.jpg)

# michaelschultz.com

Personal site of [Michael Schultz](https://michaelschultz.com) — portfolio, writing, projects, a live [/listening](https://michaelschultz.com/listening) page backed by Last.fm, and a Bluesky-powered status line on the homepage.

Built with **SvelteKit**, **Tailwind CSS**, and local **markdown** for blog posts. Most pages are prerendered; `/listening` and `/api/status` are server-rendered at request time.

## Local development

Requires **Node.js 24.x** (see `.nvmrc`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

Search uses [Pagefind](https://pagefind.app/) and is only available after a production build:

```bash
pnpm build
pnpm start
```

Type-checking:

```bash
pnpm check
```

## Environment

Copy `.env.example` to `.env` for local development:

| Variable | Purpose |
|----------|---------|
| `LASTFM_API_KEY` | Last.fm API key for `/listening` |
| `LASTFM_USER` | Last.fm username (default: `michaelschultz`) |
| `DATABASE_PATH` | SQLite path (default: `./data/listening.db`) |
| `CRON_SECRET` | Optional bearer token for `GET /api/cron/sync-listening` |
| `BLUESKY_APP_PASSWORD` | Bluesky app password for `pnpm status` and publish scripts (optional) |
| `BLUESKY_HANDLE` | Bluesky handle for status and publishing (default: `michaelschultz.com`) |
| `PUBLIC_ATPROTO_DID` | Your DID — set after `pnpm publish-publication` |
| `PUBLIC_PUBLICATION_RKEY` | `site.standard.publication` record key — set after `pnpm publish-publication` |

The listening page syncs recent plays from Last.fm into SQLite on a schedule and when the cache is stale. An in-process cron job handles most updates; `CRON_SECRET` is only needed if you want to trigger syncs over HTTP.

Manual sync while the dev server is running:

```bash
pnpm sync:listening
```

## Bluesky status

The homepage reads a short status sentence from a Bluesky record (`com.michaelschultz.status/self`) via `/api/status`. Publish updates locally:

```bash
pnpm status "Shipping something new"
```

Create an app password in Bluesky settings. The lexicon schema lives in `lexicons/com.michaelschultz.status.json`.

## Publishing thoughts (standard.site)

Thoughts are authored as markdown in `src/content/thoughts/` and **rendered from those local files** on the site. Publish commands **syndicate** content to your PDS as [standard.site](https://standard.site/) `site.standard.document` records (markdown body via [markpub.at](https://markpub.at/)). They do not change how the site renders posts.

**Prerequisites:** `BLUESKY_APP_PASSWORD` and `BLUESKY_HANDLE` in `.env` (same app password as `pnpm status`).

### What each command updates

| Command | ATProto (your PDS) | Local repo | Production site |
|---------|-------------------|------------|-----------------|
| `pnpm publish-publication` | Creates **one** `site.standard.publication` (run once; re-running creates a duplicate) | Writes `static/.well-known/site.standard.publication` | Serves well-known after deploy; prints `PUBLIC_ATPROTO_DID` and `PUBLIC_PUBLICATION_RKEY` for `.env` / GitHub secrets |
| `pnpm write-well-known` | Nothing | Rewrites `static/.well-known/site.standard.publication` from env | Well-known file only — redeploy to go live |
| `pnpm publish-thought <slug>` | Creates or **updates** one `site.standard.document` | On **first** publish only: adds `atprotoRkey` to that post’s frontmatter | HTML unchanged until you `pnpm build` and deploy |
| `pnpm publish-thoughts` | Same as above, for every non-draft `.md` in `src/content/thoughts/` | Writes `atprotoRkey` for any post that did not have one yet | HTML unchanged until you `pnpm build` and deploy |

**Create vs update (posts):** If frontmatter already has `atprotoRkey`, publish commands call `updateDocument` on that record (same AT-URI, new content, `updatedAt`). If there is no `atprotoRkey`, they create a new document and save the rkey into the `.md` file. Do not remove `atprotoRkey` unless you intend to publish a second copy on ATProto.

**Drafts:** Posts with `draft: true` are skipped by publish commands.

**Verification:** [site-validator.fly.dev](https://site-validator.fly.dev/) checks **individual post URLs** (e.g. `https://michaelschultz.com/thoughts/laptops-in-schools/`), not the `/thoughts/` index. After `pnpm build`, `scripts/postbuild.mjs` injects `<link rel="site.standard.document" href="at://...">` into each prerendered post that has `atprotoRkey` in frontmatter (DID is read from `static/.well-known/site.standard.publication`). `PUBLIC_ATPROTO_DID` in env is optional.

### One-time: create the publication

```bash
pnpm publish-publication
```

Add the printed values to `.env` and GitHub Environment secrets:

- `PUBLIC_ATPROTO_DID`
- `PUBLIC_PUBLICATION_RKEY`

If you already published once and only need to refresh the well-known file:

```bash
pnpm write-well-known
```

### Publish or update posts

After editing markdown locally:

```bash
pnpm publish-thought laptops-in-schools   # one post
pnpm publish-thoughts                     # all non-draft posts
```

Safe to re-run `publish-thoughts` after changes — posts with an `atprotoRkey` are updated in place, not duplicated.

Commit any new `atprotoRkey` values in frontmatter, then rebuild and deploy so the live site matches ATProto and serves verification tags:

```bash
pnpm build
```

Validate a live post URL (with trailing slash) at [site-validator.fly.dev](https://site-validator.fly.dev/).

## Docker

```bash
cp .env.example .env
# edit .env

docker compose up -d --build
```

The container serves the app on port **3000**. Attach your own reverse proxy for TLS and public routing. Listening data is stored in the `listening-data` Docker volume.

Production configuration for this site is managed outside the repo (GitHub Environment secrets and deploy automation). Do not commit `.env` files.

## Project structure

- `src/routes/` — pages and API routes
- `src/content/thoughts/` — blog posts (`.md`)
- `src/lib/content/` — work, games, and post metadata
- `src/lib/listening/` — Last.fm sync and SQLite cache
- `src/lib/bluesky/` — Bluesky status fetch + cache
- `deploy/` — deployment scripts
