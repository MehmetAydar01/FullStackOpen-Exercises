
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

export default Course