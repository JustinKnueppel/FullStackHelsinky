import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  return (
    <div className="blogs">
      <h2>blogs</h2>
      {[...blogs]
        .sort((b1, b2) => b1.likes < b2.likes)
        .map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
    </div>
  );
};

export default Blogs;
