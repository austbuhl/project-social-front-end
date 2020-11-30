import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Item, Button, Icon } from 'semantic-ui-react'
const EventAttendee = ({ user }) => {
  const loggedIn = useSelector((state) => state.loggedIn)
  const history = useHistory()

  const clickHandler = () => {
    loggedIn
      ? history.push(`/users/${user.id}/profile`)
      : history.push('/login', history.location.pathname)
  }

  const friendsCount = user.relationships.friendships.data.length

  return (
    <Item>
      <Item.Content>
        <Item.Header>{user.attributes.username}</Item.Header>
        <Item.Meta>
          <Icon name='user' />
          {`${friendsCount} ${
            friendsCount > 1 || friendsCount === 0 ? 'Friends' : 'Friend'
          }`}
        </Item.Meta>

        <Item.Extra>
          <Button
            primary
            floated='right'
            animated
            size='small'
            onClick={clickHandler}
          >
            <Button.Content visible>View Profile</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}
export default EventAttendee
