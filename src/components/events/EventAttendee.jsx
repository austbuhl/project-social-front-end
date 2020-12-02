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
      : history.push('/login', `/users/${user.id}/profile`)
  }

  const friendsCount = user.relationships.friendships.data.length

  const imgs = [
    'https://react.semantic-ui.com/images/avatar/large/stevie.jpg',
    'https://react.semantic-ui.com/images/avatar/large/veronika.jpg',
    'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    'https://react.semantic-ui.com/images/avatar/large/matt.jpg',
    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
    'https://react.semantic-ui.com/images/avatar/large/joe.jpg',
    'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
  ]

  const randomImg = imgs[Math.floor(Math.random() * imgs.length)]

  return (
    <Item>
      <Item.Image size='tiny' src={randomImg} circular />
      <Item.Content verticalAlign='middle'>
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
            size='tiny'
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
