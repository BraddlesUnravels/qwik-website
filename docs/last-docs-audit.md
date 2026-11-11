# Documentation audit

I checked this documentation against `main` at `1526614`. The README covers setup and points to the guides under `doc/`. I moved the deployment runbook from `docs/` and checked the release steps against the GitHub workflows, Docker files and IaC workload contract.

## Follow-up items

| Area             | Finding                                                                                                                                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sitemap          | The built Bun server returned an empty `/sitemap.xml`. The generated file in `dist/` takes precedence over the dynamic route. The dynamic response also falls back to `https://localhost`, puts commas between entries and writes the current time as `lastmod`. `robots.txt` points to a misspelled URL. |
| Canonical URLs   | The page metadata helper reads `PUBLIC_SITE_URL` at build time. The Dockerfile and release workflow have no build argument for it.                                                                                                                                                                        |
| Health endpoint  | `GET /health` returned 200 with `ok` and `no-store`. `HEAD /health` returned 404. The HEAD unit test calls the handler directly, and the deployment probes use GET.                                                                                                                                       |
| Media placement  | The header silently skips arrays even though `Project.videos` allows them. Use a single header video or a section array. Autoplay clips have no native play button if browser preferences prevent playback.                                                                                               |
| Catalog order    | The supporting-project list drops the last non-featured entry to hide the approach page. Adding a project after that entry can hide the new project instead.                                                                                                                                              |
| Browser coverage | The AutoDash visit in `projects.cy.ts` has its heading and image assertions commented out. `media.cy.ts` has separate checks for autoplay, mobile layout and the fallback link.                                                                                                                           |

## Checks

- Formatting, lint, types, `bun run test.unit` and `bun run build.docker` passed. Vitest passed 130 tests across 14 files.
- The home page, engineering approach and all ten project pages returned 200 from the built Bun server. An unknown project returned 404. The trailing-slash AutoDash URL returned 301.
- A built AutoDash MP4 returned 200 for GET and HEAD, 206 for a valid byte range and 416 for a range beyond the file.
- Cypress could not unpack its downloaded executable. Docker was unavailable. The local HTTP checks used the Bun build directly.
