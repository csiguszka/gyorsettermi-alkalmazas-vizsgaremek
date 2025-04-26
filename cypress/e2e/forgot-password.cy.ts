describe("Elfelejtett jelszó oldal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/forgot-password");
  });

  it("Megjelenik az email mező", () => {
    cy.get('[data-cy="name"]').should("exist");
  });

  it("Nem küldhető el üresen", () => {
    cy.get("form#forgotPassword").submit();
    cy.contains("Kérjük valós email címet adjon meg.").should("exist");
  });

  it("Hibás email formátumot nem fogad el", () => {
    cy.get('[data-cy="name"]').type("rosszemail");
    cy.get("form#forgotPassword").submit();
    cy.contains("Kérjük valós email címet adjon meg.").should("exist");
  });

  it("Sikeres beküldés toast üzenettel", () => {
    cy.intercept("POST", "**/user/forgetPassword", {
      statusCode: 200,
    }).as("postForgot");

    cy.get('[data-cy="name"]').type("teszt@example.com");
    cy.get("form#forgotPassword").submit();

    cy.wait("@postForgot");

    cy.contains("A megadott email címre ellenőrző kódot küldtünk").should(
      "exist"
    );
  });

  it("Sikertelen beküldés toast üzenettel", () => {
    cy.intercept("POST", "**/user/forgetPassword", {
      statusCode: 404,
    }).as("postForgotFail");

    cy.get('[data-cy="name"]').type("nemletezo@example.com");
    cy.get("form#forgotPassword").submit();

    cy.wait("@postForgotFail");

    cy.contains("A megadott email cím nincs regisztrálva").should("exist");
  });
});
