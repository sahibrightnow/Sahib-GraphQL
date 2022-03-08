import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
  `

export const GET_PERSON_CARS = gql`
query personAndHisCars($personId: String!) {
  personAndHisCars(id: $personId) {
    car {
      id
      year
      make
      model
      price
      personId
    }
    person {
      id
      firstName
      lastName
    }
  }
}
`
export const GET_CARS = gql`
{
  allCars {
    id 
    personId
    year
    make
    model
    price
  }
}
`
export const ADD_CAR = gql`
mutation AddCar($id: String!, $personId: String!, $year: Int!, $make: String! $price: Int! $model:String!) {
  addCar( id: $id, personId: $personId, year: $year, make: $make, price: $price, model: $model) {
    id
    year
    make
    model
    price
    personId

  }
}
`
export const REMOVE_CAR = gql`
mutation RemoveCar($id: String!) {
  removeCar( id: $id ) {
    id
    year
    make
    model
    price
    personId
  }
}`

export const UPDATE_CAR = gql`
mutation UpdateCar($id: String!, $personId: String!, $year: Int!, $make: String! $price: Int! $model:String!) {
  updateCar(id: $id, personId: $personId, year: $year, make: $make, price: $price, model: $model) {
    id
    year
    make
    model
    price
    personId
  }
}
`


