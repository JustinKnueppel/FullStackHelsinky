import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const EDIT_BIRTH_YEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const Authors = ({ show, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_BIRTH_YEAR);

  if (!show) {
    return null;
  }

  const submitBorn = () => {
    editAuthor({ variables: { name, born: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        Born:{" "}
        <input
          type="text"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type="submit" onClick={submitBorn}>
        Submit
      </button>
    </div>
  );
};

export default Authors;
