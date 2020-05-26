import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayHeader = ({value}) => <h1>{value}</h1>
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const randN = () => Math.floor(Math.random() * props.anecdotes.length)
  // why does the above line work, but the line below does not?!?!?!?
  // const randN = Math.floor(Math.random() * props.anecdotes.length)

  const updateVotes = () => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
  }

     const maxVotes = Math.max(...votes)
     const maxPos = votes.indexOf(maxVotes)
     const mostPopular = props.anecdotes[maxPos]

  return (
    <div>
      <DisplayHeader value="Anecdote of the day" />
      <Display value={anecdotes[selected]} />
      <Display value={"has " + votes[selected] + " votes"} />
      <Button handleClick={() => setSelected(randN)} text="next anectode" />
      <Button handleClick={updateVotes} text="Vote" />
      <DisplayHeader value="Most popular anectode" />
      <Display value={mostPopular} />
      <Display value={"has " + votes[maxPos] + " votes"} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
