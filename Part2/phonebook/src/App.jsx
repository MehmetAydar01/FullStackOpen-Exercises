import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./FilterDatas/Filter"
import PersonForm from "./FormInputs/PersonForm"

const Persons = ({ filterPhonebook }) => {
  return (
    <ul>
      {filterPhonebook.map((filterPerson) => <li key={filterPerson.id}>{filterPerson.name} {filterPerson.number}</li>)}
    </ul>
  )
}


const App = () => {
  const [newName, setNewName] = useState("")
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")

  const handleInputNameChange = (e) => setNewName(e.target.value)
  const handleInputNumberChange = (e) => setNewNumber(e.target.value)
  const handleInputFilterChange = (e) => setFilterValue(e.target.value)

  useEffect(() => {
    console.log('effects')
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log('promise fulfilled');
        setPersons(res.data)
      })
  }, [])
  console.log('persons length : ', persons.length)

  // Rehber listesini aramaya göre filtrele
  const filteredPhonebook = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

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
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h1>Exercises Phonebook</h1>

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
