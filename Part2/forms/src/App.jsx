import { useState } from "react"


function App() {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    console.log(e);
    console.log(e.target)
  }


  return (
    <>
      <h1>Part-2.6</h1>
      <form>
        <input
          type="text"
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default App
