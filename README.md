# qwik-website

Personal portfolio landing page for **Bradley Laskey**, built with Qwik and Qwik City.

The site currently ships a dark single-page intro with a continuous technology carousel of logos and labels for languages, front-end, back-end, databases, data access, testing, and DevOps tools.

## Stack

| Layer           | Choice                                                                                |
| --------------- | ------------------------------------------------------------------------------------- |
| Framework       | `@builder.io/qwik` / `@builder.io/qwik-city` `1.20.0`                                 |
| Bundler         | Vite 7                                                                                |
| Language        | TypeScript 5.9                                                                        |
| Styling         | Tailwind CSS v4 via `@tailwindcss/vite`                                               |
| UI primitives   | `@qwik-ui/headless` (available, not wired into the home page yet)                     |
| Unit tests      | Vitest 5 + `@builder.io/qwik/testing`                                                 |
| Component / e2e | Cypress 15 + `cypress-ct-qwik`                                                        |
| Lint / format   | ESLint 9 flat config + `eslint-plugin-qwik`, Prettier + `prettier-plugin-tailwindcss` |
| Package manager | Bun (`packageManager`: `bun@1.3.12`)                                                  |

Node `^18.17.0 || ^20.3.0 || >=21.0.0` or Bun `>=1.1.0`.

## Current features

- **Home route** (`src/routes/index.tsx`): centered welcome copy, name heading with gradient accent, short tagline
- **Technology carousel** (`src/components/ui/technology-carousel.tsx`): CSS-driven infinite horizontal scroll of tech logos, pauses on hover, respects `prefers-reduced-motion`
- **Dark shell** (`src/routes/layout.tsx`): full-height `zinc-950` layout with short cache headers for SSR
- **Document head** (`src/components/router-head/router-head.tsx`): title, meta, canonical, viewport
- **Static assets**: SVG logos under `public/icon/logo/`, web app manifest, robots.txt

Production uses the Bun server adapter (`adapters/bun`) and a release-driven deploy path documented in `docs/deployment.md`. Stable GitHub Releases build/push the image and dispatch the reusable IaC repository; this app repo does not own Azure Bicep.

## Setup

```bash
bun install
```

## Scripts

```bash
bun start                 # dev server with SSR (opens browser)
bun run dev               # same without auto-open
bun run dev.debug         # Vite SSR with Node inspector
bun run build             # production client + SSR build
bun run preview           # build preview adapter output and serve it
bun run lint              # ESLint over src/**/*.ts* and test/**/*.ts*
bun run build.types       # tsc --noEmit
bun run fmt               # Prettier write
bun run fmt.check         # Prettier check
bun run test              # Vitest unit suite (single run)
bun run test.unit.watch   # Vitest watch mode
bun run test.unit.ui      # Vitest UI
bun run test.unit.coverage
bun run test.ct           # Cypress component tests (headless)
bun run test.ct.open      # Cypress component tests (interactive)
bun run test.e2e          # start dev server, run Cypress e2e headless
bun run test.e2e.open     # start dev server, open Cypress e2e
bun run test.all          # unit + component + e2e
bun run ci                # full CI suite (format, lint, types, unit, build, ct, e2e)
```

## Continuous integration

Pull requests and pushes to `main` run `.github/workflows/ci.yml` with Bun:

1. `fmt.check`
2. `lint`
3. `build.types`
4. `test.unit`
5. `build`
6. `test.ct`
7. `test.e2e`

Run the same sequence locally with `bun run ci`.

Optional PR label `stage` still runs `.github/workflows/integration.yml` container checks. Production releases always rebuild and smoke-test the image in `.github/workflows/release.yml` against the released tag.

## Production deployment

See `docs/deployment.md`. Summary: publish a stable `vX.Y.Z` release → source workflow verifies/tests/pushes `qwik-website:<sha>` → `repository_dispatch` to `BraddlesUnravels/iac` → IaC plans and deploys.

## Testing

### Vitest (unit)

- Config lives in `vite.config.ts` under `test`
- Specs live under `test/` and mirror `src/`
- Qwik component tests use `createDOM` from `@builder.io/qwik/testing`

```bash
bun run test
```

### Cypress

- Config: `cypress.config.ts`
- E2E specs: `cypress/e2e/**/*.cy.ts` against `http://localhost:5173`
- Component specs: co-located `src/**/*.cy.tsx` via `cypress-ct-qwik`

```bash
bun run test.ct
bun run test.e2e
```

## Structure

```text
cypress/
  e2e/                    end-to-end specs
  fixtures/
  support/                e2e + component support files
test/                     Vitest suite mirroring src/
inspiration/              design reference screenshots (not served)
public/
  icon/logo/              technology SVG logos used by the carousel
  image/                  reserved for future media
  manifest.json           PWA-style web manifest
  robots.txt
raw-content/              scratch / content staging (empty)
src/
  components/
    router-head/          document <head> wiring
    ui/
      technology-carousel.tsx
      technology-carousel.cy.tsx
  lib/                    shared helpers
  routes/
    index.tsx             home / portfolio landing
    layout.tsx            root layout + cacheControl
  entry.dev.tsx           client-only dev entry
  entry.ssr.tsx           SSR entry
  entry.preview.tsx       preview adapter entry
  root.tsx                QwikCity document shell
  global.css              Tailwind import + base html/body rules
```

Path alias: `~/` maps to `src/` (see `tsconfig.json` / `vite-tsconfig-paths`).

## Design notes

- Visual direction lives in `inspiration/` (Brad / Jacobson layout refs). Those files are local references only and are not part of the build output.
- Carousel tech list is defined inline in `technology-carousel.tsx` and points at `/icon/logo/*.svg`.
- Theme is dark-first (`bg-zinc-950` / slate fades on the carousel edges).

## Next steps

Likely follow-ups as the portfolio grows:

1. Expand sections beyond the intro (projects, about, contact)
2. Fill `public/image/` and wire project media
3. Use `@qwik-ui/headless` where interactive primitives help
4. After a verified custom domain exists, rebuild with `PUBLIC_SITE_URL` and re-enable SSG origin in a reviewed change
5. Tighten SEO (favicon, Open Graph, richer `DocumentHead`) once the canonical domain is set

## Bun Server

This app has a minimal [Bun server](https://bun.sh/docs/api/http) implementation. After running a full build, you can preview the build using the command:

```
bun run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)
