import { useState } from "react"


const App = () => {
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const handleInputChange = (e) => {
    // console.log(e.target.value)
    setNewName(e.target.value)
    // console.log(persons)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h1>Part-2.6</h1>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div> name:
          <input
            type="text"
            value={newName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Names</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App
