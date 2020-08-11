import React from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";

const Blogs = ({ likeBlog, deleteBlog }) => {
  const blogs = useSelector(state => state.blogs);
  return (
    <div className="blogs">
      <h2>blogs</h2>
      {[...blogs]
        .sort((b1, b2) => b1.likes < b2.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default Blogs;
