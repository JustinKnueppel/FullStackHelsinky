import React, { useState, useEffect } from "react";
import Toggleable from "./components/Toggleable"
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: "", text: "" });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setUser(loginService.loadSavedUser());
  }, []);

  const displayNotificaiton = async (type, text) => {
    setNotification({ text, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const addBlog = async (blog) => {
    const { token } = user;

    try {
      const returnedBlog = await blogService.postBlog(blog, token);
      setBlogs(blogs.concat(returnedBlog));
      displayNotificaiton(
        "success",
        `Added blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
    } catch (exception) {
      displayNotificaiton("error", "Unable to add blog");
    }
  };

  const logout = () => {
    setUser(null);
    loginService.removeSavedUser();
    displayNotificaiton("success", "Logged out");
  };

  const attemptLogin = async (username, password) => {
    try {
      const newUser = await loginService.authenticate(username, password);
      setUser(newUser);
      loginService.saveUser(newUser);
      displayNotificaiton("success", `${newUser.name} logged in`);
    } catch (exception) {
      displayNotificaiton("error", "Invalid credentials")
    }
  };

  const incrementLikes = async (targetBlog) => {
    const newBlog = {
      ...targetBlog,
      likes: targetBlog.likes + 1
    }

    try {
      await blogService.updateBlog(targetBlog.id, newBlog, user.token);
      setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog));
      displayNotificaiton("success", `Updated ${targetBlog.title}`)
    } catch (exception) {
      displayNotificaiton("error", "Failed to update blog")
    }
  }

  return (
    <div>
      {showNotification && (
        <Notification type={notification.type} text={notification.text} />
      )}
      {user === null ? "" : <h2>Logged in as {user.name}</h2>}
      {user === null ? "" : <button onClick={logout}>Logout</button>}
      {user === null ? (
        <Toggleable label="Login"><LoginForm attemptLogin={attemptLogin} /></Toggleable>
      ) : (
        <Toggleable label="Add Blog"><BlogForm addBlog={addBlog} /></Toggleable>
      )}
      <Blogs blogs={blogs} likeBlog={incrementLikes} />
    </div>
  );
};

export default App;
