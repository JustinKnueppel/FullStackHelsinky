import React, { useState } from "react";
import loginService from "../services/login";
import FormGroup from "./FormGroup";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptAuthentication = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.authenticate(username, password);
      setUser(user);
    } catch (exception) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={attemptAuthentication}>
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
