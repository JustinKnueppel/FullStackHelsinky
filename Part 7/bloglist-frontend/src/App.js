import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Toggleable from "./components/Toggleable";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setError, setSuccess } from "./reducers/notificationReducer";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
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
      dispatch(
        setSuccess(`Added blog ${returnedBlog.title} by ${returnedBlog.author}`)
      );
    } catch (exception) {
      dispatch(setError("Unable to add blog"));
    }
  };

  const logout = () => {
    setUser(null);
    loginService.removeSavedUser();
    dispatch(setSuccess("Logged out"));
  };

  const attemptLogin = async (username, password) => {
    try {
      const newUser = await loginService.authenticate(username, password);
      setUser(newUser);
      loginService.saveUser(newUser);
      dispatch(setSuccess(`${newUser.name} logged in`));
    } catch (exception) {
      dispatch(setError("Invalid credentials"));
    }
  };

  const incrementLikes = async (targetBlog) => {
    const newBlog = {
      ...targetBlog,
      likes: targetBlog.likes + 1,
    };

    try {
      await blogService.updateBlog(targetBlog.id, newBlog, user.token);
      setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)));
      dispatch(setSuccess(`Updated ${targetBlog.title}`));
    } catch (exception) {
      dispatch(setError("Failed to update blog"));
    }
  };

  const deleteBlog = async (targetBlog) => {
    const { id } = targetBlog;
    try {
      await blogService.deleteBlog(id, user.token);
      setBlogs(blogs.filter((blog) => blog.id !== targetBlog.id));
      dispatch(setSuccess(`${targetBlog.title} deleted`));
    } catch (exception) {
      dispatch(setError(`Failed to delete ${targetBlog.title}`));
    }
  };

  return (
    <div>
      <Notification />
      {user === null ? "" : <h2>Logged in as {user.name}</h2>}
      {user === null ? "" : <button onClick={logout}>Logout</button>}
      {user === null ? (
        <Toggleable label="Login">
          <LoginForm attemptLogin={attemptLogin} />
        </Toggleable>
      ) : (
        ""
      )}
      {user === null ? (
        ""
      ) : (
        <Toggleable label="Add blog">
          <BlogForm addBlog={addBlog} />
        </Toggleable>
      )}
      <Blogs blogs={blogs} likeBlog={incrementLikes} deleteBlog={deleteBlog} />
    </div>
  );
};

export default App;
