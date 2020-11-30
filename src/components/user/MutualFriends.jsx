import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectUser } from '../../redux/selectors'
import { Button, Item, Icon, Grid, Menu } from 'semantic-ui-react'

const MutualFriends = ({ friends }) => {
  const user = useSelector((state) => selectUser(state))
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

  const renderFriendsList = () => {
    return friends.map((friend) => {
      const friendsCount = user(friend.attributes.friendId).relationships
        .friendships.data.length
      // const youFriended =
      //   friend.attributes.frienderId === currentUser.attributes.id
      const randomImg = imgs[Math.floor(Math.random() * imgs.length)]
      const { friendName, friendId, status } = friend.attributes
      return (
        <Item key={friend.id}>
          <Item.Image size='tiny' src={randomImg} circular />
          <Item.Content verticalAlign='middle'>
            <Item.Header>{friendName}</Item.Header>
            <Item.Meta>
              <Icon name='user' />
              {`${friendsCount} ${
                friendsCount > 1 || friendsCount === 0 ? 'Friends' : 'Friend'
              }`}
            </Item.Meta>
            <Item.Extra>
              <NavLink to={`/users/${friendId}/profile`}>
                <Button primary floated='right' animated size='tiny'>
                  <Button.Content visible>View Profile</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
              </NavLink>
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }

  return (
    <Grid container padded centered>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <h1>Mutual Friends</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <Item.Group divided>{renderFriendsList()}</Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default MutualFriends
