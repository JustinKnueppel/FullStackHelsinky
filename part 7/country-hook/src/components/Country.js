import React from "react";

const Country = ({ country }) => {
  if (!country) {
    return "No country information...";
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flag}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

export default Country;
