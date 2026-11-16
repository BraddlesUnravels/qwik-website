# Agent guidance

This is a server-rendered Qwik City portfolio. Use the pinned Bun toolchain (`bun@1.3.12`); do not substitute npm commands.

## Start here

- [README](../README.md) for setup and task routing.
- [Portfolio content](../docs/content.md), [media](../docs/media.md), [UI](../docs/ui.md), [testing](../docs/testing.md), [runtime](../docs/runtime.md), [analytics](../docs/analytics.md), and [deployment](../docs/deployment.md) are the detailed source of truth. Read only the guide relevant to the change; avoid copying it into agent instructions.
- On-demand workflows live in `.github/skills/`: `portfolio-content`, `project-media`, `runtime-analytics`, `release`, and `code-review`.

## Repository facts

- App routes are in `src/routes/`; reusable UI is in `src/components/`; typed portfolio content is in `src/content/`.
- Content and media changes have linked workflows in `docs/`; follow them rather than editing generated output or guessing import conventions.
- The project build and browser tests depend on Bun and a production build. Use `bun run test.unit` for focused logic/render tests, `bun run test.e2e` for browser behaviour, and `bun run ci` for the full check sequence; `ci` removes `dist/` at the end.
- Analytics configuration is build-time and changes the HTML response policy. Keep server-only configuration out of browser code; see `docs/analytics.md` and `docs/runtime.md` before changing those boundaries.
- This repository publishes a container image; the separate `BraddlesUnravels/iac` repository owns Azure deployment and live verification. See `docs/deployment.md`.

Prefer the smallest change that fits existing patterns. Don't duplicate general language/framework knowledge here; add only verified repository-specific guidance.
