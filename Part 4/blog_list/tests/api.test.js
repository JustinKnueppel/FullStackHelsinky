const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("Notes returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Notes returns correct number", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(3);
});

afterAll(() => mongoose.connection.close());
