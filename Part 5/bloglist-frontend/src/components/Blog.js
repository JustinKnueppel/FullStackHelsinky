import React, { useState } from "react";
const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "details"}
      </button>
      <button onClick={() => likeBlog(blog)}>Like</button>
      <button onClick={() => deleteBlog(blog)}>delete</button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
