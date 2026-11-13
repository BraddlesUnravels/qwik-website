#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/smoke-test-common.sh"

image="${1:?Image reference is required.}"

start_smoke_container "${image}" 18080

for path in / /projects/access-control-demo; do
  fetch_smoke_page "${path}"
  if grep --extended-regexp --quiet \
    'type="text/partytown"|data-ptworkeronly|googletagmanager\.com/gtag/js' \
    "${smoke_body_file}"; then
    echo "Unexpected analytics markup on ${path}." >&2
    exit 1
  fi
  if grep --ignore-case --quiet 'content-security-policy:' "${smoke_headers_file}"; then
    echo "Unexpected Content-Security-Policy header on disabled ${path}." >&2
    exit 1
  fi
done
