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

export const displayError = (text, timeout) => {
  return async (dispatch) => {
    dispatch({ type: "ERROR", data: { text } });
    setTimeout(() => {
      dispatch(hideNotification());
    }, timeout * 1000);
  };
};

export const displaySuccess = (text, timeout) => {
  return async (dispatch) => {
    dispatch({ type: "SUCCESS", data: { text } });
    setTimeout(() => {
      dispatch(hideNotification());
    }, timeout * 1000);
  };
};

export const hideNotification = () => {
  return { type: "HIDE" };
};
