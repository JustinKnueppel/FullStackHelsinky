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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "just",
        password: "pw123",
      });
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
      const blog = {
        title: "Test title",
        author: "Test author",
        url: "Test url",
        likes: 1,
      };
      cy.createBlog(blog);
      cy.contains("Test title").get(".like-btn").click();
      cy.contains("Test title").get(".visibility-btn").click();
      cy.contains("Test title").get(".blog-likes").should("contain", "2");
    });

    it("A blog can be deleted by the person who added it", function () {
      const blog = {
        title: "Test title",
        author: "Test author",
        url: "Test url",
        likes: 1,
      };
      cy.createBlog(blog);
      cy.contains("Test title").get(".delete-btn").click();
      cy.get(".success").contains("Test title deleted");
    });

    it("Blogs appear in order of likes", function () {
      const blogs = [
        {
          title: "Test title1",
          author: "Test author1",
          url: "Test url1",
          likes: 1,
        },
        {
          title: "Test title3",
          author: "Test author3",
          url: "Test url3",
          likes: 3,
        },
        {
          title: "Test title2",
          author: "Test author2",
          url: "Test url2",
          likes: 2,
        },
      ];
      blogs.forEach((blog) => cy.createBlog(blog));
      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("Test title3");
        cy.wrap(blogs[1]).contains("Test title2");
        cy.wrap(blogs[2]).contains("Test title1");
      });
    });
  });
});
