import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displaySuccess } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(addAnecdote(anecdote));
    dispatch(displaySuccess("Anecdote added", 5));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
