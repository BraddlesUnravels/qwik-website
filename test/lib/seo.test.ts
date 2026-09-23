import { afterEach, describe, expect, it, vi } from "vitest";

const placeholderHostPatterns = [
  /REPLACE-WITH-FINAL-DOMAIN/i,
  /yoursite\.dev/i,
  /example\.invalid/i,
];

describe("lib/seo", () => {
  describe("createSeoHead", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
      vi.resetModules();
    });

    it("should build title description and social meta without a site url", async () => {
      vi.stubEnv("PUBLIC_SITE_URL", "");
      const { createSeoHead } = await import("~/lib/seo");

      const head = createSeoHead({
        title: "Full Stack Developer",
        description: "Portfolio description",
        path: "/",
      });

      expect(head.title).toBe("Full Stack Developer | Bradley Laskey");
      expect(head.meta).toEqual(
        expect.arrayContaining([
          { name: "description", content: "Portfolio description" },
          { property: "og:title", content: "Full Stack Developer" },
          { property: "og:description", content: "Portfolio description" },
          { property: "og:type", content: "website" },
          {
            property: "og:site_name",
            content: "Bradley Laskey — Full Stack Developer",
          },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: "Full Stack Developer" },
          { name: "twitter:description", content: "Portfolio description" },
        ]),
      );
      expect(head.links).toEqual([]);
      expect(head.meta?.some((entry) => entry.property === "og:url")).toBe(
        false,
      );

      const serialized = JSON.stringify(head);
      for (const pattern of placeholderHostPatterns) {
        expect(serialized).not.toMatch(pattern);
      }
    });

    it("should include canonical and og url when PUBLIC_SITE_URL is set", async () => {
      vi.stubEnv("PUBLIC_SITE_URL", "https://example.com/");
      const { createSeoHead } = await import("~/lib/seo");

      const head = createSeoHead({
        title: "Access Control",
        description: "Case study",
        path: "/work/access-control-demo",
        type: "article",
      });

      expect(head.meta).toEqual(
        expect.arrayContaining([
          { property: "og:type", content: "article" },
          {
            property: "og:url",
            content: "https://example.com/work/access-control-demo",
          },
        ]),
      );
      expect(head.links).toEqual([
        {
          rel: "canonical",
          href: "https://example.com/work/access-control-demo",
        },
      ]);
    });
  });
});
