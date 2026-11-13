# Testing

I use Vitest for logic and rendered output I can check in isolation. Playwright checks behaviour that depends on a browser, including navigation, video playback and the analytics worker.

| Suite      | Where it lives                | What it covers                                                                                                                                                                   |
| ---------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vitest     | [test/](../test/)             | Media helpers, Qwik component rendering, origin handling, demo URL configuration, SEO and health handlers.                                                                       |
| Playwright | [playwright/](../playwright/) | Home content, the technology carousel, project routing, mobile navigation, video playback including the fallback link, and the Partytown analytics worker and its failure modes. |

The portfolio’s Access Control Demo write-up refers to Playwright in the separate demo project. The scripts and CI in this repo use Vitest and Playwright.

## Run checks

```sh
bun run test.unit
bun run test.e2e
bun run ci
```

Use `bun run test.unit.watch` while editing tests and `bun run test.unit.coverage` to generate the HTML coverage report under `coverage/`. `bun run test.all` runs both suites. `bun run ci` also runs formatting, lint, type checking and the build.

Playwright runs Chromium against the production build. `bun run test.e2e` builds the client and Bun server with `PUBLIC_GA_MEASUREMENT_ID=G-TEST123456`, then serves it on port 4177. Google endpoints are stubbed, so the specs make no real analytics requests. Partytown cannot run its service worker under the Vite dev server, which is why the specs use the production build. If Playwright reports a missing browser, run `bunx playwright install chromium` from the repo root. The HTML report is written to `playwright-report/`.

For a focused check of the media regression tests, run `node scripts/test-media-mutations.mjs`. The [script](../scripts/test-media-mutations.mjs) applies deliberate changes in a temporary copy and writes its results to `test-results/media-mutations.json`.

## Hooks and CI

The [pre-commit hook](../.husky/pre-commit) checks formatting, lint and types. The [pre-push hook](../.husky/pre-push) runs `test.all`. [GitHub CI](../.github/workflows/ci.yml) runs on pull requests and pushes to `main`. The `stage` label adds a separate [container check](../.github/workflows/integration.yml).

The unit tests call some route handlers directly. For the status and headers a real request receives, run the [built container](deployment.md#check-the-container-locally) and check it over HTTP. The health probe and MP4 range requests are useful checks here.
