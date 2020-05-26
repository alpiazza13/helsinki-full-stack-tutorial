import React from 'react'
import Notification from './Notification'

const PersonForm = (props) =>
    <form onSubmit={props.handler}>
        <p> name: <input value={props.newName} onChange={props.handleNameChange}/> </p>
        <p> number: <input value={props.newNumber} onChange={props.handleNumberChange}/> </p>
        <button type="submit"> add </button>
        <p></p>
        <Notification message={props.message} />
    </form>

export default PersonForm
