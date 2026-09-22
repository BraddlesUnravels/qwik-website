import type { JSXNode } from "@builder.io/qwik";
import { TechnologyCarousel } from "./technology-carousel";

describe("TechnologyCarousel", () => {
  it("should mount the technologies landmark", () => {
    // cypress-ct-qwik mount expects JSXNode; Qwik JSX is typed as JSXOutput
    cy.mount((<TechnologyCarousel />) as JSXNode);

    cy.get('[aria-label="Technologies used"]').should("exist");
    cy.contains("TypeScript").should("exist");
    cy.contains("Qwik").should("exist");
  });
});
