const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const blog = await Blog.findById(id).populate("user");

    if (!blog) {
      return response.status(404).send();
    }
    response.json(blog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    const user = await User.findById(blog.user);
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = {
      author: request.body.author,
      url: request.body.url,
      title: request.body.title,
      likes: request.body.likes,
    };
    await Blog.findByIdAndUpdate(request.params.id, blog);
    response.status(200).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
