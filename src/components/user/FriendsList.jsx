import React from 'react'
import { connect } from 'react-redux'
import { acceptRequest, deleteFriend } from '../../redux/actions'

import { List, Button } from 'semantic-ui-react'

const FriendsList = ({ user, friends, deleteFriend, acceptRequest }) => {
  const renderFriendsList = () => {
    return friends.map((friend) => (
      <List.Item key={friend.id}>
        <List.Content>{friend.attributes.friendName}</List.Content>
        <List.Content floated='right'>
          <Button onClick={() => acceptRequest(friend.attributes.friendId)}>
            <Button.Content>{friend.attributes.status}</Button.Content>
          </Button>
          <Button onClick={() => deleteFriend(friend.attributes.friendId)}>
            <Button.Content>
              {friend.attributes.status === 'pending'
                ? 'Decline Request'
                : 'Delete Friend'}
            </Button.Content>
          </Button>
        </List.Content>
      </List.Item>
    ))
  }

  return (
    <div>
      <h1>Friends List</h1>
      <List divided verticalAlign='middle'>
        {renderFriendsList()}
      </List>
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     userFriends: selectUserFriends(state),
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    // addFriend: (friendId) => dispatch(addFriend(friendId)),
    acceptRequest: (friendId) => dispatch(acceptRequest(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
  }
}

export default connect(null, mapDispatchToProps)(FriendsList)
