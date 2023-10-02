import { useState } from "react"


const App = () => {
  const inThePhonebook = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [newName, setNewName] = useState("")
  const [persons, setPersons] = useState(inThePhonebook)
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")

  const handleInputNameChange = (e) => setNewName(e.target.value)
  const handleInputNumberChange = (e) => setNewNumber(e.target.value)
  const handleInputFilterChange = (e) => setFilterValue(e.target.value)

  // Rehber listesini aramaya göre filtrele
  const filteredPhonebook = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  /* Not: Bu javascript methodları filter, some, map değer döndürdükleri için return ile beraber kullanmamız gerekir. Lakin bu method/methodların içindeki callback function işlemi tek satır olursa return yazmamıza gerek kalmıyor. Bu not da burada dursun */

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
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
      <h1>Exercises 2.6-2.10</h1>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          type="text"
          value={filterValue}
          onChange={handleInputFilterChange}
          placeholder="search in phonebook"
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div> name:
          <input
            type="text"
            value={newName}
            onChange={handleInputNameChange}
            placeholder="Name Surname"
          />
        </div>
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
        {filteredPhonebook.map((filterdPerson) => <li key={filterdPerson.id}>{filterdPerson.name} {filterdPerson.number}</li>)}
      </ul>
    </div>
  )
}

export default App
