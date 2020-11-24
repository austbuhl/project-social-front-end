import React from 'react'
import { NavLink } from 'react-router-dom'
import { List } from 'semantic-ui-react'
const EventAttendee = ({ user }) => {
  return (
    <List.Item>
      <List.Content>
        <NavLink to={`/users/${user.id}/profile`}>
          <List.Header>{user.attributes.username}</List.Header>
        </NavLink>
      </List.Content>
    </List.Item>
  )
}
export default EventAttendee
