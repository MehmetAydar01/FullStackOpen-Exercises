import { useState, useEffect } from "react"
import Filter from "./FilterDatas/Filter"
import PersonForm from "./FormInputs/PersonForm"
import PhonebookService from './services/phonebooklists'
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

const Notifications = ({ message, messageNotifClass }) => {
  if (message === null) {
    return null
  }

  return (
    <>
      <div className= { messageNotifClass ? "success" : "error" }>
        {message}
      </div>
    </>
  )
}


const App = () => {
  const [newName, setNewName] = useState("")
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [message, setMessage] = useState('Someone Added, for example: QXyGeN & Roshan...')
  const [messageNotifClass, setMessageNotifClass] = useState(true)

  const handleInputNameChange = (e) => setNewName(e.target.value)
  const handleInputNumberChange = (e) => setNewNumber(e.target.value)
  const handleInputFilterChange = (e) => setFilterValue(e.target.value)

  // Sunucuda bulunan datalari cekelim ve persons state'ine setleyelim. 
  useEffect(() => {
    console.log('effects')
      PhonebookService
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
      PhonebookService
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
      PhonebookService
        .create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          setMessage(`Added ${res.name}`)
          setTimeout(() => {
            setMessage(null)
            console.log('ekleme islemi basarili olduktan 3 saniye sonra timeout calisti ve message degerini null yaptı ve mesaj gitti');
          }, 3000)
        })
        .catch(err => {
          console.log('data eklenmedi', err)
        })
    } else {
      const findPerson = persons.find(person => person.name === newName)
  
      if( window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one ?`) ) {
        // İsim zaten listede varsa, numarayı güncelle
        const existingPersonIndex = persons.findIndex(person => person.name === newName)

        if (existingPersonIndex !== -1) {
          const updatedPersons = [...persons]
          updatedPersons[existingPersonIndex].number = newNumber
          personObject.number = updatedPersons[existingPersonIndex].number

          // Sunucumuzda bulunan numara alanini da guncelleyelim
          PhonebookService
            .update(updatedPersons[existingPersonIndex].id, personObject)
            .then(res => {
              console.log('data guncellendi, guncellenmis hali : ', res)

              setMessage(`${res.name}'s number has been changed`)
              setTimeout(() => {
                setMessage(null)
                console.log('numara degistirme islemi basarili olduktan 3 saniye sonra timeout calisti ve message degerini null yaptı ve mesaj gitti');
              }, 3000)
            })
            .catch(err => {
              setMessageNotifClass(false)
              
              setMessage(`information of ${personObject.name} has already been removed from server`)
              setTimeout(() => {
                setMessage(null)
                console.log('sunucuda var olmayan bir datayi guncellemeye calistiniz');
              }, 3000)
            })

          // Listelenen datalarımızı da güncel haliyle listeleyelim
          setPersons(updatedPersons)
        } else {
          console.log('data index bulunamadi')
        }
      } else {
        console.log('number alanini guncellemediniz..')
      }
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Exercises Phonebook</h1>

      <h2>Phonebook</h2>

      <Notifications message={message} messageNotifClass={messageNotifClass} />

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
