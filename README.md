# qwik-website

Personal portfolio landing page for **Bradley Laskey**, built with Qwik and Qwik City.

The site currently ships a dark single-page intro with a continuous technology carousel of logos and labels for languages, front-end, back-end, databases, data access, testing, and DevOps tools.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | `@builder.io/qwik` / `@builder.io/qwik-city` `1.20.0` |
| Bundler | Vite 7 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| UI primitives | `@qwik-ui/headless` (available, not wired into the home page yet) |
| Lint / format | ESLint 9 flat config + `eslint-plugin-qwik`, Prettier + `prettier-plugin-tailwindcss` |
| Package manager | Bun (`packageManager`: `bun@1.3.12`) |

Node `^18.17.0 || ^20.3.0 || >=21.0.0` or Bun `>=1.1.0`.

## Current features

- **Home route** (`src/routes/index.tsx`): centered welcome copy, name heading with gradient accent, short tagline
- **Technology carousel** (`src/components/ui/technology-carousel.tsx`): CSS-driven infinite horizontal scroll of tech logos, pauses on hover, respects `prefers-reduced-motion`
- **Dark shell** (`src/routes/layout.tsx`): full-height `zinc-950` layout with short cache headers for SSR
- **Document head** (`src/components/router-head/router-head.tsx`): title, meta, canonical, viewport
- **Static assets**: SVG logos under `public/icon/logo/`, web app manifest, robots.txt

No deploy adapter is configured yet. Production builds use the default Qwik City preview path until one is added with `bun run qwik add`.

## Setup

```bash
bun install
```

## Scripts

```bash
bun start            # dev server with SSR (opens browser)
bun run dev          # same without auto-open
bun run dev.debug    # Vite SSR with Node inspector
bun run build        # production client + SSR build
bun run preview      # build preview adapter output and serve it
bun run lint         # ESLint over src/**/*.ts*
bun run build.types  # tsc --noEmit
bun run fmt          # Prettier write
bun run fmt.check    # Prettier check
```

## Structure

```text
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
  lib/                    reserved shared helpers (empty)
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
4. Add a deploy adapter when ready: `bun run qwik add`
5. Tighten SEO (favicon, Open Graph, richer `DocumentHead`)
