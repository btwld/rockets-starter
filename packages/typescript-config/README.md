# typescript-config

Shared TypeScript configs for **Rockets Starter** monorepo.

## Contents

| File | Used by |
|------|---------|
| `base.json` | Base options shared by all apps |
| `nestjs.json` | `apps/api` (NestJS) |
| `nextjs.json` | `apps/web` (Next.js) |

## Usage

In `apps/api` or `apps/web`, extend in `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/nestjs.json"
}
```

(Adjust package name if you use a different workspace name.)
