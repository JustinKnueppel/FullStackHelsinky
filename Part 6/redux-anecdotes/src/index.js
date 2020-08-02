import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { getAllAnecdotes } from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

getAllAnecdotes().then((anecdotes) =>
  store.dispatch(initializeAnecdotes(anecdotes))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
