type ByteRange = { start: number; end: number };

// A single range is enough for native MP4 seeking.
// Ignore malformed/multipart headers (serve 200);
// return 416 for syntactically valid unsatisfiable ranges.
export function parseVideoRange(
  header: string | null,
  size: number,
): ByteRange | "unsatisfiable" | undefined {
  if (!header) return;

  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (!match[1] && !match[2])) return;
  if (!size) return "unsatisfiable";
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!suffix) return "unsatisfiable";
    return { start: Math.max(0, size - suffix), end: size - 1 };
  }

  const start = Number(match[1]);
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start >= size || end < start) return "unsatisfiable";
  return { start, end };
}

export function createMediaResponse(request: Request, file: Blob): Response {
  const headers = new Headers({
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Content-Length": String(file.size),
  });
  // HEAD describes the complete representation. Without validators, If-Range
  // must fall back to the complete representation rather than claim a match.
  const range =
    request.method === "HEAD" || request.headers.has("If-Range")
      ? undefined
      : parseVideoRange(request.headers.get("Range"), file.size);

  if (range === "unsatisfiable") {
    headers.set("Content-Range", `bytes */${file.size}`);
    headers.set("Content-Length", "0");
    return new Response(undefined, { status: 416, headers });
  }

  if (range) {
    headers.set(
      "Content-Range",
      `bytes ${range.start}-${range.end}/${file.size}`,
    );
    headers.set("Content-Length", String(range.end - range.start + 1));
    return new Response(file.slice(range.start, range.end + 1), {
      status: 206,
      headers,
    });
  }

  return new Response(request.method === "HEAD" ? undefined : file, {
    headers,
  });
}
