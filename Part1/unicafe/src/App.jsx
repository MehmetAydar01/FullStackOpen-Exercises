import { useState } from "react"

// Headers
const Head1 = props => <h1>{props.text}</h1>
const Head2 = props => <h2>{props.text}</h2>

// feedback buttons
const FeedbackButton = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

// Buttons
const Buttons = (props) => {
  const { sets, feedbacks } = props
  return (
    <>
      <FeedbackButton handleClick={sets[0]} text={feedbacks[0]}/>
      <FeedbackButton handleClick={sets[1]} text={feedbacks[1]}/>
      <FeedbackButton handleClick={sets[2]} text={feedbacks[2]}/>
    </>
  )
}

// Sum
const Sum = (props) => {
  return (
    <tr>
      <td>all</td>
      <td>{props.sum}</td>
    </tr>
  )
}

// Average
const Average = (props) => {
  return (
    <tr>
      <td>average</td>
      <td>{ ( isNaN(props.average) ) ? 0 : props.average }</td>
    </tr>
  )
}

// Positive Feedback
const PositiveFeedback = (props) => {
  return (
    <tr>
      <td>positive</td>
      <td>{ ( isNaN(props.positiveFeedback) ) ? 0 : props.positiveFeedback } %</td>
    </tr>
  )
}

// no feedback
const NoFeedback = (props) => {
  return (
    <tr>
      <td>{props.nofeedback}</td>
    </tr>
  )
}

// Sum, Average & Positive Feedback
const SumAvgePfd = (props) => {
  const { sum, average, positiveFeedback, nofeedback } = props

  if (sum > 0 ) {
    return (
      <>
        <Sum sum={sum} />
        <Average average={average} />
        <PositiveFeedback positiveFeedback={positiveFeedback} />  
      </>
    )
  } else {
    return (
      <>
        <NoFeedback nofeedback={nofeedback} />
      </>
    )
  }
}

// Statistics
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// Statistics
const Statistics = (props) => {
  const { allFeedbacksSum, average, positiveFeedback, nofeedback } = props.transactions
  const { feedbacks } = props
  const { feedbacksValues } = props

  return (
    <table>
      <tbody>
        <StatisticLine text={feedbacks[0]} value={feedbacksValues[0]} />
        <StatisticLine text={feedbacks[1]} value={feedbacksValues[1]} />
        <StatisticLine text={feedbacks[2]} value={feedbacksValues[2]} />
      </tbody>
      <tfoot>
        <SumAvgePfd sum={allFeedbacksSum} average={average} positiveFeedback={positiveFeedback} nofeedback={nofeedback} />
      </tfoot>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const mySetGood = () => setGood(good + 1)
  const mySetNeutral = () => setNeutral(neutral + 1)
  const mySetBad = () => setBad(bad + 1)

  const transactions = {
    allFeedbacksSum: (good + neutral + bad),
    average: (good - bad) / (good + neutral + bad),
    positiveFeedback: (good / (good + neutral + bad)) * 100,
    nofeedback: 'no feedback given',
    sets: [mySetGood, mySetNeutral, mySetBad],
    feedbacks: ['good', 'neutral', 'bad'],
    feedbacksValues: [good, neutral, bad]
  }

  return (
    <div>
      <Head1 text='give feedback' />
      <Buttons sets={transactions.sets} feedbacks={transactions.feedbacks} />
      <Head2 text='statistics' />
      <Statistics feedbacks={transactions.feedbacks} feedbacksValues={transactions.feedbacksValues} transactions={transactions} />
    </div>
  )
}

export default App
