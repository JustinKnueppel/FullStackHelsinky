import React from "react";
import { useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { displaySuccess } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const handleVote = () => {
    dispatch(voteFor(anecdote));
    dispatch(displaySuccess(`Votes increased to ${anecdote.votes + 1}`, 5));
  };
  return (
    <div>
      <p>{anecdote.content}</p>
      <p>has {anecdote.votes} votes</p>
      <button onClick={handleVote}>vote</button>
    </div>
  );
};

export default Anecdote;
