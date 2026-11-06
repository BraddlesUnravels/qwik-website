import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";
import { Typography } from "~/components/ui/typography";

describe("Typography", () => {
  it.each(["h3", "span", "div"] as const)(
    "honours as=%s independently of the body variant",
    async (as) => {
      const { render, screen } = await createDOM();
      await render(
        <Typography as={as} id="semantic-probe">
          Probe text
        </Typography>,
      );
      expect(
        screen.querySelector("#semantic-probe")?.tagName.toLowerCase(),
      ).toBe(as);
    },
  );

  it("uses the variant's default element", async () => {
    const { render, screen } = await createDOM();
    await render(<Typography variant="heading-2">Section</Typography>);
    expect(screen.querySelector("h2")?.textContent).toBe("Section");
  });

  it("forwards the supported HTML and ARIA attributes", async () => {
    const { render, screen } = await createDOM();
    await render(
      <Typography
        as="span"
        id="decoration"
        role="presentation"
        title="Decoration"
        aria-hidden="true"
      >
        01
      </Typography>,
    );
    const element = screen.querySelector("#decoration");
    expect(element?.getAttribute("role")).toBe("presentation");
    expect(element?.getAttribute("title")).toBe("Decoration");
    expect(element?.getAttribute("aria-hidden")).toBe("true");
  });

  it("retains alignment and lets supplied classes override defaults", async () => {
    const { render, screen } = await createDOM();
    await render(
      <Typography id="styled" align="right" class="text-lg text-red-400">
        Styled text
      </Typography>,
    );
    const classes = screen.querySelector("#styled")?.className ?? "";
    expect(classes).toContain("text-right");
    expect(classes).toContain("text-lg");
    expect(classes).toContain("text-red-400");
    expect(classes).not.toContain("text-base");
    expect(classes).not.toContain("text-zinc-100");
  });
});
