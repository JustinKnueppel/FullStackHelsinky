import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "details"}
      </button>
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
