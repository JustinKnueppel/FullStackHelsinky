import React, { useState, useEffect } from "react";

import personService from "./services/personService";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [notificationType, setNotificationType] = useState("");

  /* Set initial state of application */
  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

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

  const resetNotification = () => {
    setNotificationText("");
    setNotificationType("");
  };

  const duplicatePerson = (persons, newName) =>
    persons.map((person) => person.name).includes(newName);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (duplicatePerson(persons, newName)) {
      console.log("duplicate person", newName)
      if (window.confirm(`Override phone number of ${newName}?`)) {
        /* ID of person already in DB */
        const id = persons.find((person) => person.name === newName).id;
        personService
          .replacePerson(id, newPerson)
          .then((modifiedPerson) => {
            setNotificationType("success");
            setNotificationText(
              `Changed ${modifiedPerson.name}'s number to ${modifiedPerson.number}`
              );
              /* Update frontend data */
            setPersons(
              persons.map((person) =>
                person.id === id ? modifiedPerson : person
              )
            );

            setTimeout(resetNotification, 5000);
          })
          .catch((error) => {
            console.log(error.response.data);
            const errorMessage = error.response.data.error;
            setNotificationType("error");
            setNotificationText(errorMessage);
          });
      }
      return;
    }
    personService
      .addPerson(newPerson)
      .then((savedPerson) => {
        setNotificationType("success");
        setNotificationText(`Added ${newPerson.name} to phonebook`);
        setPersons([...persons, savedPerson]);

        /* Reset form fields */
        setNewName("");
        setNewNumber("");

        /* Focus first input */
        const firstInput = document.querySelector("form.phonebook-form input");
        firstInput.focus();

        setTimeout(resetNotification, 5000);
      })
      .catch((error) => {
        console.log(error.response.data);
        const errorMessage = error.response.data.error;
        setNotificationType("error");
        setNotificationText(errorMessage);

        setTimeout(resetNotification, 5000);
        return;
      });
  };

  const deletePerson = ({ name, id }) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((data) => {
          console.log(data);
          setNotificationType("success");
          setNotificationText(`Deleted ${name} from phonebook`);
          setPersons(persons.filter((person) => person.id !== id));
          setTimeout(resetNotification, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          const errorMessage = error.response.data.error;
          setNotificationType("error");
          setNotificationText(errorMessage);

          setTimeout(resetNotification, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notificationText} type={notificationType} />
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
