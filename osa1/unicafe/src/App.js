import { useState } from 'react'

const App = () => {
  //tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue + 1)
    setAll(all + 1)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue + 1)
    setAll(all + 1)
  }
  const setToBad = (newValue) => {
    setBad(newValue + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Header header={"give feedback"} />
      <Button value={good} setToValue={setToGood} text={"good"} />
      <Button value={neutral} setToValue={setToNeutral} text={"neutral"} />
      <Button value={bad} setToValue={setToBad} text={"bad"} />
      <Header header={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.setToValue(props.value)}>{props.text}</button>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div>
        <StatisticLine text={"No feedback given"} value={""} />
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good + bad + neutral} />
        <StatisticLine text={"average"} value={(good * 1 + bad * -1) / all} />
        <StatisticLine text={"positive"} value={good / all * 100 + "%"} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

export default App