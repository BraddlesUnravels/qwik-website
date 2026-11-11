# Testing

I use Vitest for logic and rendered output I can check in isolation. Cypress checks behaviour that depends on a browser, including navigation and video playback.

| Suite             | Where it lives                                    | What it covers                                                                                             |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Vitest            | [test/](../test/)                                 | Media helpers, Qwik component rendering, origin handling, demo URL configuration, SEO and health handlers. |
| Cypress component | Co-located `*.cy.tsx` files under [src/](../src/) | The toolkit carousel mounts in a browser and exposes its labels and landmark.                              |
| Cypress E2E       | [cypress/e2e/](../cypress/e2e/)                   | Home content, project routing, mobile navigation and video playback, including the fallback link.          |

The portfolio’s Access Control Demo write-up refers to Playwright in the separate demo project. The scripts and CI in this repo use Vitest and Cypress.

## Run checks

```sh
bun run test.unit
bun run test.ct
bun run test.e2e
bun run ci
```

Use `bun run test.unit.watch` while editing tests and `bun run test.unit.coverage` to generate the HTML coverage report under `coverage/`. `bun run test.all` runs all three suites. `bun run ci` also runs formatting, lint, type checking and the build.

Cypress E2E starts a separate Vite SSR server on port 5174. The strict port setting makes it fail if another process already owns the port. If Cypress reports a missing executable, run `bun x --no-install cypress install` from the repo root.

For a focused check of the media regression tests, run `node scripts/test-media-mutations.mjs`. The [script](../scripts/test-media-mutations.mjs) applies deliberate changes in a temporary copy and writes its results to `test-results/media-mutations.json`.

## Hooks and CI

The [pre-commit hook](../.husky/pre-commit) checks formatting, lint and types. The [pre-push hook](../.husky/pre-push) runs `test.all`. [GitHub CI](../.github/workflows/ci.yml) runs on pull requests and pushes to `main`. The `stage` label adds a separate [container check](../.github/workflows/integration.yml).

The unit tests call some route handlers directly. For the status and headers a real request receives, run the [Bun build](development.md) and check it over HTTP. The health probe and MP4 range requests are useful checks here.
