import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  /* Haetaan maiden tiedot */
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  })
  const API_KEY = process.env.REACT_APP_API_KEY
  /* Filteröidään maat, joissa esiintyy filterName */
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
  /* Tapahtumankäsittelijä input kentän muutokselle */
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  /* Tapahtumankäsittelijä show painikkeille */
  const clickHandler = (value) => {
    setFilterName(value)
  }

  return (
    <div className='container'>
      { /* Komponentti input kentän luomiseen */}
      <Filter
        value={filterName}
        onChange={handleFilterNameChange}
      />
      {/* Komponentti filtteröityjen maiden renderöintiin */}
      <Countries countries={filteredCountries} onClick={clickHandler} apiKey={API_KEY} />
    </div>
  );
}

export default App
