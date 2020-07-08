const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).send();
    }
    response.json(blog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
