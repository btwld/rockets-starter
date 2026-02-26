# Rockets Starter — API

NestJS 11 backend for **Rockets Starter**: TypeORM, PostgreSQL, Rockets Auth and Concepta (CRUD, access control). Runs on port **3001**.

## Quick start

From repo root:

```bash
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env (DATABASE_URL, etc.)
yarn dev:api
```

Or from this folder:

```bash
cp .env.example .env
yarn install
yarn dev
```

## Stack

- **NestJS 11** — API framework
- **TypeORM** — PostgreSQL, migrations
- **Rockets Auth** — Auth, user/role, invitations, OTP
- **Concepta** — CRUD, typeorm-ext, access-control (ACL in `src/app.acl.ts`)

## Database

- **PostgreSQL** (see [Database Setup](#database-setup) below).
- Migrations: `yarn migration:run`, `yarn migration:generate ./src/migrations/Name`
- Seeding: `yarn seed:run`, `yarn sandbox:init` (migrations + seed)

## Database setup

1. Create DB: `createdb rockets-starter` (or `CREATE DATABASE "rockets-starter";` in psql).
2. Copy `.env.example` to `.env` and set `DATABASE_URL=postgresql://user:pass@localhost:5432/rockets-starter`.
3. Run `yarn sandbox:init` (or `yarn migration:run` then `yarn seed:run`).

Config: `src/config/typeorm.settings.ts`, `src/config/rockets-auth.settings.ts`, `src/config/rockets.settings.ts`.

## Scripts

| Script | Purpose |
|--------|---------|
| `yarn dev` | Start with watch (port 3001) |
| `yarn build` | Compile for production |
| `yarn start:prod` | Run compiled app |
| `yarn test` | Unit tests |
| `yarn test:e2e` | E2E tests |
| `yarn migration:run` | Run pending migrations |
| `yarn seed:run` | Run seeders |
| `yarn sandbox:init` | Migrations + seed |

## Project layout

- `src/app.module.ts` — Root module (RocketsAuthModule, RocketsModule, ACL)
- `src/app.acl.ts` — Roles and resources (AppRole, AppResource, acRules)
- `src/access-control.service.ts` — User/roles for ACL guard
- `src/modules/` — User, role, invitation (SDK-managed); add new feature modules here (see root [AGENTS.md](../../AGENTS.md) and [btwld/skills](https://github.com/btwld/skills))

## Docs

- Monorepo: [README](../../README.md), [AGENTS.md](../../AGENTS.md)
- Guides and generation: [btwld/skills](https://github.com/btwld/skills)
