import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
    const response = await axios.get(baseUrl)
    const anecdotes = response.data
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    anecdoteToChange.votes = anecdoteToChange.votes + 1
    const response2 = await axios.put(baseUrl + '/' + id, anecdoteToChange)
    return response2.data
}

export default { getAll, createNew, addVote }
