import axios from "axios";

const baseUrl = "http://localhost:3001";

const getAllAnecdotes = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`);
  const anecdotes = response.data;
  return anecdotes;
};

const createAnecdote = async (anecdote) => {
  const anecdoteObject = {
    content: anecdote,
    votes: 0,
  };
  const response = await axios.post(`${baseUrl}/anecdotes`, anecdoteObject);
  return response.data;
};

const voteFor = async (anecdote) => {
  const { id } = anecdote;
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/anecdotes/${id}`, updatedAnecdote);
  console.log(response.data);
  return response.data;
};

export { getAllAnecdotes, createAnecdote, voteFor };
