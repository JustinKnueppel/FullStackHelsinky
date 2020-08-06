import React, { useState } from "react";
import PropTypes from "prop-types";

const Toggleable = ({ label, children }) => {
  const [show, setShow] = useState(false);

  const hideWhenVisible = { display: show ? "none" : "" };
  const showWhenVisible = { display: show ? "" : "none" };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setShow(true)}>{label}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    </>
  );
};

Toggleable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Toggleable;
