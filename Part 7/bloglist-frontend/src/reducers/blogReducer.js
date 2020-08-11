const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_BLOGS":
      return payload.blogs;
    case "ADD_BLOG":
      return [...state, payload.blog];

    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== payload.id);

    case "LIKE_BLOG": {
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
    type: "SET_BLOGS",
    payload: { blogs },
  };
};

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    payload: { blog },
  };
};

export const deleteBlog = (id) => {
  return {
    type: "DELETE_BLOG",
    payload: { id },
  };
};

export const likeBlog = (id) => {
  return {
    type: "LIKE_BLOG",
    payload: { id },
  };
};
