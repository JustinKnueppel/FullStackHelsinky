import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setUser(loginService.loadSavedUser());
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

  const logout = () => {
    setUser(null);
    loginService.removeSavedUser();
  };

  const login = (user) => {
    setUser(user);
    loginService.saveUser(user);
  };

  return (
    <div>
      {user === null ? "" : <h2>Logged in as {user.name}</h2>}
      {user === null ? "" : <button onClick={logout}>Logout</button>}
      {user === null ? (
        <LoginForm setUser={login} />
      ) : (
        <BlogForm addBlog={addBlog} />
      )}
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
