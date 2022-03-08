import { useState, useEffect } from 'react'
import {GET_CARS, ADD_CAR, GET_PEOPLE} from '../../queries'
import { v4 as uuidv4 } from 'uuid'
import { Form, Select, Input, Button } from 'antd'
import { useMutation, useQuery } from '@apollo/client'


const AddCar = () => {
  const [carId] = useState(uuidv4())
  const { Option } = Select;
  const [form] = Form.useForm()
  const [addCar] = useMutation(ADD_CAR)
  const [personId, setPersonId] = useState(uuidv4)
  const { error, loading, data } = useQuery(GET_PEOPLE)
  const [, forcedUpdate] = useState()

  useEffect(() => {
    forcedUpdate({})
  }, [])

  const handleSelectChange = (personId) => {
    setPersonId(personId)
}

const onFinish = values => {
    const { Year, make, model, Price } = values
    const year = parseInt(Year)
    const price = parseInt(Price)

    let id = carId;
    addCar({
        variables: {
            id,
            year,
            make,
            model,
            price,
            personId
        },
        optimisticResponse: {
            __typename: 'Mutation',
            addCar: {
                __typename: 'Car',
                id,
                year,
                make,
                model,
                price,
                personId
            }
        },
        update: (proxy, { data: { addCar } }) => {
            const data = proxy.readQuery({ query: GET_CARS })
            if (data) {
                proxy.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.allCars, addCar]
                    }
                })
            }

        }
    })
}

  if (loading) return 'Loading...'
  if (error) return `Error1 ${error.message}`
  return (
    <Form
     form={form}
     name="add-car-form"
     onFinish={onFinish}
     size='large'>
     <h3 style={{textAlign: 'center'}}>Add a car to the list</h3>

     <Form.Item 
     name="personId"
     rules={[{required:true, message: 'Select a person from the list'}]}>
     <Select onChange={handleSelectChange}
     placeholder="Select a person">
      {data.people.map(({ id, firstName, lastName }) => ( <Option key={id} value={`${id}`}>{firstName} {lastName}</Option>))}
     </Select>

     </Form.Item>
     <Form.Item
                            name='Year'
                            rules={[{ required: true, message: 'Year is a required field!' }]} >
                            <Input type='number' min='1900' max='2021' placeholder='Year i.e. 2008' />
                        </Form.Item>
                        <Form.Item
                            name='make'
                            rules={[{ required: true, message: 'Make is a required field!' }]} >
                            <Input placeholder='Make i.e Mercedes' />
                        </Form.Item>
                        <Form.Item
                            name='model'
                            rules={[{ required: true, message: 'Model is a required field!' }]} >
                            <Input placeholder='Model i.e. S500' />
                        </Form.Item>
                        <Form.Item
                            name='Price'
                            rules={[{ required: true, message: 'Price is a required field!!' }]} >
                            <Input type='number' min='0' placeholder='Price i.e. 50,000' />
                        </Form.Item>

                        <Form.Item shouldUpdate={true}>
                            {() => (
                                <Button
                                
                                    type='primary'
                                    htmlType='submit'
                                    disabled={
                                        !form.isFieldsTouched(true) ||
                                        form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                > Add Car</Button>
                            )}
                        </Form.Item>

     

    </Form>
  )
}

export default AddCar;