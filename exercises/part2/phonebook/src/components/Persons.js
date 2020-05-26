import React from 'react'
import Person from './Person'

const Persons = ({toDisplay, deleter}) =>
    <ul>
      {toDisplay.map((person) => <Person key={person.name} person={person} deleter={deleter}/>)}
    </ul>

export default Persons
