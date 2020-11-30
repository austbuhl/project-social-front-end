import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { acceptRequest, deleteFriend } from '../../redux/actions'
import { selectUser, selectCurrentUser } from '../../redux/selectors'
import { Button, Item, Icon, Grid, Label } from 'semantic-ui-react'

const FriendsList = ({
  // user,
  currentUser,
  yourProfile,
  friends,
  deleteFriend,
  acceptRequest,
  selectUser,
}) => {
  const renderFriendsList = () => {
    return friends.map((friend) => {
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
              {yourProfile && youFriended && (
                <Button
                  secondary
                  size='tiny'
                  onClick={() => deleteFriend(friendId)}
                >
                  {status === 'pending' ? 'Cancel Request' : 'Delete Friend'}
                </Button>
              )}

              {yourProfile && !youFriended && status === 'pending' && (
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

              {yourProfile && status === 'accepted' && (
                <Button
                  secondary
                  size='tiny'
                  onClick={() => deleteFriend(friendId)}
                >
                  Delete Friend
                </Button>
              )}
              <NavLink to={`/users/${friend.attributes.friendId}/profile`}>
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
          <h1>{yourProfile ? 'Friends List' : 'Mutual Friends'}</h1>
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
