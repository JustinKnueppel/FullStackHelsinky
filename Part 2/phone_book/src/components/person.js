import React from "react";

const Person = ({ person }) => (
  <span>
    {person.name}: {person.number}
  </span>
);

export default Person;
