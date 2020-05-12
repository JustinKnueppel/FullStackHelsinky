import React from 'react'
import CountryInformation from './CountryInformation'
import CountryList from './CountryList'

const SearchResults = ({ countries, setActiveCountry }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, please specify another filter.
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <CountryList countries={countries} setActiveCountry={setActiveCountry} />
    )
  } else if (countries.length === 1) {
    return <CountryInformation country={countries[0]} />
  } else {
    return <p>No countries found</p>
  }
}

export default SearchResults