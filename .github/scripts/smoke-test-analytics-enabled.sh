#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/smoke-test-common.sh"

image="${1:?Image reference is required.}"
measurement_id="${2:?GA measurement ID is required.}"
partytown_library_path="${3:-}"

if [[ ! "${measurement_id}" =~ ^G-[A-Z0-9]+$ ]]; then
  echo "A valid GA4 measurement ID is required, got '${measurement_id}'." >&2
  exit 1
fi

if [[ -n "${partytown_library_path}" && ! "${partytown_library_path}" =~ ^/.+/$ ]]; then
  echo "Partytown library path must start and end with '/', got '${partytown_library_path}'." >&2
  exit 1
fi

start_smoke_container "${image}" 18080

for path in / /projects/access-control-demo; do
  fetch_smoke_page "${path}"
  assert_smoke_contains "${smoke_body_file}" \
    "https://www.googletagmanager.com/gtag/js?id=${measurement_id}"
  assert_smoke_header \
    "Content-Security-Policy: script-src 'self' 'unsafe-inline'; frame-src 'self'"

  worker_only_count="$(
    grep --only-matching '<script[^>]*>' "${smoke_body_file}" |
      grep --extended-regexp --count 'type="text/partytown".*data-ptworkeronly|data-ptworkeronly.*type="text/partytown"' |
      tr -d '[:space:]'
  )"
  if [[ "${worker_only_count}" != '2' ]]; then
    echo "Expected two worker-only GA tags on ${path}, got ${worker_only_count}." >&2
    exit 1
  fi
done

if [[ -z "${partytown_library_path}" ]]; then
  echo "Skipping Partytown asset checks because no library path was given."
  exit 0
fi

for asset in partytown-sw.js partytown.js partytown-sandbox-sw.html; do
  status="$(
    curl --silent --show-error \
      --output "${smoke_body_file}" \
      --dump-header "${smoke_headers_file}" \
      --write-out '%{http_code}' \
      "${smoke_url}${partytown_library_path}${asset}" || true
  )"
  if [[ "${status}" != '200' ]]; then
    echo "Partytown asset ${asset} expected HTTP 200, got ${status}." >&2
    exit 1
  fi

  if [[ "${asset}" == 'partytown-sw.js' ]]; then
    assert_smoke_header 'Cache-Control: public, max-age=0, must-revalidate'
  else
    assert_smoke_header 'Cache-Control: public, max-age=31536000, immutable'
  fi

  if [[ "${asset}" == *.js ]]; then
    if ! grep --ignore-case --extended-regexp --quiet \
      '^content-type:[[:space:]]*(application|text)/(x-)?javascript([;[:space:]]|$)' \
      "${smoke_headers_file}"; then
      echo "Partytown asset ${asset} did not have a JavaScript MIME type." >&2
      exit 1
    fi
  fi
done
