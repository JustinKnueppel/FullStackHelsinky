describe("Blog app", function () {
  beforeEach(function () {
    cy.request("GET", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "just",
      name: "Justin",
      password: "pw123",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.contains("Login").click();
    });

    it("Succeeds with valid credentials", function () {
      cy.get("input[name='username']").type("just");
      cy.get("input[name='password']").type("pw123");
      cy.get("button[type='submit']").click();
      cy.get(".success").contains("Justin logged in");
    });

    it("Fails with invalid credentials", function () {
      cy.get("input[name='username']").type("bad username");
      cy.get("input[name='password']").type("badpass");
      cy.get("button[type='submit']").click();
      cy.get(".error").contains("Invalid credentials");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "just",
        password: "pw123",
      };
      cy.request("POST", "http://localhost:3001/api/login", user).then(
        (response) => {
          localStorage.setItem("blogUser", JSON.stringify(response.body));
        }
      );
      cy.visit("http://localhost:3000");
    });

    it("A blog can be created", function () {
      cy.contains("Add blog").click();
      cy.get("input[name='title']").type("Test title");
      cy.get("input[name='author']").type("Test author");
      cy.get("input[name='url']").type("Test url");
      cy.get("input[name='likes']").type("1");
      cy.get("button[type='submit']").click();
      cy.contains("Test title");
    });

    it("A blog can be liked", function () {
      cy.contains("Add blog").click();
      cy.get("input[name='title']").type("Test title");
      cy.get("input[name='author']").type("Test author");
      cy.get("input[name='url']").type("Test url");
      cy.get("input[name='likes']").type("1");
      cy.get("button[type='submit']").click();
      cy.contains("Test title").get(".like-btn").click();
      cy.contains("Test title").get(".visibility-btn").click();
      cy.contains("Test title").get(".blog-likes").should("contain", "2");
    });

    it("A blog can be deleted by the person who added it", function() {
      cy.contains("Add blog").click();
      cy.get("input[name='title']").type("Test title");
      cy.get("input[name='author']").type("Test author");
      cy.get("input[name='url']").type("Test url");
      cy.get("input[name='likes']").type("1");
      cy.get("button[type='submit']").click();
      cy.contains("Test title").get(".delete-btn").click();
      cy.get(".success").contains("Test title deleted");
    });
  });
});
