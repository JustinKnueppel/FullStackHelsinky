import React from 'react'
import WeaatherInformation from './WeatherInformation'

export default function CountryInformation({ country }) {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_2}>
            {language.name}
          </li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={{width: '30em', height: 'auto'}} />
      <WeaatherInformation country={country} />
    </div>
  )
}
