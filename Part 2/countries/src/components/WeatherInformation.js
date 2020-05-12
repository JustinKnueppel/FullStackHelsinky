import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeaatherInformation = ({ country }) => {
  const [weatherInformation, setWeatherInformation] = useState({});
  const { name } = country;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${name}`).then(response => {
      setWeatherInformation(response.data)
    })
  }, [apiKey, name])

  /* Weatherstack randomly denies requests saying they are https */
  if (weatherInformation.current) {
    const { temperature, weather_descriptions, weather_icons } = weatherInformation.current;
    const { wind_speed } = weather_descriptions;
    const weatherIcon = weather_icons[0];
    return (
      <div>
        <p>Temperature: {temperature} degrees Celcius</p>
        <img src={weatherIcon} alt="Weather icon" />
        <p>Wind: {wind_speed} miles per hour</p>
      </div>
    )
  }

  return (
    <div>
      No weather information found
    </div>
  )
}

export default WeaatherInformation;