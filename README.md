![michael-schultz-social](/public/static/images/michael-schultz-social.jpg)

# Home on the net
Hey I'm Michael, a software engineer and designer. I love building things that try to solve real problems and hack on things that don't. I've always got a bunch of projects going on. Reach out if you find something here you're interested in and want to know more or talk about over coffee ☕.

You can run this site locally by running `pnpm dev` and visiting `http://localhost:5173`. Check it out at [michaelschultz.com](https://michaelschultz.com).

![Alt](https://repobeats.axiom.co/api/embed/4d2560fc21344db7bfe7207c5773071f884f95e1.svg "Repobeats analytics image")

## Development

Requires **Node.js 24.x** (see `.nvmrc`). With [nvm](https://github.com/nvm-sh/nvm): `nvm install && nvm use`.

```bash
pnpm install
pnpm dev
```

Search (Pagefind) is only available after a production build:

```bash
pnpm build
pnpm start
```

## Environment

Copy `.env.example` to `.env` and configure:

- `LASTFM_API_KEY` — Last.fm API key for `/listening`
- `LASTFM_USER` — Last.fm username (default: `michaelschultz`)
- `CRON_SECRET` — protects `GET /api/cron/sync-listening`
- `DATABASE_PATH` — SQLite path (default: `./data/listening.db`)

## Listening page

Recent plays are synced from Last.fm into SQLite about five times per day via an in-process cron job. On first load (or when the cache is stale), `/listening` triggers a sync if `LASTFM_API_KEY` is set.

Manual sync while the server is running:

```bash
pnpm sync:listening
```

## Docker deployment

On the VPS the app lives at `/root/michaelschultz.com`. Public traffic and TLS are handled by Pangolin over the shared `pangolin` Docker network (no nginx).

```bash
cd /root/michaelschultz.com
cp .env.example .env
# edit .env with LASTFM_API_KEY, etc.

docker compose up -d --build
```

GitHub Actions deploys on push to `main`: SSH to the VPS, pull `main`, and run `deploy/deploy.sh`.

The container listens on port 3000 inside the `pangolin` network. Configure Pangolin to route `michaelschultz.com` to this service.

Listening data persists in the `listening-data` Docker volume at `/app/data/listening.db`.
