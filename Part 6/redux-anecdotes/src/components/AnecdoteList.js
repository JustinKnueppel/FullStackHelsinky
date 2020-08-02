import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
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

export default AnecdoteList;
