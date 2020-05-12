import React from 'react';

const SearchBox = ({ labelText, text, handleChange }) => (
  <>
    <label>
      {labelText}
      <input type="text" onChange={handleChange} value={text} />
    </label>
  </>
)

export default SearchBox;