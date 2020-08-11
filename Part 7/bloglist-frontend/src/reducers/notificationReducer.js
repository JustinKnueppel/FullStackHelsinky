const initialState = {
  type: "",
  text: "",
  show: false,
  timeoutId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CLEAR_NOTIFICATION":
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return { ...state, timeoutId: null };

    case "HIDE_NOTIFICATION":
      return initialState;

    case "TIMEOUT_NOTIFICATION":
      return {
        ...state,
        timeoutId: payload.id,
      };

    case "SUCCESS_NOTIFICATION":
      return {
        ...state,
        type: "success",
        show: true,
        ...payload,
      };

    case "ERROR_NOTIFICATION":
      return {
        ...state,
        type: "error",
        show: true,
        ...payload,
      };

    default:
      return state;
  }
};

const setNotification = (type, text) => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
    dispatch({ type, payload: { text } });
    const id = setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
    dispatch({ type: "TIMEOUT_NOTIFICATION", payload: { id } });
  };
};

export const setSuccess = (text) => setNotification("SUCCESS_NOTIFICATION", text);
export const setError = (text) => setNotification("ERROR_NOTIFICATION", text);
