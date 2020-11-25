import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from '../components/user/Profile'
import FriendsList from '../components/user/FriendsList'
import { connect } from 'react-redux'
import { selectUser } from '../redux/selectors'
const UsersContainer = ({ selectUser }) => {
  return (
    <Switch>
      <Route
        path='/users/:id/profile'
        render={({ match }) => {
          const user = selectUser(parseInt(match.params.id))
          return <Profile user={user} />
        }}
      />
      <Route
        path='/users/:id/friends'
        render={({ match }) => {
          const user = selectUser(parseInt(match.params.id))
          return <FriendsList user={user} />
        }}
      />
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    selectUser: selectUser(state),
  }
}
export default connect(mapStateToProps)(UsersContainer)
