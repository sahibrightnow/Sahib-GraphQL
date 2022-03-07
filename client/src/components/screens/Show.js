import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { GET_PERSON_CARS } from '../../queries'




const Show = () => {
 const { id } = useParams("id");
 const personId = String(id);

 const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { personId }})
 if (loading) return 'Loading...'
 if (error) return `Error1 ${error.message}`
 const {person, car} = data.personAndHisCars
  return (
    <div className="Details" style={{textAlign:'center', backgroundColor:'#E8FFC2', height:'100vh'}}>

    {person && car ?
        <>
            <h1>Person's Details</h1>

            <h2>Name : <strong style={{color:'#2FA4FF'}}>{person.firstName} {person.lastName}</strong></h2>

            <h3>Cars Owned:</h3>
            <div className="carsSection">
                {
                    car.map((item) => (
                        <div className="carContainer" key={item.id}
                        style={{border: '1px solid black', margin: '1px auto', width: '50%'}}>
                            <div className="display">
                                
                                <div><b>Make: </b>   {item.make} </div>
                                <div><b>Model:</b>   {item.model}</div>
                                <div><b>Year: </b>   {item.year}</div>
                                <div><b>Price:</b>   {item.price} </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </> : "Loading..."}





    <div className="Home" style={{marginTop: '10px'}}>
        <Link to='/'>Back to Homepage</Link>
    </div>
</div>
  )
}

export default Show