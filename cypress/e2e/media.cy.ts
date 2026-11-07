const leadVideo = "header video";

describe("Project media smoke checks", () => {
  it("should play the project video muted at 2x and pauses it offscreen", () => {
    cy.visit("/projects/autodash");
    cy.get<HTMLVideoElement>(leadVideo).scrollIntoView();
    cy.get<HTMLVideoElement>(leadVideo, { timeout: 10000 }).should(($video) => {
      const video = $video[0];
      expect(video.paused).to.equal(false);
      expect(video.currentTime).to.be.greaterThan(0);
      expect(video.muted).to.equal(true);
      expect(video.playbackRate).to.equal(2);
      expect(video.defaultPlaybackRate).to.equal(2);
    });

    cy.scrollTo("bottom");
    cy.get<HTMLVideoElement>(leadVideo).should(($video) => {
      expect($video[0].paused).to.equal(true);
    });
  });

  it("should keep the video, poster and caption usable on mobile", () => {
    cy.viewport(390, 844);
    cy.visit("/projects/autodash");
    cy.get<HTMLVideoElement>(leadVideo).scrollIntoView();
    cy.get<HTMLVideoElement>(leadVideo).should(($video) => {
      const video = $video[0];
      const bounds = video.getBoundingClientRect();
      expect(video.getAttribute("poster")).to.be.a("string").and.not.be.empty;
      expect(bounds.width).to.be.greaterThan(0);
      expect(bounds.left).to.be.at.least(0);
      expect(bounds.right).to.be.at.most(390);
    });
    cy.get(leadVideo)
      .closest("figure")
      .find("figcaption")
      .should("be.visible")
      .and("contain.text", "Compare lease balances");
  });

  it("shows a direct link when the video cannot load", () => {
    cy.visit("/projects/autodash");
    cy.get(leadVideo).scrollIntoView();

    cy.get(leadVideo)
      .closest("figure")
      .find('[role="status"]')
      .should("not.exist");

    cy.get<HTMLVideoElement>(leadVideo).then(($video) => {
      const source = $video.attr("src");
      expect(source).to.be.a("string").and.not.be.empty;

      cy.wrap($video).trigger("error", {
        bubbles: false,
        cancelable: false,
      });

      cy.get(leadVideo)
        .closest("figure")
        .find('[role="status"]')
        .should("be.visible")
        .and("contain.text", "This video could not be loaded")
        .find("a")
        .should("have.attr", "href", source);
    });
  });
});
