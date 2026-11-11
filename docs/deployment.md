# Deployment

This repo tests the site, publishes the container image and sends release evidence to [BraddlesUnravels/iac](https://github.com/BraddlesUnravels/iac). The IaC repo owns the Azure plan, apply and live verification. The [workload contract](https://github.com/BraddlesUnravels/iac/blob/main/workloads/qwik-website/production.json) defines the runtime settings and Key Vault reference.

## Publish a release

1. Land the changes on `main`. Publish a stable GitHub Release from a protected `vX.Y.Z` tag, or run **Publish release image and initiate deployment** manually from `main`.
2. Follow the [release workflow](../.github/workflows/release.yml). It validates the source, runs the checks, then builds and smoke-tests the Docker image.
3. Check the summary for the commit SHA, image tag and digest. The workflow publishes `braddlesunravelsacr.azurecr.io/qwik-website:<full-commit-sha>` using Azure OIDC. A replay reuses the digest for an existing SHA tag. IaC deploys by digest.
4. After the source workflow accepts the `single-container-web-release-v1` dispatch, follow [Deploy single-container-web release](https://github.com/BraddlesUnravels/iac/actions/workflows/deploy-single-container-release.yml) for the deployment result.
5. Review the plan and approve the protected `production` environment if GitHub requests it. Check the IaC summary for the digest and the results for `/health`, `/` and `/projects/access-control-demo`.

## GitHub settings

| Setting                                                                 | Location                                      |
| ----------------------------------------------------------------------- | --------------------------------------------- |
| `AZURE_PUBLISHER_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` | Variables in the `image-publish` environment. |
| `IAC_DISPATCH_APP_ID`                                                   | Repository variable.                          |
| `IAC_DISPATCH_APP_PRIVATE_KEY`                                          | Repository secret.                            |

The publisher identity is `id-qwik-website-publisher`. The GitHub App token used for dispatch is scoped to the IaC repo. For Azure identity scopes, custom domains and secret rotation, see the [Qwik website runbook](https://github.com/BraddlesUnravels/iac/blob/main/docs/workloads/qwik-website-runbook.md).

## Check the container locally

Run these commands from the repo root. Expect HTTP 200 for all three requests and `ok` in the health response.

```sh
docker compose -f docker/docker-compose.yml up --build -d --wait website
curl -sS -w '\nHTTP %{http_code}\n' http://localhost:3000/health
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost:3000/
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost:3000/projects/access-control-demo
docker compose -f docker/docker-compose.yml down
```

If port 3000 is busy, set `HOST_PORT` when starting Compose and use the same port in the curl commands. If a check fails, inspect `docker compose -f docker/docker-compose.yml logs website`. The `stage`-labelled PR workflow checks the same three paths.

## When a release fails

Start with the source workflow summary. If the dispatch was accepted, open the IaC run and check whether provenance, planning, apply or HTTP verification failed. HTTP verification runs after apply, so check the image currently serving traffic before replaying the release.

Keep the original release tag and digest. Use the [shared release runbook](https://github.com/BraddlesUnravels/iac/blob/main/docs/workloads/single-container-web-runbook.md) for replay and the [Qwik website runbook](https://github.com/BraddlesUnravels/iac/blob/main/docs/workloads/qwik-website-runbook.md) for rollback.
