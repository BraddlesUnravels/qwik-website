---
applyTo: "**/*.{test,spec}.{ts,tsx}"
---

# Test guidance

- Follow the existing `test/` layout for Vitest tests; use `playwright/` only for behaviour that needs a real browser. See [the testing guide](../../docs/testing.md) for what each suite covers and how the production browser build is served.
- Use `bun run test.unit` or `bun run test.e2e` for the relevant suite. Run `bun run ci` for the full check sequence when the change warrants it.
- Test observable behaviour, especially request/response contracts, accessibility, media fallback and third-party failure behaviour. Stub external analytics calls; tests must not send real requests.
- Use deterministic, isolated tests and accessible browser locators. Follow nearby test naming and assertions rather than introducing a new convention.
