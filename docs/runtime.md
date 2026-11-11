# Runtime configuration

Use [env.example](../env.example) as a starting point. Vite reads public settings at build time. Bun reads server settings when the application runs.

| Setting                                      | What it controls                                                                    |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| `HOST`, `PORT`                               | Bun’s bind address and port. Defaults are `0.0.0.0` and `3000`.                     |
| `HOST_PORT`                                  | Host port published by Docker Compose. The container still listens on 3000.         |
| `NODE_ENV`                                   | Set to `production` in the container.                                               |
| `PUBLIC_SITE_URL`                            | Absolute site origin for canonical and Open Graph URLs, read by Vite at build time. |
| `AZURE_CUSTOM_DOMAIN`                        | Bare hostname used by the dynamic sitemap generator.                                |
| `ACA_DEMO_ACCESS_LINK`                       | Full demo URL or template evaluated by the server action.                           |
| `ACA_DEMO_DOMAIN`, `ACA_GENERAL_ACCESS_CODE` | Values used by the standard demo URL template.                                      |

Keep secrets out of `PUBLIC_` and `VITE_` settings because Vite can expose those to the browser. The integration workflow uses `ORIGIN` as the base URL for smoke checks. The Bun entry derives request origins from the request URL and its trusted hosts.

## Live demo redirect

“Try the live demo” on `/projects/access-control-demo` submits a Qwik City server action. The action resolves `ACA_DEMO_ACCESS_LINK` through [demo-access.ts](../src/lib/demo-access.ts) and sends a 302 redirect. Missing or invalid configuration returns a 503 from the action and shows an error on the page.

The standard template is `{{ACA_DEMO_DOMAIN}}/?code={{ACA_GENERAL_ACCESS_CODE}}`. In Azure, the IaC workload supplies the domain and template and reads the code from Key Vault. The browser receives the code in the redirect URL. The demo application handles its own access gate and authorisation.

## HTTPS behind Azure ingress

Azure terminates TLS before forwarding to Bun. [server-origin.ts](../src/lib/server-origin.ts) restores the HTTPS scheme for the exact apex and `www` hosts on its allowlist. Qwik City uses the resulting request URL for its same-origin check. Update the allowlist and its [tests](../test/lib/server-origin.test.ts) when changing the production domains.

## SEO and sitemap

[seo.ts](../src/lib/seo.ts) builds the page title, description and social metadata. It adds canonical and `og:url` tags when `PUBLIC_SITE_URL` is set for the build. The current Dockerfile and release workflow have no build argument for that value. The separate `absoluteUrl()` helper reads `siteConfig.url`, which is still unset.

The [dynamic sitemap handler](../src/routes/sitemap.xml/index.ts) reads the home page and catalog paths. Its generator falls back to `https://localhost` when `AZURE_CUSTOM_DOMAIN` is unset, inserts commas between URL entries and writes the current time as `lastmod`.

The Bun production build emits an empty `dist/sitemap.xml`. Static file handling serves that file before the dynamic route runs. [robots.txt](../public/robots.txt) also points to a misspelled sitemap URL. Check the built HTTP response when working on sitemap changes.

## Caching and health

The [root layout](../src/routes/layout.tsx) sets a five-second public cache for page GETs and allows stale responses for one hour while revalidating. Bun gives static files a one-year immutable cache, which matters when replacing a file at the same URL.

The container probes `GET /health`, which returns 200 with `ok` and `Cache-Control: no-store`. The HEAD handler passes its unit test, but `HEAD /health` returned 404 on the built Bun server.
