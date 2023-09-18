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
      <p>{props.myParts.name} {props.myExercises.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part myParts={props.parts[0]} myExercises={props.parts[0]} />
      <Part myParts={props.parts[1]} myExercises={props.parts[1]} />
      <Part myParts={props.parts[2]} myExercises={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      { <p>Number of Exercises {props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises }</p> }
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header head={course} />
      <Content parts={parts} />
      <Total sum={parts} />
    </div>
  )
}

export default App;