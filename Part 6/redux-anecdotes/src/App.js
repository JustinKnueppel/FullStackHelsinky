import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
