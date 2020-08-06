import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

  useEffect(() => {
    if (name.length > 0) {
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          setCountry(response.data[0]);
        })
        .catch((error) => setCountry(null));
    }
  }, [name.length, url]);

  return country;
};
