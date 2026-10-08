# Deployment

Production deploys are **release-driven**. This repository owns tests, image
publish to the shared ACR, and `repository_dispatch` evidence. Azure apply lives
in [BraddlesUnravels/iac](https://github.com/BraddlesUnravels/iac).

Canonical IaC docs:

- `docs/workloads/single-container-web-runbook.md`
- `docs/workloads/qwik-website-runbook.md`

This repository does **not** contain Bicep, ARM, bootstrap scripts, or an Azure
apply workflow.

## Release triggers

| Trigger                                               | When                     | `releaseTag` sent to IaC |
| ----------------------------------------------------- | ------------------------ | ------------------------ |
| Stable GitHub Release `vX.Y.Z` (not draft/prerelease) | Normal audited release   | `vX.Y.Z`                 |
| `workflow_dispatch` on `main`                         | Operator hotfix / replay | `main`                   |

Do **not** auto-deploy on every push to `main`.

Both paths publish an immutable 40-character commit SHA image tag. IaC rejects
`latest` as a deploy identity.

Workflow:

```text
.github/workflows/release.yml
```

## Normal path

```text
Stable release published or manual main dispatch
  -> .github/workflows/release.yml
  -> verify source, run checks, build one production image
  -> smoke /health, /, case study, static asset, origin/CSRF checks
  -> OIDC publish to braddlesunravelsacr.azurecr.io/qwik-website:<40-char-sha>
  -> GitHub App token scoped to IaC repository
  -> repository_dispatch event_type=single-container-web-release-v1
  -> IaC deploy-single-container-release.yml
       verifies provenance, plans, (optionally) waits for approval, deploys, verifies HTTP
```

Source job success means **dispatch accepted / deployment pending**, not that
Azure is healthy. Final status is the IaC run.

## Source workflow responsibilities

| Step                                            | Owner                                        |
| ----------------------------------------------- | -------------------------------------------- |
| Stable release / protected tag or main dispatch | Maintainers                                  |
| Tests + Docker smoke                            | `release.yml` `verify-test-build-push`       |
| ACR push (repository-scoped writer)             | `image-publish` environment + publisher UAMI |
| Cross-repo dispatch                             | GitHub App installation token to IaC only    |
| Azure apply + live verification                 | IaC `deploy-single-container-release.yml`    |

## Required repository settings

| Name                           | Location                | Purpose                                                            |
| ------------------------------ | ----------------------- | ------------------------------------------------------------------ |
| `AZURE_PUBLISHER_CLIENT_ID`    | `image-publish` env var | Publisher managed identity client ID (`id-qwik-website-publisher`) |
| `AZURE_TENANT_ID`              | `image-publish` env var | Azure tenant                                                       |
| `AZURE_SUBSCRIPTION_ID`        | `image-publish` env var | Azure subscription                                                 |
| `IAC_DISPATCH_APP_ID`          | repository variable     | GitHub App ID used only to dispatch IaC                            |
| `IAC_DISPATCH_APP_PRIVATE_KEY` | repository secret       | GitHub App private key                                             |
| Environment `image-publish`    | repository environments | Scopes OIDC subject for publisher federated credential             |

Do not store ACR admin passwords, long-lived PATs, or Azure client secrets.

## Runtime configuration (Azure)

| Item                     | Value                                                         |
| ------------------------ | ------------------------------------------------------------- |
| Resource group           | `rg-platform-production`                                      |
| Stack                    | `single-container-web`                                        |
| ACA environment          | `acae-qwik-website-production`                                |
| Container app            | `aca-qwik-website-production`                                 |
| Primary custom domain    | `www.braddlesunravels.online`                                 |
| Additional custom domain | `braddlesunravels.online` (apex)                              |
| Default FQDN suffix      | `wonderfulsmoke-320e8626.australiaeast.azurecontainerapps.io` |
| Runtime / pull identity  | `id-qwik-website-pull`                                        |
| Key Vault                | `kv-acd-prod-braddles`                                        |
| Health probe             | `GET /health` (plain body `ok`)                               |

Demo-link non-secrets and the Key Vault-backed general access code are defined
in the IaC workload contract / catalog, not in this repository.

## Creating an approved release

1. Land reviewed changes on `main`.
2. Create an immutable protected tag matching `vMAJOR.MINOR.PATCH` **or** run
   `workflow_dispatch` on `main`.
3. For the tag path, publish a **stable** GitHub Release (not draft, not
   prerelease).
4. Watch `Publish release image and initiate deployment` in this repo.
5. Open the IaC Actions tab for **Deploy single-container-web release** and
   approve the protected `production` environment if configured.
6. Confirm IaC summary: digest, deployment name, live URL, `/health`, homepage,
   case study.

## Image tags

- Deployment image is always
  `braddlesunravelsacr.azurecr.io/qwik-website:<full-40-char-lowercase-sha>`.
- Runtime reference in Azure is the immutable digest form
  `.../qwik-website@sha256:<64-hex>`.
- `latest` is never used for deployment.
- Existing SHA tags are not overwritten; a collision reuses the existing digest
  when present.

## Health and SEO

- `GET/HEAD /health` returns plain `ok` with `cache-control: no-store`.
- Bun SSG remains disabled until a separate reviewed change opts into a fixed
  canonical `PUBLIC_SITE_URL` strategy.
- `siteConfig.url` / `absoluteUrl` must not emit placeholder hostnames.

## HTTPS origins behind Azure ingress

Azure terminates TLS before forwarding HTTP to Bun. The application owns the
trusted production origin array in `src/lib/server-origin.ts`: apex and `www`
are separate HTTPS origins. The Bun entry point uses `normalizeServerRequest`
to restore the HTTPS scheme only when the request URL host matches an entry
exactly. This normalizes the actual `Request.url` because Qwik 1.20's CSRF
request event does not use the adapter's `getOrigin` result. It preserves the
request method, headers, body, path, and query, and does not derive the server
origin from `Origin` or forwarded headers.

Qwik's strict CSRF check remains enabled. Same-host HTTPS actions work on both
domains; a POST from apex to `www`, from an unrelated origin, or from HTTP to a
production domain is still rejected. Localhost, the Azure health-check host,
and other unlisted hosts retain their request URL origin. Do not set a single
global `ORIGIN` or disable CSRF checks to work around TLS termination.

Origin policy changes require a new application release, not an IaC change.
The release image smoke test exercises allowed and forbidden POST origins.

## Recovery when dispatch is accepted but IaC fails

1. Keep the published release and image digest; do not retag or move the tag.
2. Read the failed IaC run summary (provenance, registry, what-if, apply, HTTP).
3. Fix the root cause in the owning repository; re-run only after review.
4. Replaying the same release ID + digest is intended to be idempotent once
   healthy. An older pending release must not overwrite a newer successful one
   (enforced in IaC).
5. Rollback is an operator-approved exception documented in the IaC runbook, not
   an automatic source-repo action.

## Local container smoke

Case study routes use the bare path form (`/work/<slug>`). Slash paths 301 when
`trailingSlash: false`.

```bash
docker build -f docker/Dockerfile -t qwik-website:release-test .
docker run --rm -d --name qwik-release-test -p 3000:3000 qwik-website:release-test
curl --fail --silent --show-error --max-time 10 http://localhost:3000/health
curl --fail --silent --show-error --max-time 10 http://localhost:3000/
curl --fail --silent --show-error --max-time 10 http://localhost:3000/work/access-control-demo
docker logs qwik-release-test
docker rm -f qwik-release-test
```

## Deployment boundary

```text
GitHub Actions (this repo)  --OIDC publisher--> shared ACR
      |
      | repository_dispatch single-container-web-release-v1
      v
IaC deploy-single-container-release.yml
      |
      | planner / deployer OIDC
      v
stacks/single-container-web (rg-platform-production)
      |
      v
Container App (www + apex SNI) --> Bun / Qwik
```
