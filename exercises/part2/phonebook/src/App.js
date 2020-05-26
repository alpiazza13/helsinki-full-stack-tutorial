import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const onlyNames = persons.map(person => person.name)
  const [message, setMessage] = useState(null)

  // on first rendering of the app, setPersons with the data from that url
  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const showMessage = () => {
      setMessage(`You successfully updated the phonebook - good job!`)
      setTimeout(() => {setMessage(null)}, 5000)}

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    if (!(onlyNames.includes(newName))) {
        noteService
        .create(personObject)
        .then(returnedPerson => {
         setPersons(persons.concat(returnedPerson))
         showMessage()
      })}
      // else {
      //     if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace their old number with this new number?`)){
      //         const thisPerson = persons.filter((person) => person.name === newName)[0]
      //         const newPerson = {id: thisPerson.id, name: thisPerson.name, number: newNumber}
      //         noteService.update(thisPerson.id, newPerson)
      //         const without_old = persons.filter((person) => person.id !== thisPerson.id)
      //         setPersons(without_old.concat(newPerson))
      //         showMessage()
      //     }}

      else {
          if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace their old number with this new number?`)){
              const thisPerson = persons.filter((person) => person.name === newName)[0]
              const newPerson = {id: thisPerson.id, name: thisPerson.name, number: newNumber}
              const without_old = persons.filter((person) => person.id !== thisPerson.id)
              noteService.update(thisPerson.id, newPerson)
              .then(returnedPerson => {setPersons(without_old.concat(returnedPerson))})
              .catch(error => {setMessage('There has been an error. Please refresh and try again.')})
              showMessage()
          }
      }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  const onlySearched = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const onDelete = (id, name) => {
      if (window.confirm(`Are you sure you want to delete ${name} from the phoebook?`))
      {noteService.remove(id)
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
