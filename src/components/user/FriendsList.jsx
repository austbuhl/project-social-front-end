import React from 'react'
import { connect } from 'react-redux'
import { addFriend, acceptRequest, deleteFriend } from '../../redux/actions'
import { selectUserFriends } from '../../redux/selectors'
import { List, Button } from 'semantic-ui-react'

const FriendsList = ({ user, userFriends, deleteFriend, acceptRequest }) => {
  const friends = userFriends(user.id)

  const renderFriendsList = () => {
    return friends.map((friend) => (
      <List.Item key={friend.id}>
        <List.Content>{friend.attributes.friendName}</List.Content>
        <List.Content floated='right'>
          <Button onClick={() => acceptRequest(friend.attributes.friendId)}>
            {friend.attributes.status}
          </Button>
          <Button onClick={() => deleteFriend(friend.attributes.friendId)}>
            Delete Friend
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

const mapStateToProps = (state) => {
  return {
    userFriends: selectUserFriends(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addFriend: (friendId) => dispatch(addFriend(friendId)),
    acceptRequest: (friendId) => dispatch(acceptRequest(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
