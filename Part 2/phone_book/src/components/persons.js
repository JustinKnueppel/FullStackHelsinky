import React from "react";
import Person from "./person";

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person) => (
      <li>
        <Person key={person.name} person={person} />
      </li>
    ))}
  </ul>
);

export default Persons;
