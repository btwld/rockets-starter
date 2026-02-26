# Rockets Starter — Web

Next.js 16 frontend for **Rockets Starter**: TypeScript, Tailwind CSS, App Router. Runs on port **3000**.

## Quick start

From repo root:

```bash
yarn dev:web
```

Or from this folder:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** — React framework, App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **ESLint** — Linting (shared config from `packages/eslint-config`)

## Scripts

| Script | Purpose |
|--------|---------|
| `yarn dev` | Development server (port 3000) |
| `yarn build` | Production build |
| `yarn start` | Run production server |
| `yarn lint` | Run ESLint |
| `yarn type-check` | TypeScript check |

## Project layout

- `src/app/` — App Router (layout, page, globals.css)
- Shared config: `packages/typescript-config`, `packages/eslint-config`

## Docs

- Monorepo: [README](../../README.md)
- API: [apps/api/README.md](../api/README.md)
