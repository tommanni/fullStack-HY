import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital, apiKey, latlng }) => {
    const [countryData, setCountryData] = useState("")

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`)
            .then(response => {
                setCountryData(response.data)
            })
    }, [capital])

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature {countryData !== "" ? Number((countryData.main.temp - 273.15).toFixed(2)) : ""} celsius</p>
            <img src={countryData !== "" ? `http://openweathermap.org/img/wn/${countryData.weather[0].icon}@2x.png` : ""} alt="Flag" />
            <p>wind {countryData !== "" ? countryData.wind.speed : ""} m/s</p>
        </div>
    )
}

export default Weather