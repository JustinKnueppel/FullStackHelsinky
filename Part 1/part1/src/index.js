import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>  
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)
const Content = (props) => {
  /* Zip parts and exercises into array of objects */
  return (
    <>
      {props.parts.map(part => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.parts.map(part => part.exercises).reduce((total, exercises) => total + exercises)}</p>
)

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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))