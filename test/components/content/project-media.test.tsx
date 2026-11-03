import { renderToString } from "@builder.io/qwik/server";
import { describe, expect, it } from "vitest";
import { ProjectPage } from "~/components/ui/project-page/project-page";
import { projectSummaries } from "~/content/catalog";
import { loadProject } from "~/content/loader";
import { projectMedia } from "~/content/project-media";

describe("real project media integration", () => {
  it.each(projectSummaries)(
    "renders $slug recordings once with their owning section",
    async (summary) => {
      const project = await loadProject(summary.slug);
      expect(project?.slug).toBe(summary.slug);
      expect(project?.path).toBe(summary.path);
      if (!project) throw new Error("Catalog project did not load");
      expect(project.videos).toBeUndefined();
      const placed = project.sections.flatMap((section) => [
        ...(section.videos ?? []),
        ...(section.additionalVideos ?? []),
      ]);
      expect(placed.map(({ id }) => id)).toEqual(
        projectMedia[summary.slug].map(({ id }) => id),
      );
      expect(new Set(placed.map(({ id }) => id)).size).toBe(placed.length);
      const { html } = await renderToString(<ProjectPage project={project} />, {
        containerTagName: "div",
        symbolMapper: (name) => [name, "/test-qrl.js"],
      });
      const tags = html.match(/<video\b[^>]*>/g) ?? [];
      expect(tags).toHaveLength(placed.length);
      expect(
        tags.every(
          (tag) =>
            tag.includes('preload="none"') &&
            !/\sautoplay(?:[\s=>]|$)/i.test(tag),
        ),
      ).toBe(true);
      for (const recording of placed) {
        expect(
          tags.filter((tag) => tag.includes(`src="${recording.src}"`)),
        ).toHaveLength(1);
        expect(html).toContain(recording.caption);
      }
      expect(html.includes("More recorded workflows")).toBe(
        summary.slug === "tqe-legacy-integration",
      );
      for (const link of project.related) {
        expect([
          "/about/approach",
          ...projectSummaries.map(({ path }) => path),
        ]).toContain(link.href.replace(/\/$/, ""));
      }
    },
  );

  it("does not load an unknown project", async () => {
    expect(await loadProject("missing-project")).toBeUndefined();
  });
});
