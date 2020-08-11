import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormGroup from "./FormGroup";
import loginService from "../services/login";
import { setUser } from "../reducers/userReducer";
import { setSuccess, setError } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.authenticate(username, password);
      dispatch(setUser(newUser));
      loginService.saveUser(newUser);
      dispatch(setSuccess(`${newUser.name} logged in`));
    } catch (exception) {
      dispatch(setError("Invalid credentials"));
    }
  };

  return (
    <form onSubmit={attemptLogin}>
      <FormGroup>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormGroup>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
