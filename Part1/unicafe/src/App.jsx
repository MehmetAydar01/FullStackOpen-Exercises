import { useState } from "react"

const Head1 = props => <h1>{props.text}</h1>
const Head2 = props => <h2>{props.text}</h2>

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const Statistics = (props) => {
  return (
    <div>    
      {props.text} {props.value}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const mySetGood = () => {
    setGood(good + 1)
  }

  const mySetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const mySetBad = () => {
    setBad(bad + 1)
  }

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
    </div>
  )
}

export default App
