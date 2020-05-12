import React from "react";
import Button from "./Button"

const CountryList = ({ countries, setActiveCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.numericCode}>{country.name} <Button text="show" handleClick={setActiveCountry(country)} /></li>
      ))}
    </ul>
  );
}

export default CountryList;
