import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({country}) =>
    <div>
        <h1> {country.name} </h1>
        <p> capital: {country.capital} </p>
        <p> population: {country.population} </p>
        <h1> languages </h1>
        <ul> {country.languages.map((language) => <li key={language.name}> {language.name} </li>)} </ul>
        <img src={country.flag}/>
    </div>

const DisplayResults = ({names}) => <ul> {names.map((name) => <li key={name}> {name} </li>)} </ul>
const NoResults = () => <p> Too many matches to display or no matches to display </p>

const Choose = ({n, arr, country}) => {
    if (n===1) {return (<NoResults/>)}
    else if (n===2) {return <CountryInfo country={country} />}
    else if (n===3) {return (<DisplayResults names={arr}/>)}
}


function App() {
    // probably should have named this `search term` or something else
   const [ country, setNewCountry ] = useState('')
   const [countries, setCountries] = useState([])
   const handleCountryChange = (event) => setNewCountry(event.target.value)

   useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
}, [])

    const onlyNames = countries.map((country) => country.name)
    const onlySearchedNames = onlyNames.filter((name) => name.toLowerCase().includes(country.toLowerCase()))
    const numResults = onlySearchedNames.length

    let n=1
    let notList = []
    if (numResults > 10 || numResults === 0) { n = 1 }
    else if (numResults === 1) {n = 2
    const theName = onlySearchedNames[0]
    const onlyTheCountry = countries.filter((country) => country.name == theName)
    notList = onlyTheCountry[0]
}
    else {n = 3 }



  return (
    <div >
    <p> aaaa <input value={country} onChange={handleCountryChange}/> </p>
    <Choose n={n} arr={onlySearchedNames} country={notList}/>
    </div>
  )
}

export default App;
