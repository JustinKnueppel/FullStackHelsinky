import React, { useState } from 'react'
import { authenticate } from "../services/login"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const attemptAuthentication = async (event) => {
    event.preventDefault()
    try {
      const user = await authenticate(username, password);
      setUser(user)
    } catch (exception) {
      alert("Invalid credentials")
    }
  }

  return (
    <form onSubmit={attemptAuthentication}>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm