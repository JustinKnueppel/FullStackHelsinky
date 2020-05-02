import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts
    .map((part) => part.exercises)
    .reduce((total, exercises) => total + exercises);
  return (
    <p>
      <strong>Total of exercises {sum} exercises</strong>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

const Courses = ({ courses }) => (
  <>
    {courses.map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </>
);


export default Courses;
