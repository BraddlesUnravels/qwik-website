import { describe, expect, it } from "vitest";
import { createMediaResponse } from "~/lib/media-response";

const file = new Blob(["0123456789"], { type: "video/mp4" });
const response = (range?: string, options?: RequestInit) =>
  createMediaResponse(
    new Request("http://localhost/assets/clip-hash.mp4", {
      headers: range ? { Range: range } : undefined,
      ...options,
    }),
    file,
  );

describe("MP4 range responses", () => {
  it.each([
    ["bytes=0-3", "0123", "bytes 0-3/10"],
    ["bytes=7-", "789", "bytes 7-9/10"],
    ["bytes=-3", "789", "bytes 7-9/10"],
    ["bytes=7-100", "789", "bytes 7-9/10"],
    ["bytes=-100", "0123456789", "bytes 0-9/10"],
  ])(
    "should serve %s without sending the complete file",
    async (range, body, contentRange) => {
      const result = response(range);
      expect(result.status).toBe(206);
      expect(result.headers.get("Content-Range")).toBe(contentRange);
      expect(result.headers.get("Content-Length")).toBe(String(body.length));
      expect(await result.text()).toBe(body);
    },
  );
  it.each(["bytes=10-", "bytes=8-2", "bytes=-0"])(
    "should reject unsatisfiable %s",
    async (range) => {
      const result = response(range);
      expect(result.status).toBe(416);
      expect(result.headers.get("Content-Range")).toBe("bytes */10");
      expect(await result.text()).toBe("");
    },
  );
  it.each([undefined, "invalid", "bytes=0-1,5-6"])(
    "should serve a complete response for %s",
    async (range) => {
      const result = response(range);
      expect(result.status).toBe(200);
      expect(result.headers.get("Accept-Ranges")).toBe("bytes");
      expect(await result.text()).toBe("0123456789");
    },
  );
  it("should send headers without a body for HEAD", async () => {
    const result = response("bytes=0-3", { method: "HEAD" });
    expect(result.status).toBe(200);
    expect(result.headers.get("Content-Length")).toBe("10");
    expect(await result.text()).toBe("");
  });
  it("should ignore If-Range without a matching validator", () => {
    expect(
      response(undefined, {
        headers: { Range: "bytes=0-3", "If-Range": '"old"' },
      }).status,
    ).toBe(200);
  });
});
