import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from '../../queries'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { filter } from 'lodash'


const RemoveCar = ({id}) => {
    const [, forcedUpdate] = useState()

    useEffect(() => {
      forcedUpdate({})
    }, [])
    const [removeCar] = useMutation(REMOVE_CAR, {
        update: (proxy, { data: { removeCar } }) => {
            const { cars } = proxy.readQuery({ query: GET_CARS })
            if(cars){
                proxy.writeQuery({
                    query: GET_CARS,
                    data: {
                        cars: filter(cars, car => { return car.id !== removeCar.id })
                    }
                })
            }                
        }
    


    })
    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this car?')
        if (result) {
          removeCar({
            variables: {
              id
            },
            optimisticResponse: {
              __typename: 'Mutation',
              removeCar: {
                __typename: 'Car',
                id
               
               
              }
            }
          })
        }
      }
  return (
    <Button key='delete' onClick={handleButtonClick}>Delete</Button>
  )
}

export default RemoveCar