import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displaySuccess } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    props.addAnecdote(anecdote);
    props.displaySuccess("Anecdote added", 5);
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

const mapDispatchToProps = {
  addAnecdote,
  displaySuccess
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);
