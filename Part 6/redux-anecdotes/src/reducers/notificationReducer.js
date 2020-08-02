const initialState = {
  show: false,
  type: "",
  text: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        show: true,
        type: "error",
        text: action.data.text,
      };

    case "SUCCESS":
      return {
        show: true,
        type: "success",
        text: action.data.text,
      };

    case "HIDE":
      return initialState;

    default:
      return state;
  }
};

export const displayError = (text) => {
  return {
    type: "ERROR",
    data: { text },
  };
};

export const displaySuccess = (text) => {
  return {
    type: "SUCCESS",
    data: { text },
  };
};

export const hideNotification = () => {
  return { type: "HIDE" };
};
