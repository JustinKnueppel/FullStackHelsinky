import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import blogService from "../services/blogs";
import { addBlog } from "../reducers/blogReducer";
import { setSuccess, setError } from "../reducers/notificationReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  const postBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
      likes: !isNaN(Number(likes)) ? Number(likes) : 0,
    };

    const { token } = user;

    try {
      const returnedBlog = await blogService.postBlog(blog, token);
      dispatch(addBlog(returnedBlog));
      dispatch(
        setSuccess(`Added blog ${returnedBlog.title} by ${returnedBlog.author}`)
      );
    } catch (exception) {
      dispatch(setError("Unable to add blog"));
    }
  };

  return (
    <form onSubmit={postBlog}>
      <FormGroup>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="likes">Likes</label>
        <input
          type="text"
          name="likes"
          value={likes}
          onChange={(event) => setLikes(event.target.value)}
        />
      </FormGroup>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
