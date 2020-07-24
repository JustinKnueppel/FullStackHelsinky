const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
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
  try {
    if (!request.token) {
      return response.status(401).send({ error: "Unauthorized" });
    }
    const decodedToken = jwt.decode(request.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id,
    });
    const result = await blog.save();

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.decode(request.token, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(204).end();
    }

    if (
      !decodedToken ||
      !(decodedToken.id.toString() === blog.user.toString())
    ) {
      return response.status(401).send({ error: "Invalid token" });
    }

    await blog.remove();
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
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog);
    response.status(200).send(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
