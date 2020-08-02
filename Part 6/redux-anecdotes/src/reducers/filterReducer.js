const initialState = "";

export default (state = initialState, { type, filter }) => {
  switch (type) {
    case "UPDATE":
      return filter.toLowerCase();

    default:
      return state;
  }
};

export const updateFilter = (filter) => {
  return {
    type: "UPDATE",
    filter,
  };
};
