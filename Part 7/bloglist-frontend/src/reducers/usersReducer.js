const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USERS":
      return payload.users;

    default:
      return state;
  }
};

export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    payload: { users },
  };
};
