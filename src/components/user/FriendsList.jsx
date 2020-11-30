import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { acceptRequest, deleteFriend } from '../../redux/actions'

import { Button, Item, Icon, Grid } from 'semantic-ui-react'

const FriendsList = ({
  user,
  yourProfile,
  friends,
  deleteFriend,
  acceptRequest,
}) => {
  const renderFriendsList = () => {
    return friends.map((friend) => (
      <Item key={friend.id}>
        <Item.Content>
          <Item.Header>{friend.attributes.friendName}</Item.Header>
          <Item.Extra>
            <NavLink to={`/users/${friend.attributes.friendId}/profile`}>
              <Button primary floated='right' animated size='small'>
                <Button.Content visible>View Profile</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </NavLink>
            {yourProfile && (
              <>
                <Button
                  onClick={() => acceptRequest(friend.attributes.friendId)}
                >
                  <Button.Content>{friend.attributes.status}</Button.Content>
                </Button>
                <Button
                  onClick={() => deleteFriend(friend.attributes.friendId)}
                >
                  <Button.Content>
                    {friend.attributes.status === 'pending'
                      ? 'Decline Request'
                      : 'Delete Friend'}
                  </Button.Content>
                </Button>
              </>
            )}
          </Item.Extra>
        </Item.Content>
      </Item>
    ))
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

const mapDispatchToProps = (dispatch) => {
  return {
    acceptRequest: (friendId) => dispatch(acceptRequest(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
  }
}

export default connect(null, mapDispatchToProps)(FriendsList)
