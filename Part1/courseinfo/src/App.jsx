const Header = (props) => {
  return (
    <>
      <h1>{props.head}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.myParts} {props.myExercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part myParts={props.parts1} myExercises={props.exercise1} />
      <Part myParts={props.parts2} myExercises={props.exercise2} />
      <Part myParts={props.parts3} myExercises={props.exercise3} />
    </div>
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
      <Content exercise1={exercises1} parts1={part1} exercise2={exercises2} parts2={part2} exercise3={exercises3} parts3={part3} />
      <Total sum={ exercises1 + exercises2 + exercises3 } />
    </div>
  )
}

export default App;