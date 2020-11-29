import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { List, Card, Icon, Image, Button } from 'semantic-ui-react'
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
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/steve.jpg'
        />
        <Card.Header>{user.attributes.username}</Card.Header>
        // find a mutual friend
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Meta>
          <Icon name='user' />
          {`${friendsCount} ${friendsCount > 1 ? 'Friends' : 'Friend'}`}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={clickHandler}>
            View Profile
          </Button>
          <Button basic color='red'>
            Send Message
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
export default EventAttendee
