import React from "react";
import Person from "./Person";

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
