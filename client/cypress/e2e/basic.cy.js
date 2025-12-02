describe("Portfolio basic E2E", () => {
  it("navigates and shows sign in form", () => {
    cy.visit("/");
    cy.contains("Home");
    cy.contains("Projects").click();
    cy.url().should("include", "/projects");
    cy.contains("Sign In").click();
    cy.url().should("include", "/signin");
    cy.findByRole("heading", { name: /sign in/i }).should("exist");
    cy.findByLabelText(/email/i).should("exist");
    cy.findByLabelText(/password/i).should("exist");
  });

  it("stubs sign in and reveals Admin link", () => {
    cy.intercept("POST", "/api/auth/signin", { token: "test_token" }).as("signin");
    cy.intercept("GET", "/api/auth/me", { _id: "u1", name: "Admin", email: "admin@example.com", role: "admin" }).as("me");
    cy.visit("/signin");
    cy.findByLabelText(/email/i).type("admin@example.com");
    cy.findByLabelText(/password/i).type("password123");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.wait("@signin");
    cy.wait("@me");
    cy.contains("Admin").should("exist");
  });

  it("submits contact form (stubbed) and shows toast", () => {
    cy.intercept("POST", "/api/contacts", (req) => {
      req.reply({ statusCode: 201, body: { _id: "c1", ...req.body } });
    }).as("createContact");
    cy.visit("/contact");
    cy.findByLabelText(/first name/i).type("John");
    cy.findByLabelText(/last name/i).type("Doe");
    cy.findByLabelText(/contact number/i).type("1234567890");
    cy.findByLabelText(/^email$/i).type("john@example.com");
    cy.findByLabelText(/message/i).type("Hello!");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.wait("@createContact");
    // Toast text from Contact.jsx
    cy.contains(/Message sent/i).should("exist");
  });
});


