// Cypress test script for registration functionality

let authToken;

before(() => {
  // Navigate to login page
  cy.visit("http://localhost:3000/login");
  cy.url().should("eq", "http://localhost:3000/login");

  // Arrange
  cy.intercept("POST", "/user/login").as("loginRequest");
  const nameInput = cy.get("[data-cy=name]");
  const passwordInput = cy.get("[data-cy=password]");
  const button = cy.get("[data-cy=submit]");

  // Act
  nameInput.clear().type("admin");
  passwordInput.clear().type("admin");
  button.click();

  // Assert
  cy.wait("@loginRequest").then((interception) => {
    expect(interception.response?.statusCode).to.eq(200);
    expect(interception.response?.body.token).to.be.a("string");
    authToken = interception.response?.body.token.toString();
  });
});

beforeEach(() => {
  cy.visit("http://localhost:3000");

  cy.window().then((win) => {
    if (win.store) {
      win.store.dispatch({
        type: "user/changeUser",
        payload: {
          token: authToken,
          role: "admin",
        },
      });
    } else {
      throw new Error("Store is not available on window object");
    }
  });

  cy.visit("http://localhost:3000/regisztracio");
});

describe("Registration Form Tests", () => {
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
    cy.contains(
      "A jelszónak legalább 8 karakter hosszúnak kell lennie."
    ).should("exist");
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

    // Verify POST request
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.request.body).to.include({
        name: uniqueName,
        email: uniqueEmail,
      });
      expect(interception.response.statusCode).to.eq(201);
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

    // Verify error message
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
