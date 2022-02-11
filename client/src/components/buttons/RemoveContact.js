import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'

import { filter } from 'lodash'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../queries'

const RemoveContact = ({ id, firstName, lastName }) => {
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    update(proxy, { data: { removeContact } }) {
      const { contacts } = proxy.readQuery({ query: GET_CONTACTS })
      proxy.writeQuery({
        query: GET_CONTACTS,
        data: {
          contacts: filter(contacts, o => {
            return o.id !== removeContact.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this contact?')
    if (result) {
      removeContact({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeContact: {
            __typename: 'Contact',
            id,
            firstName,
            lastName
          }
        }
      })
    }
  }
  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveContact
