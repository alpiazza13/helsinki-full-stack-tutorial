import React from 'react'

const Person = ({ person, deleter }) => <li> {person.name} {person.number} <button onClick={() => deleter(person.id, person.name)}> delete </button> </li>

export default Person
