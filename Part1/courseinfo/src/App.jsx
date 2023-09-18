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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header head={course} />
      <Content exercise1={part1.exercises} parts1={part1.name} exercise2={part2.exercises} parts2={part2.name} exercise3={part3.exercises} parts3={part3.name} />
      <Total sum={ part1.exercises + part2.exercises + part3.exercises } />
    </div>
  )
}

export default App;