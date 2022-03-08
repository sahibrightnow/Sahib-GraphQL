import { useState } from 'react'
import { Card } from 'antd'
import {Link} from 'react-router-dom'

import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'

import RemovePerson from '../buttons/RemovePerson'
import Cars from '../lists/Cars'

const getStyles = props => ({
  card: {
    width: '500px'
  }
})

const Contact = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} firstName={firstName} lastName={lastName} />
          ]}
          style={styles.card}
        >
          <Link to={`/people/${id}`}>{firstName} {lastName}</Link>
        </Card>
      )}
      <Cars key={id} personId={id} />
    </div>
  )
}

export default Contact
