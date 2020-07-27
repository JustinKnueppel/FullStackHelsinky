const testRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

testRouter.get("/reset", async (request, response, next) => {
  const userPromise = User.deleteMany({});
  const blogPromise = Blog.deleteMany({});
  try {
    await Promise.all([userPromise, blogPromise]);
    response.status(200).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = testRouter;
