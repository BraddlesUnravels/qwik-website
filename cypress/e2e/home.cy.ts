describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the main landmark", () => {
    cy.get("#main-page-content").should("exist");
  });

  it("should show selected work and capabilities sections", () => {
    cy.get("#capabilities").should("exist");
    cy.get("#selected-work").should("exist");
    cy.contains("Technical depth tied to operational outcomes.").should(
      "exist",
    );
  });

  it("should include the technology carousel labels", () => {
    cy.get('[aria-label="Technologies used"]').should("exist");
    cy.contains("TypeScript").should("exist");
  });
});
