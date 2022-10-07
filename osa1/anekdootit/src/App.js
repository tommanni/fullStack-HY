import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes[0])
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  const votesCopy = [...votes]

  const randomNum = () => {
    let num = Math.floor(Math.random() * 10)
    while (num > 6) {
      num = Math.floor(Math.random() * 10)
    }
    return num
  }

  const setValuesAndAnecdote = (value) => {
    setSelected(value += 1)
    setAnecdote(anecdotes[randomNum()])
  }

  const setToVotes = () => {
    votesCopy[anecdotes.indexOf(anecdote)] += 1
    setVotes(votesCopy)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdote}
      <Votes votes={votesCopy[anecdotes.indexOf(anecdote)]} />
      <Button text="vote" setToValue={setToVotes} />
      <Button text="next anecdote" setToValue={setValuesAndAnecdote} value={selected} />
      <MostVotes votes={votesCopy} anecdotes={anecdotes} anecdote={anecdote} />
    </div>
  )
}

const Button = (props) => {

  return (
    <button onClick={() => props.setToValue(props.value)}>{props.text}</button>
  )
}

const Votes = (props) => {

  return (
    <div>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const MostVotes = (props) => {

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[props.votes.indexOf(Math.max(...props.votes))]}</p>
      <p>has {Math.max(...props.votes)} votes</p>
    </div>
  )
}

export default App