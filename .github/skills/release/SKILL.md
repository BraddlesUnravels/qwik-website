---
name: release
description: Prepare, publish, or troubleshoot this repository's container-image release and its handoff to Azure deployment.
---

# Release workflow

Use when a task explicitly involves building or publishing a release, or diagnosing the release-to-deployment handoff. Read [docs/deployment.md](../../../docs/deployment.md) first.

- This repository's release workflow validates and publishes the container image. The separate `BraddlesUnravels/iac` repository owns Azure planning, deployment, and live verification.
- Follow the existing protected GitHub Release/tag or documented manual workflow; don't bypass checks, environments, OIDC, or approvals.
- Preserve the original release tag and image digest when diagnosing or replaying a failure. Check whether the IaC dispatch was accepted before considering a replay.
- A published image is not proof of a successful deployment. Verify the linked IaC run and its `/health`, `/`, and demo-route checks.
- Do not deploy, replay, or alter production state unless the user explicitly asks for that action. Report which workflow and verification stage failed.
