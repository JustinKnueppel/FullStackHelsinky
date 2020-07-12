import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { getAll, postBlog } from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = async (blog) => {
    const { token } = user;

    try {
      const returnedBlog = await postBlog(blog, token);
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      alert("Unable to add blog");
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <BlogForm addBlog={addBlog} />
      )}
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
