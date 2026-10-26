describe("Project pages", () => {
  it("renders the AutoDash project and its lead image", () => {
    cy.visit("/projects/autodash");

    cy.get("h1")
      .should("be.visible")
      .and(
        "contain.text",
        "AutoDash: a new portal around a legacy lease platform",
      );
    cy.get("header img")
      .should("have.attr", "alt")
      .and("contain", "Desktop reimbursement page");
    cy.contains("a", "Selected work").should(
      "have.attr",
      "href",
      "/#selected-projects",
    );
  });

  it("renders a not-found page for unknown projects", () => {
    cy.visit("/projects/not-a-project", { failOnStatusCode: false });

    cy.get("h1").should("be.visible").and("contain.text", "Project not found");
    cy.contains("The requested project does not exist or has moved.").should(
      "be.visible",
    );
  });
});

describe("Mobile navigation", () => {
  beforeEach(() => {
    cy.viewport(390, 844);
    cy.visit("/");
  });

  it("opens, navigates, and closes the menu", () => {
    cy.get('button[aria-label="Open menu"]')
      .should("be.visible")
      .click()
      .should("have.attr", "aria-expanded", "true");

    cy.get("#mobile-navigation-links").should("be.visible");
    cy.get("#mobile-navigation-links").contains("a", "About").click();

    cy.location("pathname").should("eq", "/about/approach");
    cy.get("#mobile-navigation-links").should("not.be.visible");
    cy.get('button[aria-label="Open menu"]').should(
      "have.attr",
      "aria-expanded",
      "false",
    );
  });
});
