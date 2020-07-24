import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, likeBlog }) => (
  <div className="blogs">
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
    ))}
  </div>
);

export default Blogs;
