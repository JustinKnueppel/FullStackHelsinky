const mongoose = require("mongoose");
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Superman returns",
    author: "John Doe",
    url: "https://test.superman.com",
    likes: 2,
  },
  {
    title: "Code all the things",
    author: "Mrs. Programmer",
    url: "freecodecamp.com",
  },
];

const nonExistingId = async () => {
  const note = new Blog({
    title: "willremovethissoon",
    author: "No Author",
    url: "test.com",
    likes: 1,
  });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb, nonExistingId };
