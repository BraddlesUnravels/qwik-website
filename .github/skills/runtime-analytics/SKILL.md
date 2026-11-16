---
name: runtime-analytics
description: Change or troubleshoot runtime configuration, request-origin handling, SEO, sitemap, health responses, caching, or Google Analytics/Partytown.
---

# Runtime and analytics

Use for configuration or HTTP behaviour that crosses the Vite build, Qwik City, Bun server, or Partytown boundary. Read [docs/runtime.md](../../../docs/runtime.md) and [docs/analytics.md](../../../docs/analytics.md) as applicable.

- Separate build-time `PUBLIC_*` settings from values read by Bun at runtime. Never put secrets in `PUBLIC_` or `VITE_` variables.
- Keep server-only checks in the server boundary. Do not treat UI visibility as access control.
- Analytics is optional and worker-only. Preserve the disabled/malformed configuration behaviour and the policy that blocks Partytown's page-context fallback. Any CSP change needs response-level tests and browser checks; keep external analytics endpoints stubbed in tests.
- When changing origin trust, update the exact-host allowlist and its tests. Do not trust client-supplied `Origin` or forwarded headers to choose the server's canonical origin.
- When touching sitemap, health, caching, or static-file routing, verify the built Bun HTTP response; direct handler tests do not prove production routing. The runtime guide records known build/route caveats.

Use focused Vitest tests first. Run Playwright for worker or browser behaviour and `bun run ci` when the change affects the full build or response contract.
