import { gunzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { compressPublicHtml } from "~/lib/response-compression";

const html = "<!doctype html><h1>Portfolio</h1>";

function publicHtml(
  body: BodyInit = html,
  headers: Record<string, string> = {},
) {
  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=5",
      "Content-Type": "text/html; charset=utf-8",
      ...headers,
    },
  });
}

function request(encoding: string | null, method = "GET") {
  return new Request("http://localhost/", {
    method,
    headers: encoding === null ? undefined : { "Accept-Encoding": encoding },
  });
}

describe("public HTML compression", () => {
  it.each([
    { encoding: null, selected: null, status: 200 },
    { encoding: "", selected: null, status: 200 },
    { encoding: "gzip", selected: "gzip", status: 200 },
    { encoding: "br, GZIP;q=0.100", selected: "gzip", status: 200 },
    { encoding: "*;q=0.5", selected: "gzip", status: 200 },
    { encoding: "gzip;q=0, *;q=1", selected: null, status: 200 },
    { encoding: "gzip;q=0.1, identity;q=0.9", selected: null, status: 200 },
    { encoding: "gzip;q=1e-1", selected: null, status: 200 },
    { encoding: "gzip;q=1.0000", selected: null, status: 200 },
    { encoding: "gzip;q=0, identity;q=0", selected: null, status: 406 },
    { encoding: "*;q=0", selected: null, status: 406 },
  ])(
    "should negotiate HEAD for Accept-Encoding $encoding",
    ({ encoding, selected, status }) => {
      const result = compressPublicHtml(
        request(encoding, "HEAD"),
        publicHtml(),
      );

      expect(result.status).toBe(status);
      expect(result.headers.get("Content-Encoding")).toBe(selected);
      expect(result.headers.get("Vary")).toBe("Accept-Encoding");
      expect(result.body).toBeNull();
      if (status === 406) {
        expect(result.headers.get("Cache-Control")).toBe("no-store");
      }
    },
  );

  it("should make round-trips gzip HTML and preserves the existing Vary field", async () => {
    const original = publicHtml(html, {
      "Content-Length": String(html.length),
      Vary: "Origin",
    });
    const result = compressPublicHtml(request("gzip"), original);

    expect(result.headers.get("Content-Encoding")).toBe("gzip");
    expect(result.headers.get("Content-Length")).toBeNull();
    expect(result.headers.get("Vary")).toBe("Origin, Accept-Encoding");
    expect(gunzipSync(Buffer.from(await result.arrayBuffer())).toString()).toBe(
      html,
    );
  });

  it.each([
    ["Cache-Control", "private"],
    ["Cache-Control", "public, no-store"],
    ["Cache-Control", "public, no-transform"],
    ["Content-Type", "application/json"],
    ["Set-Cookie", "session=example"],
    ["Content-Encoding", "br"],
    ["ETag", '"original"'],
  ])("should preserve an ineligible response with %s: %s", (name, value) => {
    const original = publicHtml(html, { [name]: value });
    expect(compressPublicHtml(request("gzip"), original)).toBe(original);
  });

  it("should make the opening HTML readable while the source is still open", async () => {
    const encoder = new TextEncoder();
    let source!: ReadableStreamDefaultController<Uint8Array<ArrayBuffer>>;
    const body = new ReadableStream<Uint8Array<ArrayBuffer>>({
      start(controller) {
        source = controller;
        source.enqueue(encoder.encode(html));
      },
    });
    const result = compressPublicHtml(request("gzip"), publicHtml(body));
    expect(result.body).not.toBeNull();
    const reader = result
      .body!.pipeThrough(new DecompressionStream("gzip"))
      .getReader();

    // This deadline only prevents a hang if gzip waits for the input to close.
    let deadline: ReturnType<typeof setTimeout> | undefined;
    try {
      const first = await Promise.race([
        reader.read(),
        new Promise<never>((_, reject) => {
          deadline = setTimeout(
            () => reject(new Error("Opening HTML was buffered")),
            2_000,
          );
        }),
      ]);
      expect(new TextDecoder().decode(first.value)).toBe(html);
    } finally {
      clearTimeout(deadline);
      source.close();
    }
    expect(await reader.read()).toEqual({ done: true, value: undefined });
  });
});
