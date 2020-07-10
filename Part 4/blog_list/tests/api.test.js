const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helpers = require("./test_helper");

const api = supertest(app);

describe("Blogs", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const singleUser = new User(helpers.initialUsers[0]);
    await singleUser.save();
  });
  beforeEach(async () => {
    await Blog.deleteMany({});

    const singleUser = await User.findOne({});

    const blogsWithUsers = helpers.initialBlogs.map((blog) => {
      return {
        ...blog,
        user: singleUser._id,
      };
    });
    const blogObjects = blogsWithUsers.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  describe("Retrieving all notes", () => {
    test("Notes returned as JSON", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("Notes returns correct number", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body).toHaveLength(helpers.initialBlogs.length);
    });

    test("Notes should have id named id", async () => {
      const response = await api.get("/api/blogs");
      const firstBlog = response.body[0];
      expect(firstBlog.id).toBeDefined();
    });
  });

  describe("Get one blog", () => {
    test("can retrieve single blog with valid id", async () => {
      const blogs = await helpers.blogsInDb();
      const validId = blogs[0].id;

      await api
        .get(`/api/blogs/${validId}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("should give 404 when given invalid id", async () => {
      const invalidId = await helpers.nonExistingBlogId();
      await api.get(`/api/blogs/${invalidId}`).expect(404);
    });
  });

  describe("Delete blog", () => {
    test("should have one fewer blogs after deletion of existing blog", async () => {
      const blogs = await helpers.blogsInDb();

      const id = blogs[0].id;

      await api.delete(`/api/blogs/${id}`).expect(204);
      const blogsAfterDeletion = await helpers.blogsInDb();
      expect(blogsAfterDeletion.length).toEqual(
        helpers.initialBlogs.length - 1
      );
    });

    test("should have same number of blogs after attempting to delete invalid blog", async () => {
      const id = await helpers.nonExistingBlogId();
      await api.delete(`/api/blogs/${id}`).expect(204);
      const blogsAfterDeletion = await helpers.blogsInDb();
      expect(blogsAfterDeletion.length).toEqual(helpers.initialBlogs.length);
    });
  });

  describe("Adding a blog", () => {
    test("Can add blog with all required elements", async () => {
      const singleUser = await User.findOne({});
      const newBlog = new Blog({
        title: "New blog",
        author: "Big Author",
        url: "newblog.com",
        likes: 1,
        user: singleUser._id,
      });

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAfterPost = await helpers.blogsInDb();
      expect(blogsAfterPost).toHaveLength(helpers.initialBlogs.length + 1);

      const titles = blogsAfterPost.map((blog) => blog.title);
      expect(titles).toContain("New blog");
    });

    test("Likes default to 0", async () => {
      const singleUser = await User.findOne({});

      const newBlog = new Blog({
        title: "New blog",
        author: "Big Author",
        url: "newblog.com",
        user: singleUser._id,
      });

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAfterPost = await helpers.blogsInDb();

      const found = blogsAfterPost.find((blog) => blog.title === "New blog");
      expect(found.likes).toEqual(0);
    });

    test("Title is required for new blog", async () => {
      const singleUser = await User.findOne({});
      const newBlog = new Blog({
        author: "Big Author",
        url: "newblog.com",
        likes: 1,
        user: singleUser._id,
      });

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("Url is required for new blog", async () => {
      const singleUser = await User.findOne({});
      const newBlog = new Blog({
        title: "New blog",
        author: "Big Author",
        likes: 1,
        user: singleUser._id,
      });

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("Updating a blog", () => {
    test("Can update likes of blog", async () => {
      const blogs = await helpers.blogsInDb();
      const blog = blogs[0];
      const startingLikes = blog.likes;
      const id = blog.id;
      const newBlog = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
      };
      await api.put(`/api/blogs/${id}`).send(newBlog).expect(200);
      const response = await api.get(`/api/blogs/${id}`);
      const blogAfterPut = response.body;

      expect(blogAfterPut.likes).toEqual(startingLikes + 1);
    });
  });
});

describe("Users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const userObjects = helpers.initialUsers.map((user) => new User(user));
    const userPromiseArray = userObjects.map((user) => user.save());
    await Promise.all(userPromiseArray);

    const userId = userObjects[0]._id;

    await Blog.deleteMany({});

    const blogObjects = helpers.initialBlogs.map(
      (blog) =>
        new Blog({
          ...blog,
          user: userId,
        })
    );
    const blogPromiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(blogPromiseArray);
    userObjects[0].blogs = userObjects[0].blogs.concat(
      blogObjects.map((blog) => blog._id)
    );
    await userObjects[0].save();
  });

  describe("Get all users", () => {
    test("should return json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("should return length of initial users", async () => {
      const response = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(helpers.initialUsers.length);
    });
  });

  describe("Get single user", () => {
    test("should return user matching id given", async () => {
      const users = await helpers.usersInDb();

      const user = users[0];

      const response = await api
        .get(`/api/users/${user.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.username).toEqual(user.username);
    });

    test("should return 404 for invalid id", async () => {
      const invalidId = await helpers.nonExistingUserId();

      await api.get(`/api/users/${invalidId}`).expect(404);
    });
  });

  describe("Add User", () => {
    test("should have one more user in db than initial", async () => {
      const user = {
        username: "New Username",
        name: "New Name",
        password: "NewPassword",
      };

      await api.post("/api/users").send(user).expect(201);
      const users = await helpers.usersInDb();
      expect(users).toHaveLength(helpers.initialUsers.length + 1);
    });

    test("should fail if username is excluded", async () => {
      const user = {
        name: "New Name",
        password: "NewPassword",
      };

      await api.post("/api/users").send(user).expect(400);
    });

    test("should fail if name is excluded", async () => {
      const user = {
        username: "New Username",
        password: "NewPassword",
      };

      await api.post("/api/users").send(user).expect(400);
    });

    test("should fail if password is excluded", async () => {
      const user = {
        username: "New Username",
        name: "New Name",
      };

      await api.post("/api/users").send(user).expect(400);
    });

    test("should have new username in database", async () => {
      const user = {
        name: "New Name",
        username: "New Username",
        password: "NewPassword",
      };

      await api
        .post("/api/users")
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const users = await helpers.usersInDb();
      const usernames = users.map((user) => user.username);
      expect(usernames).toContain("New Username");
    });
  });
});

afterAll(() => mongoose.connection.close());
