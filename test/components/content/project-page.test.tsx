import { createDOM } from "@builder.io/qwik/testing";
import { renderToString } from "@builder.io/qwik/server";
import { describe, expect, it } from "vitest";
import { ProjectPage } from "~/components/content/project-page";
import { ProjectRelatedLinks } from "~/components/content/related-links";
import { ProjectSection } from "~/components/content/section";
import type {
  Project,
  ProjectImage,
  ProjectSection as SectionData,
} from "~/content/types";

const leadImage: ProjectImage = {
  src: "/lead-1200.webp",
  srcset: "/lead-600.webp 600w, /lead-1200.webp 1200w",
  w: 1200,
  h: 600,
  alt: "Lead screenshot",
  caption: "A lead screenshot caption.",
};
const supportingImage: ProjectImage = {
  src: "/supporting.webp",
  w: 400,
  h: 850,
  alt: "Supporting screenshot",
  caption: "A supporting screenshot caption.",
};

const project: Project = {
  slug: "fixture",
  path: "/projects/fixture/",
  category: "Engineering",
  title: "Fixture study",
  description: "Fixture description",
  introduction: "Fixture introduction",
  featured: false,
  metrics: [],
  images: [leadImage],
  sections: [
    { title: "Problem" },
    { title: "Role" },
    { title: "Implementation", images: [supportingImage] },
  ],
  technologies: [{ label: "Client", value: "Qwik" }],
  related: [],
};

describe("ProjectSection", () => {
  it("renders nested content with headings, bullets and ordered steps", async () => {
    const { screen, render } = await createDOM();
    await render(
      <ProjectSection
        index={2}
        section={{
          title: "Implementation",
          paragraphs: ["Section paragraph"],
          bullets: ["Section bullet"],
          subsections: [
            {
              title: "Verification",
              paragraphs: ["Subsection paragraph"],
              bullets: ["Subsection bullet"],
              steps: ["Request verification", "Resume action"],
            },
          ],
        }}
      />,
    );
    expect(screen.querySelector("h2")?.textContent).toBe("Implementation");
    expect(screen.querySelector("h3")?.textContent).toBe("Verification");
    expect(screen.querySelectorAll("ul")).toHaveLength(2);
    const steps = Array.from(screen.querySelectorAll("ol li"));
    expect(steps).toHaveLength(2);
    expect(steps[0]?.textContent).toContain("Request verification");
    expect(steps[1]?.textContent).toContain("Resume action");
  });

  it.each(["missing", "empty"])("omits %s optional content", async (mode) => {
    const { screen, render } = await createDOM();
    const section: SectionData =
      mode === "empty"
        ? {
            title: "Optional content",
            paragraphs: [],
            bullets: [],
            subsections: [],
          }
        : { title: "Optional content" };
    await render(<ProjectSection section={section} index={0} />);
    expect(screen.querySelectorAll("ul")).toHaveLength(0);
    expect(screen.querySelectorAll("ol")).toHaveLength(0);
    expect(screen.querySelectorAll("h3")).toHaveLength(0);
  });
});

describe("ProjectRelatedLinks", () => {
  it.each([
    {
      links: [],
      expectedHref: "/#selected-projects",
      expectedLabel: "View all projects",
    },
    {
      links: [{ label: "Migration", href: "/projects/customer-migration/" }],
      expectedHref: "/projects/customer-migration/",
      expectedLabel: "Migration",
    },
  ])(
    "renders the appropriate destination: $expectedLabel",
    async ({ links, expectedHref, expectedLabel }) => {
      const { screen, render } = await createDOM();
      await render(<ProjectRelatedLinks links={links} />);
      expect(screen.querySelectorAll("a")).toHaveLength(1);
      expect(screen.querySelector("a")?.getAttribute("href")).toBe(
        expectedHref,
      );
      expect(screen.querySelector("a")?.textContent).toContain(expectedLabel);
    },
  );
});

describe("ProjectPage", () => {
  it("server-renders image metadata and the forwarded action in the header", async () => {
    const { html } = await renderToString(
      <ProjectPage project={project}>
        <button id="server-action" q:slot="actions">
          Open demo
        </button>
      </ProjectPage>,
      {
        containerTagName: "div",
        // Unit tests have no client build manifest for serializing event QRLs.
        symbolMapper: (symbolName) => [symbolName, "/test-qrl.js"],
      },
    );
    const header = html.slice(
      html.indexOf("<header"),
      html.indexOf("</header>") + 9,
    );
    expect(header).toContain('id="server-action"');
    expect(header).toContain('alt="Lead screenshot"');
    expect(header).not.toContain('alt="Supporting screenshot"');
  });

  it("places images with their owning content and preserves responsive metadata", async () => {
    const { screen, render } = await createDOM();
    await render(<ProjectPage project={project} />);
    const header = screen.querySelector("header");
    const lead = header?.querySelector("figure img");
    expect(lead?.getAttribute("srcset")).toBe(leadImage.srcset);
    expect(lead?.getAttribute("width")).toBe("1200");
    expect(lead?.getAttribute("height")).toBe("600");
    expect(lead?.getAttribute("loading")).toBe("lazy");
    expect(lead?.getAttribute("decoding")).toBe("async");
    expect(header?.querySelector("figcaption")?.textContent).toContain(
      leadImage.caption,
    );
    expect(header?.querySelector("figure a")?.getAttribute("href")).toBe(
      leadImage.src,
    );
    const implementation = Array.from(screen.querySelectorAll("section")).find(
      (section) =>
        section.querySelector("h2")?.textContent === "Implementation",
    );
    expect(implementation?.querySelector("img")?.getAttribute("alt")).toBe(
      supportingImage.alt,
    );
    expect(screen.querySelectorAll("figure")).toHaveLength(2);
  });

  it("renders a text-only study without media or empty lists", async () => {
    const { screen, render } = await createDOM();
    await render(
      <ProjectPage
        project={{
          ...project,
          images: undefined,
          sections: [{ title: "Text" }],
        }}
      />,
    );
    expect(screen.querySelectorAll("figure")).toHaveLength(0);
    expect(screen.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.querySelectorAll("h2")[0]?.textContent).toBe("Text");
  });
});
