import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displaySuccess, hideNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = await createAnecdote(event.target.anecdote.value);
    dispatch(addAnecdote(anecdote));
    dispatch(displaySuccess("Anecdote added"));
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
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
