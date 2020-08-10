import blogService from "../services/blogs";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ALL":
      return payload.blogs;
    case "ADD":
      return [...state, payload.blog];

    case "DELETE":
      return state.filter((blog) => blog.id !== payload.id);

    case "LIKE": {
      const targetBlog = state.find((blog) => blog.id === payload.id);
      const likedBlog = { ...targetBlog, likes: targetBlog.likes + 1 };
      return state.map((blog) => (blog.id === payload.id ? likedBlog : blog));
    }

    default:
      return state;
  }
};

export const setAll = (blogs) => {
  return {
    type: "SET_ALL",
    payload: { blogs },
  };
};

export const addBlog = (blog) => {
  return {
    type: "ADD",
    payload: { blog },
  };
};

export const deleteBlog = (id) => {
  return {
    type: "DELETE",
    payload: { id },
  };
};

export const likeBlog = (id) => {
  return {
    type: "LIKE",
    payload: { id },
  };
};
