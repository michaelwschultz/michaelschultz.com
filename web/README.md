# michaelschultz.com (SvelteKit)

Static site built with SvelteKit, mdsvex, Tailwind, and Pagefind.

## Development

```bash
cd web
pnpm install
pnpm dev
```

Runs at http://localhost:5173. Compare with the Next.js site at repo root (`pnpm dev` on :3000).

Search (Pagefind) is only available after a production build:

```bash
pnpm build
pnpm preview
```

## Environment

Copy `.env.example` to `.env` and set `PUBLIC_UMAMI_ID` for analytics.

## Content

- Thoughts: `src/content/thoughts/*.svx`
- Work / games data: `src/lib/content/`
- Site config: `src/lib/config/`
