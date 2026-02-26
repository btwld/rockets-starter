# eslint-config

Shared ESLint configs for **Rockets Starter** monorepo.

## Contents

| File | Used by |
|------|---------|
| `nest.js` | `apps/api` (NestJS) |
| `next.js` | `apps/web` (Next.js) |

## Usage

In `apps/api` or `apps/web`, extend in `.eslintrc.js` or `eslint.config.mjs`:

- **NestJS**: `extends: ['path to packages/eslint-config/nest.js']` or the workspace package name.
- **Next.js**: `extends: ['next', 'path to packages/eslint-config/next.js']` or the workspace package name.

(Adjust paths or package name to match your workspace.)
