let authToken: string;

beforeEach(() => {
  const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzYmI2MjE5YmZmOTJiYWY5ODBhZGUiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiY29vbC1zdmdyZXBvLWNvbS5zdmciLCJpYXQiOjE3NDA0NzQ1ODIsImV4cCI6MTc0MDUxNzc4Mn0.aBlKc6GBpOAH9_dCqXK5CK8ejRVLQPB1C0OCCUgCuH9";
  cy.visit("http://localhost:3000");

  cy.window().then((win) => {
    if (win.store) {
      win.store.dispatch({
        type: "user/changeUser",
        payload: {
          token: mockToken,
          role: "admin",
        },
      });
    } else {
      throw new Error("Store is not available on window object");
    }
  });

  cy.visit("http://localhost:3000/regisztracio");
});

describe("template spec", () => {
  it("should render the registration form correctly", () => {
    cy.get("[data-cy=name]").should("exist");
    cy.get("[data-cy=email]").should("exist");
    cy.get("[data-cy=password]").should("exist");
    cy.get("[data-cy=passwordRepeat]").should("exist");
    cy.get("[data-cy=role]").should("exist");
    cy.get("[data-cy=submit]").should("exist");
  });

  it("should display validation errors for empty fields", () => {
    cy.get("[data-cy=submit]").click();
    cy.contains("A felhasználó név túl rövid.").should("exist");
    cy.contains("Az email nem megfelelő formátumú.").should("exist");
    cy.contains("A jelszónak legalább 8 karakter hosszúnak kell lennie.").should("exist");
    cy.contains("Kérjük válassza ki a dolgozó státuszát.").should("exist");
  });

  it("should display error for invalid email format", () => {
    cy.get("[data-cy=email]").type("invalid-email");
    cy.get("[data-cy=submit]").click();
    cy.contains("Az email nem megfelelő formátumú.").should("exist");
  });

  it("should display error if passwords do not match", () => {
    cy.get("[data-cy=password]").type("Password123!");
    cy.get("[data-cy=passwordRepeat]").type("Different123!");
    cy.get("[data-cy=submit]").click();
    cy.contains("A jelszavak nem egyeznek.").should("exist");
  });

  it("should send POST request when registration form is valid", () => {
    cy.intercept("POST", "/user/register/admin").as("registerRequest");

    const uniqueName = `TestUser_${Cypress._.uniqueId()}`;
    const uniqueEmail = `${uniqueName}@example.com`;

    cy.get("[data-cy=name]").type(uniqueName);
    cy.get("[data-cy=email]").type(uniqueEmail);
    cy.get("[data-cy=password]").type("Password123!");
    cy.get("[data-cy=passwordRepeat]").type("Password123!");
    cy.get("[data-cy=role]").click({ force: true });
    cy.get("[data-cy=kitchen]").click();
    cy.get("[data-cy=submit]").click();

    // Ellenőrizzük, hogy POST kérést küldött el
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.request.body).to.include({
        name: uniqueName,
        email: uniqueEmail,
      });
    });
  });

  it("should show error if username already exists", () => {
    cy.intercept("POST", "/user/register/admin", {
      statusCode: 400,
      body: { message: "Van már ilyen nevű dolgozó" },
    }).as("registerRequest");

    cy.get("[data-cy=name]").type("admin");
    cy.get("[data-cy=email]").type("admin@example.com");
    cy.get("[data-cy=password]").type("Password123!");
    cy.get("[data-cy=passwordRepeat]").type("Password123!");
    cy.get("[data-cy=role]").click({ force: true });
    cy.get("[data-cy=salesman]").click();
    cy.get("[data-cy=submit]").click();

    // Ellenőrizzük, hogy a hibaüzenet megjelenik
    cy.wait("@registerRequest");
    cy.contains("Van már ilyen nevű dolgozó").should("exist");
  });

  it("should enable submit button when form is valid", () => {
    const uniqueName = `TestUser_${Cypress._.uniqueId()}`;
    const uniqueEmail = `${uniqueName}@example.com`;

    cy.get("[data-cy=name]").type(uniqueName);
    cy.get("[data-cy=email]").type(uniqueEmail);
    cy.get("[data-cy=password]").type("Password123!");
    cy.get("[data-cy=passwordRepeat]").type("Password123!");
    cy.get("[data-cy=submit]").should("not.be.disabled");
  });
});
