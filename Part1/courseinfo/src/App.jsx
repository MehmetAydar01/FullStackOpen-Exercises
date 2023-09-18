const Header = (props) => {
  return (
    <>
      <h1>{props.head.name}</h1>
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
      <Part myParts={props.contents.parts[0]} myExercises={props.contents.parts[0]} />
      <Part myParts={props.contents.parts[1]} myExercises={props.contents.parts[1]} />
      <Part myParts={props.contents.parts[2]} myExercises={props.contents.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      {<p>Number of Exercises {props.sum.parts[0].exercises + props.sum.parts[1].exercises + props.sum.parts[2].exercises}</p>}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header head={course} />
      <Content contents={course} />
      <Total sum={course} />
    </div>
  )
}

export default App;