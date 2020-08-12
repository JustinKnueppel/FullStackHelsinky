import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && <span>{user.name} logged in</span>}
    </nav>
  );
};

export default Navigation;
