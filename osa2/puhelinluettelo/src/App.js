import { useEffect, useState } from 'react'
import './App.css'
import numberService from './services/numbers'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessgae, setSuccessMessage] = useState(null)
  const [successValue, setSuccessValue] = useState('')

  useEffect(() => {
    console.log('effect')
    numberService
      .getAll()
      .then(initialNumbers => {
        console.log('promise fulfilled')
        setPersons(initialNumbers)
      })
      .catch(error => {
        console.log('Failed')
      })
  }, [])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let person = persons.filter(person => person.name === newName)

    if (person.length > 0) {
      if (window.confirm(`${newName} has already been added to phonebook, replace the new number with a new one?`)) {
        numberService
          .update(person[0].id, personObject)
          .then(updatedPerson => {
            setPersons(persons.filter(oldPerson => oldPerson.id !== person[0].id).concat(updatedPerson))
          })
          .catch(error => {
            setSuccessValue('fail')
            setSuccessMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
      setSuccessValue('success')
      setSuccessMessage(`Updated ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
      return
    }

    numberService
      .create(personObject)
      .then(returnedNumber => {
        setPersons(persons.concat(returnedNumber))
        setSuccessValue('success')
        setSuccessMessage(`Added ${returnedNumber.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('Failed')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      numberService
        .deletePerson(id)
        .then(returnedNumber => {
          setSuccessValue('success')
          setSuccessMessage(`Deleted ${persons.find(person => person.id === id).name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Failed')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification value={successValue} message={successMessgae} />

      <Filter
        value={filterName}
        onChange={handleFilterNameChange}
      />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={addPerson}
        onChange={[handleNameChange, handleNumberChange]}
        value={[newName, newNumber]}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} onClick={deletePerson} />
    </div>
  )

}

export default App