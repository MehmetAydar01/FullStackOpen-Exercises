import { useState } from "react"

// Headers
const Head1 = props => <h1>{props.text}</h1>
const Head2 = props => <h2>{props.text}</h2>

// Buttons
const Button = props => <button onClick={props.handleClick}>{props.text}</button>

// Statistics
const Statistics = props => <div>{props.text} {props.value}</div>

// Sum, Average & Positive Feedback
const SumAvgePfd = (props) => {
  if (props.sum > 0 ) {
    return (
      <>
        <div>all {props.sum}</div>
        <div>average { ( isNaN(props.average) ) ? 0 : props.average }</div>
        <div>positive { ( isNaN(props.positiveFeedback) ) ? 0 : props.positiveFeedback } %</div>
      </>
    )
  } else {
    return (
      <>
        <div>{props.nofeedback}</div>
      </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const mySetGood = () => setGood(good + 1)
  const mySetNeutral = () => setNeutral(neutral + 1)
  const mySetBad = () => setBad(bad + 1)

  const allFeedbackSum = (good + neutral + bad)

  return (
    <div>
      <Head1 text='give feedback' />
      <Button handleClick={mySetGood} text='good' />
      <Button handleClick={mySetNeutral} text='neutral' />
      <Button handleClick={mySetBad} text='bad' />
      <Head2 text='statistics' />
      <Statistics text='good' value={good} />
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />  
      <SumAvgePfd sum={allFeedbackSum} average={(good - bad) / allFeedbackSum} positiveFeedback={(good / allFeedbackSum) * 100} nofeedback='no feedback given' />
    </div>
  )
}

export default App
