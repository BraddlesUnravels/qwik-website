import { describe, expect, it } from "vitest";
import { mediaAssetName } from "~/lib/media-asset";

describe("built MP4 routing", () => {
  it.each(["GET", "HEAD"])("should accept a single asset for %s", (method) => {
    expect(
      mediaAssetName(
        new Request("http://localhost/assets/clip-Ab12.mp4?v=1", { method }),
      ),
    ).toBe("clip-Ab12.mp4");
  });

  it.each([
    "/assets/nested/clip.mp4",
    "/assets/%2e%2e%2fclip.mp4",
    "/assets/dir%5cclip.mp4",
    "/assets/%252fclip.mp4",
    "/assets/bad%ZZ.mp4",
    "/assets/clip%00.mp4",
    "/assets/poster.jpg",
    "/other/clip.mp4",
  ])("should leave %s to the ordinary handler", (path) => {
    expect(
      mediaAssetName(new Request(`http://localhost${path}`)),
    ).toBeUndefined();
  });

  it("should not intercept non-read requests", () => {
    expect(
      mediaAssetName(
        new Request("http://localhost/assets/clip.mp4", { method: "POST" }),
      ),
    ).toBeUndefined();
  });
});
