![michael-schultz-social](static/static/images/michael-schultz-social.jpg)

# michaelschultz.com

Personal site of [Michael Schultz](https://michaelschultz.com) — portfolio, writing, projects, and a live [/listening](https://michaelschultz.com/listening) page backed by Last.fm.

Built with **SvelteKit**, **Tailwind CSS**, and **mdsvex** for markdown posts. Most pages are prerendered; `/listening` is server-rendered and backed by SQLite.

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

The listening page syncs recent plays from Last.fm into SQLite on a schedule and when the cache is stale. An in-process cron job handles most updates; `CRON_SECRET` is only needed if you want to trigger syncs over HTTP.

Manual sync while the dev server is running:

```bash
pnpm sync:listening
```

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
- `src/content/thoughts/` — blog posts (`.svx`)
- `src/lib/content/` — work, games, and post metadata
- `src/lib/listening/` — Last.fm sync and SQLite cache
- `deploy/` — deployment scripts
