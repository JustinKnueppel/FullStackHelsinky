import React, { useState } from "react";
import FormGroup from "./FormGroup";

const LoginForm = ({ attemptLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitCredentials = async (event) => {
    event.preventDefault();
    attemptLogin(username, password)
  };

  return (
    <form onSubmit={submitCredentials}>
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
