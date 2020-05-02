import React from "react";

const Filter = (props) => (
  <>
    Filter shown with{" "}
    <input value={props.nameFilter} onChange={props.setNameFilterField} />
  </>
);

export default Filter;
