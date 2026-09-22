import { describe, expect, it } from "vitest";
import { absoluteUrl, siteConfig } from "~/config/site";

describe("config/site", () => {
  describe("siteConfig", () => {
    it("should expose the public site identity fields", () => {
      expect(siteConfig.name).toBe("Bradley Laskey");
      expect(siteConfig.title).toContain("Full Stack Developer");
      expect(siteConfig.email).toContain("@");
    });
  });

  describe("absoluteUrl", () => {
    it("should resolve a site-relative path against the configured origin", () => {
      expect(absoluteUrl("/work/access-control-demo")).toBe(
        new URL("/work/access-control-demo", siteConfig.url).toString(),
      );
    });

    it("should resolve the site root", () => {
      expect(absoluteUrl("/")).toBe(new URL("/", siteConfig.url).toString());
    });
  });
});
