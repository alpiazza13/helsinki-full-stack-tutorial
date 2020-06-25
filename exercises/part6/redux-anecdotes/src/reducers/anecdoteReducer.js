import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}

export const createVote = (id) => {
    return async dispatch => {
        const anecdote = await anecdoteService.addVote(id)
        dispatch({
            type: 'VOTE',
            data: anecdote
        })
    }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {

      case 'VOTE':
          const id = action.data.id
          const anecdoteToChange = state.find(n => n.id === id)
          const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
          }
          return state.map(anecdote =>
            anecdote.id !== id ? anecdote : changedAnecdote
          )

      case 'ADD':
          const toAdd = action.data
          return [...state, toAdd]

      case 'INIT_ANECDOTES':
        return action.data

      default:
         return state
  }

}

export default anecdoteReducer
