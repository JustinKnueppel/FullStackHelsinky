const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("Notes returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Notes returns correct number", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("Notes should have id named id", async () => {
  const response = await api.get("/api/blogs");
  const firstBlog = response.body[0];
  expect(firstBlog.id).toBeDefined();
});

test("Can add blog", async () => {
  const newBlog = new Blog({
    title: "New blog",
    author: "Big Author",
    url: "newblog.com",
    likes: 1,
  });

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await blogsInDb();
  expect(blogsAfterPost).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAfterPost.map((blog) => blog.title);
  expect(titles).toContain("New blog");
});

test("Likes default to 0", async () => {
  const newBlog = new Blog({
    title: "New blog",
    author: "Big Author",
    url: "newblog.com",
  });

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await blogsInDb();

  const found = blogsAfterPost.find((blog) => blog.title === "New blog");
  expect(found.likes).toEqual(0);
});

test("Title is required for new blog", async () => {
  const newBlog = new Blog({
    author: "Big Author",
    url: "newblog.com",
    likes: 1,
  });

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("Url is required for new blog", async () => {
  const newBlog = new Blog({
    title: "New blog",
    author: "Big Author",
    likes: 1,
  });

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(() => mongoose.connection.close());
