import { useEffect, useState } from 'react'



import { Button, Card } from 'antd'

import UpdateCar from '../forms/UpdateCar'
import RemoveCar from '../buttons/RemoveCar';

const Car = ({id, year, make, model, price, personId}) => {
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
      }
      const [, forcedUpdate] = useState()

      useEffect(() => {
        forcedUpdate({})
      }, [])

    

  return (
    <div>
        {editMode ? (
            <UpdateCar id={id} year={year} personId={personId} make={make} price={price} model={model} onButtonClick={handleButtonClick}/>
        ) : (
            <Card actions={[
                <Button key='edit' onClick={handleButtonClick}>Edit</Button>,
                <RemoveCar id={id}/>
                
            ]}
             style={{width:'400px', margin:'10px auto'}}>
                <p>Make   - {make}</p>
                <p>Model - {model}</p>
                <p>Year   - {year}</p>
                <p>Price - {price}</p>
                <div>
                
                </div>
            </Card>
        )}
    </div>
  )
}

export default Car