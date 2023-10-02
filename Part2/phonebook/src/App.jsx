import { useState } from "react"


const App = () => {
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0535 485 4565' }
  ])
  const [newNumber, setNewNumber] = useState('')

  const handleInputNameChange = (e) => setNewName(e.target.value)
  const handleInputNumberChange = (e) => setNewNumber(e.target.value)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // İsmin zaten listede olup olmadığını kontrol et
    const hasNames = persons.some(person => person.name === newName)

    if (!hasNames) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
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
            onChange={handleInputNameChange}
            placeholder="Name Surname"
          />
        </div>
        <br />
        <div> number:
          <input
            type="text"
            value={newNumber}
            onChange={handleInputNumberChange}
            placeholder="Your Number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App
