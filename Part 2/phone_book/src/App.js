import React, { useState, useEffect } from "react";

import personService from './services/personService'

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  /* Set initial state of application */
  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons);
    }
  )}, []);

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
    const newPerson = { name: newName, number: newNumber };

    if (duplicatePerson(persons, newName)) {
      if (window.confirm(`Override phone number of ${newName}?`)) {
        /* ID of person already in DB */
        const id = persons.find(person => person.name === newName).id;
        personService.replacePerson(id, newPerson);
        /* Update frontend data */
        setPersons(persons.map(person => person.id === id ? { ...newPerson, id } : person ))
      }
      return;
    }
    personService.addPerson(newPerson).then(person => {
      setPersons([...persons, person]);
  
      /* Reset form fields */
      setNewName("");
      setNewNumber("");
  
      /* Focus first input */
      const firstInput = document.querySelector("form.phonebook-form input");
      firstInput.focus();
    })
  };

  const deletePerson = ({ name, id }) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then((success) => {
        if (!success) {
          alert(`Failed to delete ${name}`)
          return
        }
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

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
      <Persons persons={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
