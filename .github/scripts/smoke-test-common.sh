smoke_container=""
smoke_body_file=""
smoke_headers_file=""
smoke_url=""

start_smoke_container() {
  local image="$1"
  local port="$2"
  local status

  smoke_container="qwik-smoke-${GITHUB_RUN_ID:-local}-$$"
  smoke_body_file="$(mktemp)"
  smoke_headers_file="$(mktemp)"
  smoke_url="http://127.0.0.1:${port}"

  docker run --rm --detach \
    --name "${smoke_container}" \
    --publish "${port}:3000" \
    "${image}" >/dev/null
  trap 'smoke_status=$?; stop_smoke_container; exit "${smoke_status}"' EXIT

  for _ in $(seq 1 30); do
    status="$(
      curl --silent --show-error --output /dev/null \
        --write-out '%{http_code}' \
        --max-time 10 \
          "${smoke_url}/health" 2>/dev/null || true
    )"
    if [[ "${status}" == '200' ]]; then
      return
    fi
    sleep 2
  done

  docker logs "${smoke_container}" >&2 || true
  echo "Health verification failed for ${smoke_url}/health." >&2
  return 1
}

stop_smoke_container() {
  docker rm -f "${smoke_container}" >/dev/null 2>&1 || true
  rm -f "${smoke_body_file}" "${smoke_headers_file}"
}

fetch_smoke_page() {
  local path="$1"
  local status

  status="$(
    curl --silent --show-error \
      --output "${smoke_body_file}" \
      --dump-header "${smoke_headers_file}" \
      --write-out '%{http_code}' \
      "${smoke_url}${path}" || true
  )"
  if [[ "${status}" != '200' ]]; then
    echo "${path} expected HTTP 200, got ${status}." >&2
    return 1
  fi
}

assert_smoke_contains() {
  if ! grep --fixed-strings --quiet -- "$2" "$1"; then
    echo "Expected '$2' in $1." >&2
    return 1
  fi
}

assert_smoke_header() {
  if ! grep --ignore-case --fixed-strings --quiet -- "$1" "${smoke_headers_file}"; then
    echo "Expected response header '$1'." >&2
    return 1
  fi
}
