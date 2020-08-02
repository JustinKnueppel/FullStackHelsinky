import * as  anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE":
      return action.data;
    case "VOTE":
      const targetAnecdote = state.find(
        (anecdote) => anecdote.id === action.data.id
      );
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? changedAnecdote : anecdote
      );
    case "NEW":
      const anecdote = action.data;
      return [...state, anecdote];
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch({
      type: "INITIALIZE",
      data: anecdotes,
    });
  };
};

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.voteFor(anecdote);
    dispatch({
      type: "VOTE",
      data: { id: anecdote.id },
    });
  }
};

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObject = await anecdoteService.createAnecdote(anecdote);
    dispatch({
      type: "NEW",
      data: anecdoteObject,
    })
  }
};

export default reducer;
