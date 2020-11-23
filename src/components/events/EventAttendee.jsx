import React from 'react'
import { List } from 'semantic-ui-react'
const EventAttendee = ({ user }) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header>{user.attributes.username}</List.Header>
      </List.Content>
    </List.Item>
  )
}
export default EventAttendee
