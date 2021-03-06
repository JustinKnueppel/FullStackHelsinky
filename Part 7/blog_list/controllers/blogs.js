const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

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

    if (!user) {
      response.status(404).send({ error: "Invalid user" });
    }

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

blogsRouter.get("/:id/comments", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      response.status(404).send();
      return;
    }
    response.status(200).json({ comments: blog.comments });
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    const comment = {
      content: request.body.comment,
      blog: blog._id,
    };
    const newComment = new Comment(comment);
    await newComment.save();
    response.status(201).send();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get(
  "/:blogid/comments/:commentid",
  async (request, response, next) => {
    try {
      const comment = await Comment.findById(request.params.commentid);
      if (!comment) {
        response.status(404).send();
        return;
      }
      response.status(200).json(comment);
    } catch (exception) {
      next(exception);
    }
  }
);

module.exports = blogsRouter;
