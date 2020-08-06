const initialState = {
  type: "",
  text: "",
  show: false,
  timeoutId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CLEAR":
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return { ...state, timeoutId: null };

    case "HIDE":
      return initialState;

    case "TIMEOUT":
      return {
        ...state,
        timeoutId: payload.id,
      };

    case "SUCCESS":
      return {
        ...state,
        type: "success",
        show: true,
        ...payload,
      };

    case "ERROR":
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
    dispatch({ type: "CLEAR" });
    dispatch({ type, payload: { text } });
    const id = setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
    dispatch({ type: "TIMEOUT", payload: { id } });
  };
};

export const setSuccess = (text) => setNotification("SUCCESS", text);
export const setError = (text) => setNotification("ERROR", text);
