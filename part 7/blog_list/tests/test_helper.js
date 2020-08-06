const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUsers = [
  {
    username: "just",
    name: "Justin",
    password: "pw123",
  },
];

const nonExistingBlogId = async () => {
  const user = new User({
    username: "nonExistingBlogId",
    name: "nonExistingBlogId",
    password: "nonExistingBlogId",
  });
  await user.save();
  await user.remove();

  const blog = new Blog({
    title: "willremovethissoon",
    author: "No Author",
    url: "test.com",
    likes: 1,
    user: user._id,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingUserId = async () => {
  const user = new User({
    username: "deleteme",
    password: "badpass",
    name: "noname",
  });

  await user.save();
  await user.remove();

  return user._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingBlogId,
  initialUsers,
  nonExistingUserId,
  usersInDb,
};
