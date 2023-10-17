import { useState } from "react"



const App = () => {
  const [value, setValue] = useState('')  


  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e);
    setValue(e.target.value)
  }

  const searchText = (e) => {
    e.preventDefault()
    console.log('submit oldu')
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
      </div>
    </>
  )
}

export default App
