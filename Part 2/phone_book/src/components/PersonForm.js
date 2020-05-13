import React from "react";

const PersonForm = (props) => (
  <form className="phonebook-form">
    <div>
      name: <input value={props.newName} onChange={props.setNameField} />
      <br />
      number: <input value={props.newNumber} onChange={props.setNumberField} />
    </div>
    <div>
      <button type="submit" onClick={props.addPerson}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
