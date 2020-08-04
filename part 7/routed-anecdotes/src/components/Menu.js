import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <Link to="/">anecdotes</Link>
      <Link to="/create">create new</Link>
      <Link to="/about">about</Link>
    </nav>
  );
};

export default Menu;
