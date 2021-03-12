import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Select from "react-select";

const EDIT_BIRTH_YEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const Authors = ({ show, authors }) => {
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_BIRTH_YEAR);
  const options = authors.map((a) => {
    return {
      value: a.name,
      label: a.name,
    };
  });
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  if (!show) {
    return null;
  }

  const submitBorn = () => {
    editAuthor({
      variables: { name: selectedAuthor.value, born: parseInt(born) },
    });

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
        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
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
