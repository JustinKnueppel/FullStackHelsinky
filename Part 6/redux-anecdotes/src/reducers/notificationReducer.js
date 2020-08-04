const initialState = {
  show: false,
  type: "",
  text: "",
  timeoutId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        show: true,
        type: "error",
        text: action.data.text,
      };

    case "SUCCESS":
      return {
        ...state,
        show: true,
        type: "success",
        text: action.data.text,
      };

    case "HIDE":
      return initialState;

    case "SET_TIMEOUT":
      return {
        ...state,
        timeoutId: action.data.id,
      };

    case "CLEAR_TIMEOUT":
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return {
        ...state,
        timeoutId: null,
      };

    default:
      return state;
  }
};

const setTimeoutId = (id) => {
  return {
    type: "SET_TIMEOUT",
    data: { id },
  };
};

const clearTimeoutId = () => {
  return {
    type: "CLEAR_TIMEOUT",
  };
};

export const displayError = (text, timeout) => {
  return async (dispatch) => {
    dispatch(clearTimeoutId());
    dispatch({ type: "ERROR", data: { text } });
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, timeout * 1000);
    dispatch(setTimeoutId(timeoutId));
  };
};

export const displaySuccess = (text, timeout) => {
  return async (dispatch) => {
    dispatch(clearTimeoutId());
    dispatch({ type: "SUCCESS", data: { text } });
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, timeout * 1000);
    dispatch(setTimeoutId(timeoutId));
  };
};

export const hideNotification = () => {
  return { type: "HIDE" };
};
