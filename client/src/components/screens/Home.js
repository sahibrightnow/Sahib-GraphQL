import React from 'react'
import AddCar from '../forms/AddCar'
import AddPerson from '../forms/AddPerson'
import Title from '../layout/Title'
import Contacts from '../lists/Contacts'

const Home = () => {
  return (
    <div style={{backgroundColor:'#E8FFC2'}} className='App'>
        <Title/>
        <h3 style={{textAlign: 'center'}}>Add a person to the list</h3>
        <AddPerson/>
        <AddCar/>
        <Contacts/>
      </div>
  )
}

export default Home