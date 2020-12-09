import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Profile from '../components/user/Profile'
import FriendsList from '../components/user/FriendsList'
import { connect } from 'react-redux'
import {
  selectCurrentUser,
  selectUser,
  selectUserFriends
} from '../redux/selectors'
import MutualFriends from '../components/user/MutualFriends'
const UsersContainer = ({ selectUser, currentUser, selectUserFriends }) => {
  const mutualFriends = (user) => {
    const currentUserFriends = selectUserFriends(currentUser.id)
    return selectUserFriends(user.id).filter((friend) => {
      return currentUserFriends.find(
        (current) =>
          current.attributes.friendId === friend.attributes.friendId ||
          currentUser.attributes.id === friend.attributes.friendId
      )
    })
  }

  return (
    <Switch>
      {!!!currentUser ? <Redirect to='/' /> : null}
      <Route
        path='/users/:id/profile'
        render={({ match }) => {
          const user = selectUser(parseInt(match.params.id))
          return <Profile user={user} />
        }}
      />
      <Route
        path='/users/:id/mutual'
        render={({ match }) => {
          const user = selectUser(parseInt(match.params.id))
          const mutual = mutualFriends(user)
          return (
            <MutualFriends friends={mutual} />
            // <FriendsList user={user} friends={mutual} yourProfile={false} />
          )
        }}
      />
      <Route
        path='/users/:id/friends'
        render={({ match }) => {
          const user = selectUser(parseInt(match.params.id))
          const friends = selectUserFriends(user.id)
          return <FriendsList friends={friends} />
        }}
      />
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    selectUser: selectUser(state),
    selectUserFriends: selectUserFriends(state)
  }
}
export default connect(mapStateToProps)(UsersContainer)
