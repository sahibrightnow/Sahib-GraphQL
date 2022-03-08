import { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import {UPDATE_CAR, GET_PEOPLE} from '../../queries'
const {Option} = Select;

const UpdateCar = (props) => {
  const [form] = Form.useForm()
    const [updateCar] = useMutation(UPDATE_CAR)
    const { loading, error, data } = useQuery(GET_PEOPLE)
    const [updatePersonId, setUpdatePersonId] = useState()
    const onFinish = values => {
      const { Year, make, model, Price } = values
      const id = props.id
      let year = parseInt(Year)
      let price = parseInt(Price)
      const personId = updatePersonId

      updateCar({
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
              updateCar: {
                  __typename: 'Car',
                  id,
                  year,
                  make,
                  model,
                  price,
                  personId
              }
          }
      })
      props.onButtonClick()
  }
  const handleChange = (id) => {
      setUpdatePersonId(id)
  }




  return (
    <Form
    form={form}
    size='large'
    onFinish={onFinish}
    initialValues={{
      year:props.year,
      make:props.make,
      price:props.price,
      personId:props.personId,
      model:props.model,
    }}
    >
    <Form.Item
                name='PersonId'
                >
                <Select
                    style={{ width: '400px', marginLeft:'50px' }}
                    onChange={handleChange}
                    placeholder="Select Name"
                >
                    {
                        data.people.map(({ id, firstName, lastName }) => (
                            <Option key={id} value={`${id}`}>{firstName} {lastName}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Year is a required field!' }]} >
                <Input type='number' min='1900' max='2022' placeholder='Year i.e. 2008' />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Make is a required field!' }]} >
                <Input placeholder='Make i.e Mercedes' />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Model is a required field!' }]} >
                <Input placeholder='Model i.e. 2012' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Price is a required field!!' }]} >
                <Input type='number' min='0'   placeholder='Price i.e. 80000' />
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
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>

    </Form>
  )
}

export default UpdateCar