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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INITIALIZE",
    data: anecdotes,
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const addAnecdote = (anecdote) => {
  return {
    type: "NEW",
    data: anecdote,
  };
};

export default reducer;
