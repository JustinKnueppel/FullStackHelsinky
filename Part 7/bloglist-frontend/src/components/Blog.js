import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setSuccess, setError } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [showDetails, setShowDetails] = useState(false);

  const like = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      await blogService.updateBlog(blog.id, newBlog, user.token);
      dispatch(likeBlog(blog.id));
      dispatch(setSuccess(`Updated ${blog.title}`));
    } catch (exception) {
      dispatch(setError("Failed to update blog"));
    }
  };

  const remove = async () => {
    const { id } = blog;
    try {
      await blogService.deleteBlog(id, user.token);
      dispatch(deleteBlog(id));
      dispatch(setSuccess(`${blog.title} deleted`));
    } catch (exception) {
      dispatch(setError(`Failed to delete ${blog.title}`));
    }
  };

  return (
    <div className="blog" >
      {blog.title}
      <button className="visibility-btn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "details"}
      </button>
      <button className="like-btn" onClick={like}>Like</button>
      <button className="delete-btn" onClick={remove}>delete</button>
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
