import React from 'react'
import AddPerson from '../forms/AddPerson'
import Title from '../layout/Title'
import Contacts from '../lists/Contacts'

const Home = () => {
  return (
    <div style={{backgroundColor:'#E8FFC2'}} className='App'>
        <Title/>
        <AddPerson/>
        <Contacts/>
      </div>
  )
}

export default Home