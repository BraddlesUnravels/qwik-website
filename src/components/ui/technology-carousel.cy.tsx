import { TechnologyCarousel } from "./technology-carousel";

describe("TechnologyCarousel", () => {
  it("should mount the technologies landmark", () => {
    cy.mount(<TechnologyCarousel />);

    cy.get('[aria-label="Technologies used"]').should("exist");
    cy.contains("TypeScript").should("exist");
    cy.contains("Qwik").should("exist");
  });
});
