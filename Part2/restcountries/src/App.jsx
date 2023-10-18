import { useEffect, useState } from "react"
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
      .catch(err => {
        console.log('data gelmedi.. ', err)
      })
  }, [])


  const handleChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)

    if (inputValue.trim() === "") {
      setErrorMessage("");
      setFilteredCountries([])
    } 
    else {
      const filtered = countries.filter(country => country.name.common.toLowerCase().includes(inputValue.toLowerCase()))

      if (filtered.length > 10) {
        setErrorMessage('Too many matches, specify another filter')
        setFilteredCountries([])
      }
      else if (filtered.length > 1 && filtered.length <= 10) {
        console.log(filtered)
        setErrorMessage('')
        setFilteredCountries(filtered)
      }
      else if (filtered.length == 1) {
        setErrorMessage('')
        setFilteredCountries(filtered)
        console.log('tek data var', filtered)
      } 
      else {
        setErrorMessage('')
        setFilteredCountries([])
        console.log('hic data yok...', filtered)
      }
    }
  }



  return (
    <>
      <div>
        find countries &#9;
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search for a country..."
        />
        <p>{errorMessage}</p>
        <div>
          {
            (filteredCountries.length > 1 && filteredCountries.length <= 10) ?
              filteredCountries.map(item => <p key={item.name.common}>{item.name.common}</p>) :
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
      </div>
    </>
  )
}

export default App
