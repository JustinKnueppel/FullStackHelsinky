import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getUser(id).then((user) => setUser(user));
    console.log(user);
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
