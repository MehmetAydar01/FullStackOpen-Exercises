
const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ partContent }) => <div>{partContent.name} {partContent.exercises}</div>

const TotalExercises = ({ sum }) => {
  const total = sum.parts.reduce((s, p) => {
    console.log('s : ', s, 'p : ', p)
    return s + p.exercises
  }, 0)

  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      {course.parts.map(part =>
        <Content key={part.id} partContent={part} />
      )}
      <TotalExercises sum={course} />
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App