describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the main landmark and intro", () => {
    cy.get("#main-page-content").should("exist");
    cy.get("#header-intro").should("exist");
    cy.contains("I think in business problems.").should("exist");
    cy.contains("I build in code").should("exist");
  });

  it("should show the technical toolkit carousel", () => {
    cy.contains("Technical toolkit").should("exist");
    cy.get('[aria-label="Technologies used"]').should("exist");
    cy.contains("TypeScript").should("exist");
  });

  it("should show selected and supporting projects sections", () => {
    cy.get("#selected-projects").should("exist");
    cy.contains("Selected work").should("exist");
    cy.contains("Complex systems, clearly evidenced.").should("exist");
    cy.contains("Supporting work").should("exist");
    cy.contains(
      "LeaseTrack: a new portal around a legacy lease platform",
    ).should("exist");
    cy.contains("Access Control Demo: security you can inspect").should(
      "exist",
    );
    cy.get('a[href="/projects/autodash"]').should("exist");
    cy.contains("View case study").should("exist");
  });

  it("should show the approach section", () => {
    cy.get("#approach").should("exist");
    cy.contains("How I work").should("exist");
    cy.contains("Start with the real workflow.").should("exist");
  });

  it("should link from the banner to selected projects", () => {
    cy.contains("a", "View projects")
      .should("have.attr", "href", "#selected-projects")
      .click();
    cy.get("#selected-projects").should("be.visible");
  });
});
