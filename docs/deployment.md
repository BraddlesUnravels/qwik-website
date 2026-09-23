# Deployment

Production deploys are **release-driven**. Publishing a stable GitHub Release in
this repository is the normal trigger. Azure infrastructure and the final apply
live in the reusable IaC repository (`BraddlesUnravels/iac`), not here.

## Normal path

```text
Stable GitHub Release published (tag vX.Y.Z, not draft/prerelease)
  -> .github/workflows/release.yml
  -> verify tag commit, run checks, build one production image
  -> smoke /health, /, case study, static asset
  -> OIDC publish to braddlesunravelsacr.azurecr.io/qwik-website:<40-char-sha>
  -> GitHub App token scoped to IaC repository
  -> repository_dispatch event_type=qwik-website-release-v1
  -> IaC workflow verifies provenance, plans, (optionally) waits for approval, deploys
```

This repository does **not** contain application Bicep/ARM or a manual
production deploy workflow. Do not copy digests into IaC by hand for the normal
path.

## Source workflow responsibilities

| Step                                | Owner                                        |
| ----------------------------------- | -------------------------------------------- |
| Stable release / protected tag      | Maintainers                                  |
| Tests + Docker smoke                | `release.yml` `verify-test-build-push`       |
| ACR push (repository-scoped writer) | `image-publish` environment + publisher UAMI |
| Cross-repo dispatch                 | GitHub App installation token to IaC only    |
| Azure apply + live verification     | IaC `deploy-qwik-release.yml`                |

Source job success means **dispatch accepted / deployment pending**, not that
Azure is healthy. Final status is the IaC run.

## Required repository settings

Configure before enabling production releases (operator-owned):

| Name                           | Location                | Purpose                                                |
| ------------------------------ | ----------------------- | ------------------------------------------------------ |
| `AZURE_PUBLISHER_CLIENT_ID`    | `image-publish` env var | Publisher managed identity client ID                   |
| `AZURE_TENANT_ID`              | `image-publish` env var | Azure tenant                                           |
| `AZURE_SUBSCRIPTION_ID`        | `image-publish` env var | Azure subscription                                     |
| `IAC_DISPATCH_APP_ID`          | repository variable     | GitHub App ID used only to dispatch IaC                |
| `IAC_DISPATCH_APP_PRIVATE_KEY` | repository secret       | GitHub App private key                                 |
| Environment `image-publish`    | repository environments | Scopes OIDC subject for publisher federated credential |

Do not store ACR admin passwords, long-lived PATs, or Azure client secrets.

## Creating an approved release

1. Land reviewed changes on `main`.
2. Create an immutable protected tag matching `vMAJOR.MINOR.PATCH`.
3. Publish a **stable** GitHub Release for that tag (not draft, not prerelease).
4. Watch `Publish release image and initiate deployment` in this repo.
5. Open the IaC Actions tab for `Deploy Qwik website from source release` and
   approve the protected `production` environment if configured.
6. Confirm IaC summary: digest, revision, live `/health`, homepage, study.

## Image tags

- Deployment image is always
  `braddlesunravelsacr.azurecr.io/qwik-website:<full-40-char-lowercase-sha>`.
- Runtime reference in Azure is the immutable digest form
  `.../qwik-website@sha256:<64-hex>`.
- `latest` is never used for deployment.
- Existing SHA tags are not overwritten; a collision fails the release job.

## Health and SEO for first Azure FQDN

- `GET/HEAD /health` returns plain `ok` with `cache-control: no-store`.
- Bun SSG is disabled until a verified canonical domain exists.
- `PUBLIC_SITE_URL` is omitted from the release image build until that domain is
  chosen in a separate reviewed change.
- `siteConfig.url` / `absoluteUrl` do not emit placeholder hostnames.

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

Case study routes are trailing-slash canonical (`/work/<slug>/`). Bare paths 301.

```bash
docker build -f docker/Dockerfile -t qwik-website:release-test .
docker run --rm -d --name qwik-release-test -p 3000:3000 qwik-website:release-test
curl --fail --silent --show-error --max-time 10 http://localhost:3000/health
curl --fail --silent --show-error --max-time 10 http://localhost:3000/
curl --fail --silent --show-error --max-time 10 http://localhost:3000/work/access-control-demo/
docker logs qwik-release-test
docker rm -f qwik-release-test
```
