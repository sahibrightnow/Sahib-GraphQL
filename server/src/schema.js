import { gql } from 'apollo-server'
import { find, remove, filter } from 'lodash'
import {cars, people} from './peopleCarsScheme';



const typeDefs = gql`
  type person {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    personId: String
    year: Int
    make: String
    model: String
    price: Int
  }

 

  type personAndHisCars {
    car: [Car],
    person: person

  }

  type Query {
    car(id: String!): Car
    people: [person]
    person(id: String!): person
    personAndHisCars(id: String!): personAndHisCars
    allCars: [Car]
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): person
    updatePerson(id: String!, firstName: String, lastName: String): person
    removePerson(id: String!): person
    addCar(id: String!, personId: String!, year: Int!, make: String! price: Int! model:String!): Car
    updateCar(id: String! personId: String!, year: Int!, make: String! price: Int! model:String!): Car
    removeCar(id: String!): Car
  }
`

const resolvers = {
  Query: {
    people: () => people,
    person(parent, args, context, info) {
      return find(people, { id: args.id })
    },
    
    car(parent, args, context, info) {
      return find(cars, { id: args.id })
    },

    allCars: () => cars,

    personAndHisCars(parent, args, context, info) {
      const person = find(people, { id: args.id })
      const car = filter(cars, { personId: args.id })
      return {person, car}
      
    }

  },
  Mutation: {
    addPerson(parent, args, context, info) {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      people.push(newPerson)

      return newPerson
    },
    updatePerson(root, args) {
      const person = find(people, { id: args.id })

      if (!person) {
        throw new Error(`Person with id ${args.id} not found`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },
    removePerson(root, args) {
      const removedPerson = find(people, { id: args.id })
      if (!removedPerson) {
        throw new Error(`Person with id ${args.id} not found`)
      }

      remove(people, c => {
        return c.id === removedPerson.id
      })

      return removedPerson
    },
    addCar(root, args) {
      const newCar = {
        personId: args.personId,
        model: args.model,
        make: args.make,
        year: args.year,
        price: args.price,
        id: args.id
      }
      cars.push(newCar)
      return newCar;

    },
    updateCar(root, args) {
      const car = find(cars, { id: args.id })
      if (!car) {
        throw new Error(`Person with id ${args.id} not found`)
      }

      car.personId = args.personId
      car.year = args.year,
      car.make = args.make,
      car.model = args.model,
      car.price = args.price,
      car.id= args.id

      return car
    },
    removeCar(root, args) {
      const removedCar = find(cars, { id: args.id })
      if (!removedCar) {
        throw new Error(`Car with id ${args.id} not found`)
      }

      remove(cars, c => {
        return c.id === removedCar.id
      })

      return removedCar

    }
  }
}

export { typeDefs, resolvers }
