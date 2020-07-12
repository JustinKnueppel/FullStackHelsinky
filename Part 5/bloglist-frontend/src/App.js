import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = async (blog) => {
    const { token } = user;

    try {
      const returnedBlog = await blogService.postBlog(blog, token);
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      alert("Unable to add blog");
    }
  };

  return (
    <div>
      {user === null ? "" : <h2>Logged in as {user.name}</h2>}
      {user === null ? (
        ""
      ) : (
        <button onClick={() => setUser(null)}>Logout</button>
      )}
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <BlogForm addBlog={addBlog} />
      )}
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
