import { useState } from "react"

// Headers
const Head1 = props => <h1>{props.text}</h1>
const Head2 = props => <h2>{props.text}</h2>

const FeedbackButton = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

// Buttons
const Buttons = (props) => {
  return (
    <>
      <FeedbackButton handleClick={props.sets[0]} text={props.feedbacks[0]}/>
      <FeedbackButton handleClick={props.sets[1]} text={props.feedbacks[1]}/>
      <FeedbackButton handleClick={props.sets[2]} text={props.feedbacks[2]}/>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

// Statistics
const Statistics = (props) => {
  return (
    <>
      <StatisticLine text={props.feedbacks[0]} value={props.feedbacksValues[0]} />
      <StatisticLine text={props.feedbacks[1]} value={props.feedbacksValues[1]} />
      <StatisticLine text={props.feedbacks[2]} value={props.feedbacksValues[2]} />
    </>
  )
}

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

  const sets = [mySetGood, mySetNeutral, mySetBad]
  const feedbacks = ['good', 'neutral', 'bad']
  const feedbacksValues = [good, neutral, bad]

  const transactions = {
    allFeedbacksSum: (good + neutral + bad),
    average: (good - bad) / (good + neutral + bad),
    positiveFeedback: (good / (good + neutral + bad)) * 100
  }

  return (
    <div>
      <Head1 text='give feedback' />
      <Buttons sets={sets} feedbacks={feedbacks} />
      <Head2 text='statistics' />
      <Statistics feedbacks={feedbacks} feedbacksValues={feedbacksValues} />
      <SumAvgePfd sum={transactions.allFeedbacksSum} average={transactions.average} positiveFeedback={transactions.positiveFeedback} nofeedback='no feedback given' />
    </div>
  )
}

export default App
