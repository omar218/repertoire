import React from 'react'
import ReactDOM from 'react-dom'
import {useState, useEffect} from 'react'
import rptService from './Services/rptService'


const App = (props) => {

   const [ newName, setNewName ] = useState("")
   const [ newNumber, setNewNumber ] = useState("")
   const [persons, setPersons] = useState([{name:"", number:""}])


  const listPerson = () => {
    return persons.map(person => {
      return (
        <div key = {person.id}>
        <p>{person.name}</p> 
        <p>{person.number}</p> 
        </div>
      )
    })
  }

  useEffect(() => {
    rptService
     .getAll()
     .then(()=>{
      setNewName(newName)
      setNewNumber(newNumber)
    })
  }, [])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChange2 = (event) => {
    setNewNumber(event.target.value)
  }


  const handleSubmit = (e) => {
    //service to create number 
    rptService.create(newNumber).then(()=>{
      setNewNumber('')
    }) 
   e.preventDefault();
   const Object = { 
     id : persons.length+1,
     name : newName,
     number: newNumber,
    }
   setPersons(persons.concat(Object));
   setNewNumber('');
   //service to update number
   rptService
   .update(persons)
   .then(persons => {
     setPersons(persons.concat(Object))
   })
}

  const confirmDelete = () => {
  window.confirm('voullez-vous supprimer le numero')
  filterNumber()
 }


  const filterNumber = id => {
  const number = newNumber.find(n => n.id === id);

    const changedNumber = { ...newNumber, important: !newNumber.important }
      rptService
      .update(id, changedNumber)
      .then(response => {
        setNewNumber(newNumber.map(newNumber => newNumber.id !== id ? newNumber : response.data))
      })

    }

  return(
    <div>
       <h2>Phonebook</h2>

       <p>
         Filter shown with : 
         <input name="filter" id="filter" />
       </p>
       <form>
         <h1>Add a new</h1>
        <div>
          name <input id ="name" name="name" value={newName} type="text" onChange={handleChange} />
        </div>
        <br />
        <div>
          number <input id ="number" name="number" value={newNumber} type="text" onChange={handleChange2} />
        </div>
        <div>
          <button type="submit" onClick = {handleSubmit}>add</button>
        </div>
      </form>
      <h1>Numbers</h1>    
          <div>{listPerson}</div>   
          <div>
          <button onClick = {confirmDelete()}>delete</button>
          </div>       
    </div>

  )
}


export default App
