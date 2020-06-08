import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const onlyNames = persons.map(person => person.name)
  const [message, setMessage] = useState(null)

  // on first rendering of the app, setPersons with the data from that url
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const showMessage = (msg) => {
      setMessage(msg)
      setTimeout(() => {setMessage(null)}, 5000)}

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    if (!(onlyNames.includes(newName))) {
        personService
        .create(personObject)
        .then(returnedPerson => {
         setPersons(persons.concat(returnedPerson))
         showMessage('You successfully updated the phonebook! Good job!')
      })
      .catch(error => {showMessage(error.response.data.error)})
  }

      else {
          if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace their old number with this new number?`)){
              const thisPerson = persons.filter((person) => person.name === newName)[0]
              const newPerson = {id: thisPerson.id, name: thisPerson.name, number: newNumber}
              const without_old = persons.filter((person) => person.id !== thisPerson.id)
              personService.update(thisPerson.id, newPerson)
              .then(returnedPerson => {setPersons(without_old.concat(returnedPerson))})
              .catch(error => {showMessage('There has been an error. Please refresh and try again.')})
              showMessage('You successfully updated the phonebook! Good job!')
          }
      }


    //   personService
    //   .create(personObject)
    //   .then(returnedPerson => {
    //    setPersons(persons.concat(returnedPerson))
    //    showMessage('You succefully updated the phonebook - great job!')
    // })
    // .catch(error => {
    //     console.log(error.response.data.error)
    //     if (error.response.data.error.includes('unique')) {
    //         if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace their old number with this new number?`)){
    //               const thisPerson = persons.filter((person) => person.name === newName)[0]
    //               const newPerson = {id: thisPerson.id, name: thisPerson.name, number: newNumber}
    //               const without_old = persons.filter((person) => person.id !== thisPerson.id)
    //               personService.update(thisPerson.id, newPerson)
    //               .then(returnedPerson => {setPersons(without_old.concat(returnedPerson))})
    //               .catch(error => {showMessage('There has been an error. Please refresh and try again.')})
    //               showMessage('You successfully updated the phonebook! Good job!')
    //           }
    //     }
    //     else {
    //     showMessage(error.response.data.error)
    // }
    // })

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  const onlySearched = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const onDelete = (id, name) => {
      if (window.confirm(`Are you sure you want to delete ${name} from the phoebook?`))
      {personService.remove(id)
        setPersons(persons.filter((person) => person.id !== id))  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={newSearch} handler={handleSearchChange}/>
      <PersonForm handler={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} message={message} />
      <h2>Numbers</h2>
      <Persons toDisplay={onlySearched} deleter={onDelete}/>
    </div>
  )
}

export default App
