const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const gaMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId)
  ? measurementId
  : undefined;

// A containment guard, not XSS protection: after a worker fetch or eval
// failure Partytown falls back to running the GA script in the page context,
// and refusing third-party scripts in the page blocks that retry.
const analyticsContentSecurityPolicy =
  "script-src 'self' 'unsafe-inline'; frame-src 'self'";

export const addAnalyticsContentSecurityPolicy = (
  response: Response,
): Response => {
  if (
    !gaMeasurementId ||
    !/^text\/html(?:\s*;|$)/i.test(response.headers.get("content-type") ?? "")
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  // Overwrites any existing policy on purpose, so a looser one cannot reopen the fallback.
  headers.set("Content-Security-Policy", analyticsContentSecurityPolicy);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
