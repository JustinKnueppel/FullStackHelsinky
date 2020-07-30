import React from "react";
import { useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>{anecdote.content}</p>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
    </div>
  );
};

export default Anecdote;
