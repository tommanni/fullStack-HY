import Weather from './Weather'

const Country = ({ country, apiKey }) => {

    return (
        <div>
            {/* Näytetään yksittäisen maan tiedot */}
            <h1>{country.name.common}</h1>
            <p className='info'>capital {country.capital[0]}</p>
            <p className='info'>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag-img" />
            <Weather capital={country.capital[0]} apiKey={apiKey} latlng={country.capitalInfo.latlng} />
        </div>
    )
}

export default Country