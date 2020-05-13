import React from "react";
import Person from "./person";

const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        <Person person={person} />
        <button onClick={deletePerson(person)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default Persons;
