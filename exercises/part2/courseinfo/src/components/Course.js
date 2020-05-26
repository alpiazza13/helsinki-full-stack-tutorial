import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ parts }) => {
  const only_nums = parts.map((part) => part.exercises)
  const sum = only_nums.reduce((a1, a2) => a1+a2, 0)
  return <p> <b> total of {sum} exercises </b> </p>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }) =>
    parts.map((part) =>
      <Part key={part.id} part={part} />)


const Course = ({course}) => {
      return (
        <div>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}

export default Course
