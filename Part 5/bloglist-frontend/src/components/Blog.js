import React, { useState } from "react";
const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {blog.title}
      <button className="visibility-btn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "details"}
      </button>
      <button className="like-btn" onClick={() => likeBlog(blog)}>Like</button>
      <button className="delete-btn" onClick={() => deleteBlog(blog)}>delete</button>
      {showDetails && (
        <div>
          <p className="blog-url" >{blog.url}</p>
          <p className="blog-likes" >{blog.likes}</p>
          <p className="blog-author" >{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
