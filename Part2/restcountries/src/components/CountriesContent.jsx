
const CountriesContent = ({ filteredCountries, handleShowFlag, selectedCountry }) => {
    return (
        <div>
            {
                (filteredCountries.length > 1 && filteredCountries.length <= 10) ?
                    (   filteredCountries.map(item => {
                            return (
                                <div key={item.name.common}>
                                    <p>{item.name.common} <button onClick={() => handleShowFlag(item)}>show</button></p>
                                </div>
                            )
                        })
                    ) :
                    filteredCountries.length == 1 ?
                        filteredCountries.map(country => {
                            return (
                                <div key={country.name.common}>
                                    <h1>{country.name.common}</h1>
                                    <p>capital {country.capital}</p>
                                    <p>area {country.area}</p>
                                    <h2>languages:</h2>
                                    <ul>
                                        {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
                                    </ul>
                                    <img src={country.flags.png} alt={country.flags.alt} />
                                </div>
                            )
                        })
                        : ''
            }
        </div>
    )
}

export default CountriesContent