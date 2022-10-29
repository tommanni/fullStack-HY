const Course = (props) => {
    const total = props.parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            <Header name={props.name} />
            <Content parts={props.parts} total={total} />
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.exercises}
            </p>
        </div>
    )
}

export default Course