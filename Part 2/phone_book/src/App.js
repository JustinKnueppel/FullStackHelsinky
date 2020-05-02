import React, { useState } from "react";
import Persons from "./components/persons";
import PersonForm from "./components/personform";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "1234567890" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  /* Filter people based on name */
  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const setNameField = (event) => {
    setNewName(event.target.value);
  };

  const setNumberField = (event) => {
    setNewNumber(event.target.value);
  };

  const setNameFilterField = (event) => {
    setNameFilter(event.target.value);
  };

  const duplicatePerson = (persons, newName) =>
    persons.map((person) => person.name).includes(newName);

  const addPerson = (event) => {
    event.preventDefault();

    if (duplicatePerson(persons, newName)) {
      alert(`${newName} is already in the phonebook!`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);

    /* Reset form fields */
    setNewName("");
    setNewNumber("");

    /* Focus first input */
    const firstInput = document.querySelector("form.phonebook-form input");
    firstInput.focus();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilterField={setNameFilterField} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNameField={setNameField}
        newNumber={newNumber}
        setNumberField={setNumberField}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} />
    </div>
  );
};

export default App;