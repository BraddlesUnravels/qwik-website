# qwik-website

Personal portfolio for **Bradley Laskey**, built with Qwik and Qwik City. The
site presents selected projects, supporting work, an engineering approach page,
and a technical toolkit carousel.

## Stack

| Layer           | Choice                                                                                |
| --------------- | ------------------------------------------------------------------------------------- |
| Framework       | `@builder.io/qwik` / `@builder.io/qwik-city` `1.20.0`                                 |
| Bundler         | Vite 7                                                                                |
| Language        | TypeScript 5.9                                                                        |
| Styling         | Tailwind CSS v4 via `@tailwindcss/vite`                                               |
| UI primitives   | `@qwik-ui/headless` (available, not currently used by the site)                       |
| Unit tests      | Vitest 5 + `@builder.io/qwik/testing`                                                 |
| Component / e2e | Cypress 15 + `cypress-ct-qwik`                                                        |
| Lint / format   | ESLint 9 flat config + `eslint-plugin-qwik`, Prettier + `prettier-plugin-tailwindcss` |
| Package manager | Bun (`packageManager`: `bun@1.3.12`)                                                  |

Use Bun `1.3.12` as declared by `packageManager`. When running under Node,
follow Vite 7's supported versions: Node `20.19+` or `22.12+`. The broader
Node range currently declared in `package.json` does not reflect Vite 7's
runtime requirement.

## Current features

- **Home page** (`src/routes/index.tsx`): introduction, selected and supporting
  project cards, engineering approach section, and mobile back-to-top control.
- **Project pages** (`src/routes/projects/[slug]/index.tsx`): data-driven pages
  with project summaries, metrics, responsive images, implementation sections,
  technologies, and related links.
- **Engineering approach** (`src/routes/about/approach/index.tsx`): standalone
  page about the workflow and business context behind the portfolio.
- **Navigation** (`src/components/layout/`): responsive desktop and mobile
  navigation, résumé download, and contact link.
- **Technology carousel** (`src/components/ui/technology-carousel.tsx`):
  continuously scrolling toolkit logos and labels, with reduced-motion support.
- **Health endpoint** (`src/routes/health/index.ts`): `/health` returns `ok`
  for deployment health checks.
- **SEO and caching**: route metadata is defined with shared helpers; the root
  route layout configures SSR cache headers.
- **Project content and media**: typed project data lives in
  `src/content/projects/`; images and diagrams live in `src/media/`.

Production uses the Bun server adapter (`adapters/bun`) and a release-driven
deploy path documented in [docs/deployment.md](docs/deployment.md). Release
workflows publish the image and dispatch deployment evidence to the shared IaC
repository; this repository does not own Azure infrastructure.

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
bun run test.e2e          # start dedicated dev server and run Cypress E2E
bun run test.e2e.open     # start dedicated dev server and open Cypress E2E
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

Optional PR label `stage` still runs `.github/workflows/integration.yml`
container checks. Production releases rebuild and smoke-test the image in
`.github/workflows/release.yml` against the released tag.

## Production deployment

See [docs/deployment.md](docs/deployment.md). In short: publish a stable
`vX.Y.Z` release or run `workflow_dispatch` on `main`; the source workflow
verifies, tests, and publishes `qwik-website:<sha>`, then dispatches
`single-container-web-release-v1` to `BraddlesUnravels/iac` for planning and
deployment to `rg-platform-production`.

## Testing

### Vitest (unit)

- Configuration lives in `vite.config.ts` under `test`.
- Specs live under `test/`.
- Qwik component tests use `createDOM` from `@builder.io/qwik/testing`.

```bash
bun run test
```

### Cypress

- Configuration: `cypress.config.ts`.
- E2E specs: `cypress/e2e/**/*.cy.ts` against `http://localhost:5174`.
- Component specs: co-located `src/**/*.cy.tsx` via `cypress-ct-qwik`.
- The E2E script starts Vite with `--strictPort` on port `5174` so it fails
  rather than silently using another server if the port is occupied.

```bash
bun run test.ct
bun run test.e2e
```

## Structure

```text
cypress/
  e2e/                    Cypress end-to-end specs
  support/                e2e + component support files
docs/
  deployment.md           release and deployment runbook
public/
  markdown/               published Markdown project write-ups
  Bradley_Laskey_...pdf   downloadable résumé
  favicon.ico             browser icon
  apple-touch-icon.png     home-screen icon
  manifest.json           web app manifest
  robots.txt
src/
  components/
    content/              data-driven project page components
    layout/               site header, navigation, and footer
    router-head/          document <head> wiring
    ui/                   shared UI and technology carousel
  content/
    projects/              typed project write-ups
    catalog.ts             home-page project summaries
  media/                  imported project images, diagrams, and logos
  routes/
    index.tsx              home / portfolio page
    layout.tsx             root layout + cacheControl
    about/approach/        engineering approach page
    projects/[slug]/       project detail pages
    health/                deployment health endpoint
test/                     Vitest unit suite
```

Path alias: `~/` maps to `src/` (see `tsconfig.json` / `vite-tsconfig-paths`).

## Design notes

- Technology carousel items and logo imports are defined in
  `src/components/ui/technology-carousel.tsx` and `src/media/logos/`.
- The site uses a dark theme with shared tokens and utilities in
  `src/theme/base.css`.
- Project summaries are listed in `src/content/catalog.ts`; detailed content
  and image metadata are in `src/content/projects/`.

## Bun server

The app uses the Bun server adapter. After running a full build, preview the
build with:

```bash
bun run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/).

The Bun adapter bundles SSR dependencies into the server output. Keep this
behavior when adding UI libraries: the production image installs only production
dependencies, so external imports of development-only packages will fail at
startup even if development-server tests pass.

To check the production container locally:

```bash
docker compose -f docker/docker-compose.yml up --build -d --wait website
curl --fail http://localhost:3000/health
curl --fail http://localhost:3000/
curl --fail http://localhost:3000/projects/access-control-demo
docker compose -f docker/docker-compose.yml down
```

The `stage`-labelled Integration workflow performs these checks on pull requests.
