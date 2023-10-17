import { useEffect, useState } from "react"
import axios from 'axios'


const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    if (currency) {
      console.log('fetching exchange rates...')
      axios
      .get(`https://open.er-api.com/v6/latest/${value}`)
      .then(response => {
        setRates(response.data.rates)
      })
    }
  }, [currency])


  const handleChange = (e) => setValue(e.target.value)

  const searchText = (e) => {
    e.preventDefault()
    setCurrency(value)
  }

  
  return (
    <>
      <div>
        <form onSubmit={searchText}>
          currency:
          <input
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button type="submit">exchange rate</button>
        </form>
        <pre>
          {JSON.stringify(rates, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default App
