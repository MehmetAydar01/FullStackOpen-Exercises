import { useState } from "react"


const Filter = (props) => {
  const { text, filterValue, handleInputFilterChange } = props
  return (
    <div>
      {text}
      <input
        type="text"
        value={filterValue}
        onChange={handleInputFilterChange}
        placeholder="search in phonebook"
      />
    </div>
  )
}

const PersonForm = (props) => {
  const { handleFormSubmit, newName, handleInputNameChange, newNumber, handleInputNumberChange } = props
  return (
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
  )
}

const Persons = ({ filterPhonebook }) => {
  return (
    <ul>
      {filterPhonebook.map((filterPerson) => <li key={filterPerson.id}>{filterPerson.name} {filterPerson.number}</li>)}
    </ul>
  )
}


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

      <Filter
        text='filter shown with'
        value={filterValue}
        handleInputFilterChange={handleInputFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        handleInputNameChange={handleInputNameChange}
        newNumber={newNumber}
        handleInputNumberChange={handleInputNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filterPhonebook={filteredPhonebook} />
    </div>
  )
}

export default App
