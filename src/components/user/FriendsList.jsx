import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { acceptRequest, deleteFriend } from '../../redux/actions'
import { selectUser, selectCurrentUser } from '../../redux/selectors'
import { Button, Item, Icon, Grid, Menu } from 'semantic-ui-react'

const FriendsList = ({
  // user,
  currentUser,
  friends,
  deleteFriend,
  acceptRequest,
  selectUser,
}) => {
  const [activeItem, setActiveItem] = useState('Received')

  const sentRequests = friends.filter(
    (friend) =>
      friend.attributes.frienderId === currentUser.attributes.id &&
      friend.attributes.status === 'pending'
  )
  const rcvdRequests = friends.filter(
    (friend) =>
      friend.attributes.frienderId !== currentUser.attributes.id &&
      friend.attributes.status === 'pending'
  )
  const confirmed = friends.filter(
    (friend) => friend.attributes.status === 'accepted'
  )

  const renderFriendsList = () => {
    const friendsList = (activeItem) => {
      switch (activeItem) {
        case 'Received':
          return rcvdRequests
        case 'Sent':
          return sentRequests
        case 'Confirmed':
          return confirmed
        case 'All':
          return friends
      }
    }

    return friendsList(activeItem).map((friend) => {
      const friendsCount = selectUser(friend.attributes.friendId).relationships
        .friendships.data.length
      const youFriended =
        friend.attributes.frienderId === currentUser.attributes.id

      const { friendName, friendId, status } = friend.attributes
      return (
        <Item key={friend.id}>
          <Item.Content>
            <Item.Header>{friendName}</Item.Header>
            <Item.Meta>
              <Icon name='user' />
              {`${friendsCount} ${
                friendsCount > 1 || friendsCount === 0 ? 'Friends' : 'Friend'
              }`}
            </Item.Meta>
            <Item.Extra>
              <p>{status}</p>
              {youFriended && (
                <Button
                  secondary
                  size='tiny'
                  onClick={() => deleteFriend(friendId)}
                >
                  {status === 'pending' ? 'Cancel Request' : 'Delete Friend'}
                </Button>
              )}

              {!youFriended && status === 'pending' && (
                <Button.Group>
                  <Button
                    positive
                    icon='check'
                    style={{ marginRight: '3px' }}
                    onClick={() => acceptRequest(friendId)}
                  />

                  <Button.Or />
                  <Button
                    negative
                    icon='cancel'
                    style={{ marginLeft: '3px' }}
                    onClick={() => deleteFriend(friendId)}
                  />
                </Button.Group>
              )}

              {status === 'accepted' && (
                <Button
                  secondary
                  size='tiny'
                  onClick={() => deleteFriend(friendId)}
                >
                  Delete Friend
                </Button>
              )}
              <NavLink to={`/users/${friendId}/profile`}>
                <Button primary floated='right' animated size='small'>
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
          <h1>Your Friends</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <Menu pointing secondary>
            <Menu.Item
              name='All'
              active={activeItem === 'All'}
              onClick={() => setActiveItem('All')}
            />
            <Menu.Item
              name='Received'
              active={activeItem === 'Received'}
              onClick={() => setActiveItem('Received')}
            />
            <Menu.Item
              name='Sent'
              active={activeItem === 'Sent'}
              onClick={() => setActiveItem('Sent')}
            />
            <Menu.Item
              name='Confirmed'
              active={activeItem === 'Confirmed'}
              onClick={() => setActiveItem('Confirmed')}
            />
          </Menu>
          <Item.Group divided>{renderFriendsList()}</Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    selectUser: selectUser(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    acceptRequest: (friendId) => dispatch(acceptRequest(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
