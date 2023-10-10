import { useState, useEffect } from "react"
import Filter from "./FilterDatas/Filter"
import PersonForm from "./FormInputs/PersonForm"
import phonebookService from './services/phonebooklists'
import axios from "axios"


const Persons = ({ filterPhonebook, handleClickDeleteData }) => {
  return (
    <>
      <li>
        {filterPhonebook.name} {filterPhonebook.number}
        <button onClick={handleClickDeleteData}>Delete</button>
      </li>
    </>
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

  // Sunucuda bulunan datalari cekelim ve persons state'ine setleyelim. 
  useEffect(() => {
    console.log('effects')
      phonebookService
        .getAll()
        .then(res => {
          console.log('promise fulfilled')
          setPersons(res)
        })
        .catch(err => {
          console.log('data yok ya da gelmedi', err)
        })
  }, [])

  console.log('persons length : ', persons.length)

  // Rehber listesini aramaya göre filtrele
  const filteredPhonebook = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  // Delete islemi ile data/lari silmek icin
  const handleClickDeleteData = id => {
    const dataOfDelete = persons.find(person => person.id === id)

    window.confirm(`Delete ${dataOfDelete.name} ?`) ?
      phonebookService
        .deleteData(id)
        .then(response => {
          // Sildiğimiz (Sunucuda silinen) datayi listelenen kısımdan da kaldıralım.
          setPersons(prevPhonebookLists => prevPhonebookLists.filter(list => list.id !== id))
          console.log(response, 'silme islemi basarili');
        })
        .catch(err => {
          console.error('Silme işlemi başarısız oldu: ', err);
        })
      : console.log('silme islemini onaylamadiniz')
  }

  // Form submit oldugunda
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // İsmin zaten listede olup olmadığını kontrol et
    const hasNames = persons.some(person => person.name === newName)

    // eğer isim listede var ise true, yok ise false döner.
    if (!hasNames) {
      phonebookService
        .create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.log('data eklenmedi', err)
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

      <ul>
        {filteredPhonebook.map(filterPerson =>
          <Persons
            key={filterPerson.id}
            filterPhonebook={filterPerson}
            handleClickDeleteData={() => handleClickDeleteData(filterPerson.id)}
          />
        )}
      </ul>

      
    </div>
  )
}

export default App
