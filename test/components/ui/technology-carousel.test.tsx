import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";
import { TechnologyCarousel } from "~/components/ui/technology-carousel";

describe("components/ui/technology-carousel", () => {
  describe("TechnologyCarousel", () => {
    it("should render the technologies landmark and known tool labels", async () => {
      const { screen, render } = await createDOM();

      await render(<TechnologyCarousel />);

      const carousel = screen.querySelector('[aria-label="Technologies used"]');

      expect(carousel).toBeTruthy();
      expect(screen.outerHTML).toContain("TypeScript");
      expect(screen.outerHTML).toContain("Qwik");
      expect(screen.outerHTML).toContain("Vitest");
      expect(screen.outerHTML).toContain("Cypress");
    });

    it("should render a duplicate track for continuous scrolling", async () => {
      const { screen, render } = await createDOM();

      await render(<TechnologyCarousel />);

      const tracks = screen.querySelectorAll(".carousel-list");

      expect(tracks.length).toBe(2);
      expect(tracks[1]?.getAttribute("aria-hidden")).toBe("true");
    });
  });
});
