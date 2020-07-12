import React, { useState } from "react";
import FormGroup from "./FormGroup";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  const attemptPostBlog = (event) => {
    event.preventDefault();

    const likesNumber = likes && !isNaN(Number(likes)) ? Number(likes) : 0;

    const blog = {
      title,
      author,
      url,
      likes: likesNumber,
    };

    addBlog(blog);
  };

  return (
    <form onSubmit={attemptPostBlog}>
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
