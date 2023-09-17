const Header = (props) => {
  return (
    <>
      <h1>{props.head}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>{props.parts} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of Exercises {props.sum}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header head={course} />
      <Content exercises={exercises1} parts={part1} />
      <Content exercises={exercises2} parts={part2} />
      <Content exercises={exercises3} parts={part3} />
      <Total sum={ exercises1 + exercises2 + exercises3 } />
    </div>
  )
}

export default App;