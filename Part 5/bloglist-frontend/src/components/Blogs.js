import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs }) => (
  <div className="blogs">
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default Blogs;
