# Analytics

I load Google Analytics 4 through Partytown, so the Google script runs in a web worker instead of on the page.

## Configuration

`PUBLIC_GA_MEASUREMENT_ID` holds the GA4 measurement ID. Vite reads it at build time, so changing it needs a rebuild. In Docker it is a build argument, not a runtime variable:

```sh
docker build --build-arg PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX -f docker/Dockerfile .
```

[analytics.ts](../src/lib/analytics.ts) trims the value and accepts only `G-` followed by uppercase letters and digits. A missing or malformed value disables analytics. The page then has no Google tags and the server sends no Content Security Policy header.

## Worker-only execution

The two GA tags in [root.tsx](../src/root.tsx) are `type="text/partytown"` with `data-ptworkeronly`, so Partytown runs them only in its worker and never copies them into the page. `dataLayer.push` is forwarded to the worker. Google signals and ad personalization are turned off.

An inline bootstrap script starts Partytown after the window `load` event, in its own task. Analytics therefore stays off the initial load path.

## Content Security Policy

For HTML responses, [entry.bun.ts](../src/entry.bun.ts) sets `Content-Security-Policy: script-src 'self' 'unsafe-inline'; frame-src 'self'`. It is not XSS protection. If the worker fails to fetch or run the GA script, Partytown retries it in the page context. The policy blocks that retry, so the GA script stays out of the page.

The policy is sent only when analytics is enabled. A third-party script or iframe added later would work with analytics off and be blocked with it on. Today the site has no external scripts or iframes. The only inline script outside `root.tsx` comes from [router-head.tsx](../src/components/router-head/router-head.tsx), which renders route-supplied head scripts, and no route supplies any. Update the policy and its tests before adding an embed.

## Partytown assets

[partytown.ts](../src/config/partytown.ts) holds `PARTYTOWN_LIBRARY_PATH`, which is `/~partytown/<version>/`. The Vite build copies the Partytown files there, the bootstrap script points at it, and the tests and smoke scripts take it from the same place. A [unit test](../test/config/partytown.test.ts) fails when the path and the installed `@qwik.dev/partytown` version disagree, so update both together.

The version in the path makes most files safe to cache as immutable. The Bun entry serves `partytown-sw.js` with `max-age=0, must-revalidate`, because a registered service worker outlives page loads. The assets are not precompressed, since the gzip step covers only `/assets` and `/build`.

## Testing

Unit tests cover the measurement ID validation, the Content Security Policy header and the Partytown path. Playwright covers the worker-only behaviour, the delayed bootstrap and the blocked fallback, with Google endpoints stubbed. The release workflow also runs [smoke scripts](../.github/scripts/) against the built and published images. See [Testing](testing.md).
