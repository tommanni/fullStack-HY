import Country from './Country'

const Countries = ({ countries, onClick, apiKey }) => {
    return (
        <div>
            {/* Näytetään tiedot filtteröityjen maiden määrän perusteella */}
            {countries.length > 10 ? 'Too many matches, specify another filter'
                : countries.length > 1 ? countries.map(country => <p key={country.name.common}>{country.name.common}<button type='button' onClick={() => onClick(country.name.common)}>show</button></p>)
                    : countries.length === 1 ? <Country country={countries[0]} apiKey={apiKey} /> : ''}
        </div>
    )
}

export default Countries