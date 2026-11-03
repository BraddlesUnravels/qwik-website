// Only a single built asset filename may reach the MP4 disk handler.
export function mediaAssetName(request: Request): string | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return;
  const match = /^\/assets\/([^/]+)$/.exec(new URL(request.url).pathname);
  if (!match) return;
  try {
    const filename = decodeURIComponent(match[1]);
    if (/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.mp4$/.test(filename)) return filename;
  } catch {
    // Malformed URL encoding falls through to the ordinary static/router path.
  }
}
