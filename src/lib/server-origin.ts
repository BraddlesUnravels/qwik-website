export const trustedOrigins = [
  "https://braddlesunravels.online",
  "https://www.braddlesunravels.online",
] as const;

export const getServerOrigin = (request: Request): string => {
  const url = new URL(request.url);

  // Azure terminates TLS; restore HTTPS only for explicitly trusted hosts.
  return (
    trustedOrigins.find((origin) => new URL(origin).host === url.host) ??
    url.origin
  );
};

export const normalizeServerRequest = (request: Request): Request => {
  const url = new URL(request.url);
  const origin = getServerOrigin(request);
  if (origin === url.origin) {
    return request;
  }

  url.protocol = new URL(origin).protocol;
  // Qwik 1.20 builds the CSRF request event from Request.url, not getOrigin.
  return new Request(url, request);
};
