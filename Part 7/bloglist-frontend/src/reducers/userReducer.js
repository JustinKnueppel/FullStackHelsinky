const initialState = {
  username: "",
  name: "",
  token: "",
  show: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        name: payload.user.name,
        username: payload.user.username,
        token: payload.user.token,
        show: true,
      };

    case "REMOVE_USER":
      return initialState;

    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: { user },
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};
