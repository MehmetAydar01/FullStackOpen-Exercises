import { useEffect, useState } from "react"
import CountriesContent from './components/CountriesContent'
import CountriesSearch from "./components/CountriesSearch"
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);


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

  const handleShowFlag = (countryFlags) => {
    setSelectedCountry(countryFlags);
  }



  return (
    <>
      <div>
        find countries &#9;
        <CountriesSearch value={value} handleChange={handleChange} />
        <p>{errorMessage}</p>
        <CountriesContent filteredCountries={filteredCountries} handleShowFlag={handleShowFlag} selectedCountry={selectedCountry} />
      </div>
      {(selectedCountry && filteredCountries.length > 1) ? <img src={selectedCountry.flags.png} /> : ''}
    </>
  )
}

export default App
