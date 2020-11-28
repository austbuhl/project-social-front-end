import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { List } from 'semantic-ui-react'
const EventAttendee = ({ user }) => {
  const loggedIn = useSelector((state) => state.loggedIn)
  const history = useHistory()

  const clickHandler = () => {
    loggedIn
      ? history.push(`/users/${user.id}/profile`)
      : history.push('/login', history.location.pathname)
  }

  return (
    <List.Item>
      <List.Content>
        <List.Header onClick={clickHandler}>
          {user.attributes.username}
        </List.Header>
      </List.Content>
    </List.Item>
  )
}
export default EventAttendee
