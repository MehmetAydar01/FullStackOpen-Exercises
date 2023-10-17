import { useState } from "react"


const App = () => {

  const [value, setValue] = useState('')
  const [country, setCountry] = useState({})

  const handleChange = (e) => {
    console.log(e.target.value)
    setValue(e.target.value)
  }

  return (
    <>
      <form>
        find countries
        <input
          type="text"
          value={value}
          onChange={handleChange}
        />
      </form>
    </>
  )
}

export default App
