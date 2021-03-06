import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Toggleable from "./components/Toggleable";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setError, setSuccess } from "./reducers/notificationReducer";
import { setAll } from "./reducers/blogReducer";
import { setUser, removeUser } from "./reducers/userReducer";
import "./App.css";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch(setAll(blogs)))
      .catch((error) => {
        console.log(error);
        dispatch(setError("Failed to retrieve blogs"));
      });
  }, [dispatch]);

  useEffect(() => {
    const user = loginService.loadSavedUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const logout = () => {
    loginService.removeSavedUser();
    dispatch(removeUser());
    dispatch(setSuccess("Logged out"));
  };

  return (
    <div>
      <Navigation />
      <Notification />
      {user.show && <button onClick={logout}>Logout</button>}
      {user.show && (
        <Toggleable label="Add blog">
          <BlogForm />
        </Toggleable>
      )}
      {!user.show && (
        <Toggleable label="Login">
          <LoginForm />
        </Toggleable>
      )}
      <Switch>
        <Route exact path="/">
          <Blogs />
        </Route>
        <Route exact path="/users/:id">
          <User />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/blogs/:id">
          <Blog />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
