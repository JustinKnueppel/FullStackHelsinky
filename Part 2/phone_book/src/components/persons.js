import React from "react";
import Person from "./person";

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        <Person person={person} />
      </li>
    ))}
  </ul>
);

export default Persons;
