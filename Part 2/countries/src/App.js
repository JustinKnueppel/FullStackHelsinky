import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";

function App() {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const updateText = (event) => {
    setSearchText(event.target.value);
  };

  const setActiveCountry = ({ name }) => () => {
    setSearchText(name);
  };

  return (
    <div>
      <SearchBox
        labelText="Find countries"
        text={searchText}
        handleChange={updateText}
      />
      <SearchResults countries={countriesToShow} setActiveCountry={setActiveCountry} />
    </div>
  );
}

export default App;
