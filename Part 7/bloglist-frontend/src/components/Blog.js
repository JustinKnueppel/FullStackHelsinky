import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setSuccess, setError } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const Blog = () => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);
  const user = useSelector((state) => state.user);
  const [showDetails, setShowDetails] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    blogService.getBlog(id).then((returnedBlog) => {
      setBlog(returnedBlog);
    });
  }, []);

  if (!blog) {
    return null;
  }

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
    <div className="blog">
      <h2>{blog.title} by {blog.author}</h2>
      <span>{blog.likes} likes</span>
      <button className="like-btn" onClick={like}>
        Like
      </button>
      <p><a href={blog.url} className="blog-url">{blog.url}</a></p>
      <button className="delete-btn" onClick={remove}>
        delete
      </button>
      <p>Added by {blog.user.name}</p>
    </div>
  );
};

export default Blog;
