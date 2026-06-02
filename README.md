![michael-schultz-social](/public/static/images/michael-schultz-social.jpg)

# Home on the net
Hey I'm Michael, a software engineer and designer. I love building things that try to solve real problems and hack on things that don't. I've always got a bunch of projects going on. Reach out if you find something here you're interested in and want to know more or talk about over coffee ☕.

You can run this site locally by running `yarn dev` and visiting `http://localhost:3000`. Check it out at [michaelschultz.com](https://michaelschultz.com).

Hosted on [Vercel](https://vercel.com).

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
pnpm preview
```

## Environment

Copy `.env.example` to `.env` and set `PUBLIC_UMAMI_ID` for analytics.
