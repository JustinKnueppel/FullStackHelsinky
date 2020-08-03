import React from "react";
import { connect } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = (props) => {
  const filteredAnecdotes = props.anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(props.filter)
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes
        .sort((a1, a2) => a1.votes < a2.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}


export default connect(mapStateToProps)(AnecdoteList);
