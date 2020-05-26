import React, { useState } from 'react'
import ReactDOM from 'react-dom'


// const Display = props => <div>{props.value}</div>
const DisplayHeader = ({value}) => <h1>{value}</h1>
const Statistic = props => <tbody><tr><td width="75px">{props.value}</td><td width="200px">{props.number}{props.extra}</td></tr></tbody>
const Button = ({text, handleClick}) => <button onClick = {handleClick}> {text} </button>

const Statistics = props => {
    if (props.all === 0) {return (<div> no reviews yet </div>)}

    return (
        <div>
            <table>
            <Statistic value="good" number={props.good}/>
            <Statistic value="neutral" number={props.neutral}/>
            <Statistic value="bad" number={props.bad}/>
            <Statistic value="all" number={props.all}/>
            <Statistic value="average" number={props.average}/>
            <Statistic value="positive" number={props.percentGood} extra="%"/>
        </table>
    </div>


    )
}




const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / (good + bad)
  const percentGood = good / all * 100

  return (
    <div>
        <DisplayHeader value="give feedback" />
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <DisplayHeader value="statistics" />
        <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} percentGood={percentGood} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
