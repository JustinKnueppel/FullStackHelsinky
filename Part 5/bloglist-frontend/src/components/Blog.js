import React, { useState } from "react";
const Blog = ({ blog, likeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "details"}
      </button>
      <button onClick={() => likeBlog(blog)}>Like</button>
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
