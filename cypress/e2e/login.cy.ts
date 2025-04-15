describe("Login oldal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login"); // vagy az útvonal amit használsz
  });

  it("Megjelenik a login form", () => {
    cy.get('input[data-cy="name"]').should("exist");
    cy.get('input[data-cy="password"]').should("exist");
    cy.get('button[data-cy="submit"]').should("exist");
  });

  it("Validációs hibaüzenetek megjelennek, ha üresen küldjük be a formot", () => {
    cy.get('button[data-cy="submit"]').click();

    cy.contains("A felhasználó név túl rövid.").should("exist");
    cy.contains(
      "A jelszónak legalább 8 karakter hosszúnak kell lennie."
    ).should("exist");
  });

  it("Hibás adatokkal nem enged be", () => {
    cy.get('input[data-cy="name"]').type("rossznev");
    cy.get('input[data-cy="password"]').type("RosszJelszó123!");
    cy.get('button[data-cy="submit"]').click();

    cy.contains("Nem sikerült bejelentkezni").should("exist");
  });

  it("Sikeres bejelentkezés kitchen szerepkörrel átirányít /kitchen-re", () => {
    cy.intercept("POST", "**/user/login", {
      statusCode: 200,
      body: {
        token: "kitchen",
        role: "kitchen",
      },
    }).as("loginKitchen");

    cy.get('input[data-cy="name"]').type("kitchenuser");
    cy.get('input[data-cy="password"]').type("HelyesJelszo123!");
    cy.get('button[data-cy="submit"]').click();

    cy.wait("@loginKitchen");
    cy.url().should("include", "/kitchen");
  });

  it("2FA bejelentkezéskor megjelenik email információ", () => {
    cy.intercept("POST", "**/user/login", {
      statusCode: 200,
      body: {
        email: "2fa@example.com",
        token: "2fa-token",
      },
    }).as("login2FA");

    cy.get('input[data-cy="name"]').type("2fauser");
    cy.get('input[data-cy="password"]').type("HelyesJelszo123!");
    cy.get('button[data-cy="submit"]').click();

    cy.wait("@login2FA");
    cy.contains("erősítse meg a bejelentkezést").should("exist");
    cy.contains("2fa@example.com").should("exist");
  });

  it("Elfelejtett jelszó link navigál", () => {
    cy.contains("Elfelejtettem a jelszavam").click();
    cy.url().should("include", "/forgot-password");
  });
});
