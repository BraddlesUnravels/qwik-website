import { describe, expect, it } from "vitest";
import { absoluteUrl, siteConfig } from "~/config/site";

describe("config/site", () => {
  describe("siteConfig", () => {
    it("should expose the public site identity fields", () => {
      expect(siteConfig.name).toBe("Bradley Laskey");
      expect(siteConfig.title).toContain("Full Stack Developer");
      expect(siteConfig.email).toContain("@");
    });

    it("should not embed a placeholder production domain", () => {
      expect(siteConfig.url).toBeUndefined();
    });
  });

  describe("absoluteUrl", () => {
    it("should throw when no verified origin is configured", () => {
      expect(() => absoluteUrl("/work/access-control-demo")).toThrow(
        "Site origin is not configured",
      );
    });
  });
});
