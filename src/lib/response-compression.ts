import { pipeline, Readable } from "node:stream";
import { constants, createGzip } from "node:zlib";

const assetPathPattern = /^\/(?:assets|build)\/[\w.-]+\.(?:css|m?js|json)$/;
const encodingWeightPattern =
  /^(gzip|identity|\*)\s*(?:;\s*q=(0(?:\.\d{0,3})?|1(?:\.0{0,3})?))?$/i;

export const isPrecompressedAssetPath = (pathname: string): boolean =>
  assetPathPattern.test(pathname);

function selectEncoding(header: string | null, hasGzip: boolean) {
  const weights = new Map<string, number>();

  for (const item of header?.split(",") ?? []) {
    const match = encodingWeightPattern.exec(item.trim());
    if (!match) continue;

    const encoding = match[1].toLowerCase();
    const weight = Number(match[2] ?? "1");
    weights.set(encoding, Math.max(weights.get(encoding) ?? 0, weight));
  }

  const wildcard = weights.get("*");
  const gzip = hasGzip ? (weights.get("gzip") ?? wildcard ?? 0) : 0;
  const identity = weights.get("identity");

  // Prefer an accepted gzip variant when identity was left implicit.
  if (gzip > 0 && gzip >= (identity ?? 0)) return "gzip";
  if ((identity ?? (wildcard === 0 ? 0 : 1)) > 0) return "identity";
  return null;
}

type GzipVariant = {
  body: () => BodyInit | null;
  length?: number;
};

function serveVariant(
  request: Request,
  response: Response,
  gzip: GzipVariant | null,
  disposeBody: () => void,
): Response {
  const headers = new Headers(response.headers);
  const vary = (headers.get("vary") ?? "").toLowerCase().split(/\s*,\s*/);

  if (!vary.includes("*") && !vary.includes("accept-encoding"))
    headers.append("vary", "Accept-Encoding");

  const encoding = selectEncoding(
    request.headers.get("accept-encoding"),
    gzip !== null,
  );

  if (encoding === null) {
    disposeBody();
    return new Response(null, {
      status: 406,
      headers: {
        "Cache-Control": "no-store",
        Vary: headers.get("vary") ?? "Accept-Encoding",
      },
    });
  }

  const { status, statusText } = response;
  const useGzip = encoding === "gzip" && gzip !== null;

  if (useGzip) {
    headers.set("content-encoding", "gzip");
    if (gzip.length === undefined) {
      headers.delete("content-length");
    } else {
      headers.set("content-length", String(gzip.length));
    }
  }

  if (request.method === "HEAD") {
    disposeBody();
    if (!headers.has("content-length"))
      // Bun 1.3.12 otherwise writes Content-Length: 0 for a null body.
      headers.set("transfer-encoding", "chunked");

    return new Response(null, { status, statusText, headers });
  }

  return new Response(useGzip ? gzip.body() : response.body, {
    status,
    statusText,
    headers,
  });
}

function gzipHtml(body: ReadableStream<Uint8Array>): BodyInit {
  // Bun supports both Web Streams types, which the DOM and Node declarations model differently.
  const source = Readable.fromWeb(
    body as unknown as Parameters<typeof Readable.fromWeb>[0],
  );
  const gzip = createGzip();
  pipeline(source, gzip, () => {});
  // Register after pipeline so the first write reaches gzip before the flush.
  source.once("data", () => gzip.flush(constants.Z_SYNC_FLUSH));
  return Readable.toWeb(gzip) as unknown as ReadableStream<
    Uint8Array<ArrayBuffer>
  >;
}

export function compressPublicHtml(
  request: Request,
  response: Response,
): Response {
  const { headers, body } = response;
  const directives = (headers.get("cache-control") ?? "")
    .toLowerCase()
    .split(/\s*,\s*/);
  if (
    (request.method !== "GET" && request.method !== "HEAD") ||
    response.status !== 200 ||
    !/^text\/html(?:\s*;|$)/i.test(headers.get("content-type") ?? "") ||
    !directives.includes("public") ||
    directives.some((value) =>
      /^(?:private|no-store|no-transform)(?:=|$)/.test(value),
    ) ||
    [
      "content-encoding",
      "content-range",
      "content-digest",
      "repr-digest",
      "etag",
      "set-cookie",
    ].some((name) => headers.has(name))
  )
    return response;

  const gzip =
    body || request.method === "HEAD"
      ? { body: () => (body ? gzipHtml(body) : null) }
      : null;

  return serveVariant(request, response, gzip, () => {
    // Let Qwik finish SSR when the selected response has no body.
    void body?.pipeTo(new WritableStream()).catch(() => {});
  });
}

export async function servePrecompressedAsset(
  request: Request,
  response: Response,
  gzipFile: ReturnType<typeof Bun.file>,
): Promise<Response> {
  if (response.status !== 200) return response;

  const disposeBody = () => void response.body?.cancel().catch(() => {});

  const gzip = (await gzipFile.exists())
    ? {
        body: () => {
          disposeBody();
          return gzipFile;
        },
        length: gzipFile.size,
      }
    : null;

  return serveVariant(request, response, gzip, disposeBody);
}
