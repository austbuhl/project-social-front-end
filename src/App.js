import './App.css'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchEvents,
  fetchParks,
  authorizeUser,
  fetchComments,
  fetchFriends,
  fetchUsers
} from './redux/actions'
import { Switch, Route } from 'react-router-dom'
import EventsList from './containers/EventsList'
import ParksList from './containers/ParksList'
import NavBar from './containers/NavBar'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Home from './containers/Home'
import UsersContainer from './containers/UsersContainer'

function App({
  fetchEvents,
  fetchParks,
  fetchComments,
  fetchUsers,
  fetchFriends,
  authorizeUser
}) {
  useEffect(() => {
    fetchEvents()
    fetchParks()
    authorizeUser()
    fetchUsers()
    fetchFriends()
    fetchComments()
  }, [])

  return (
    <div className='App'>
      <NavBar />
      <div className='main'>
        <Switch>
          <Route path='/events'>
            <EventsList />
          </Route>
          <Route path='/parks'>
            <ParksList />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/users'>
            <UsersContainer />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchParks: () => dispatch(fetchParks()),
    fetchComments: () => dispatch(fetchComments()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFriends: () => dispatch(fetchFriends()),
    authorizeUser: () => dispatch(authorizeUser())
  }
}

export default connect(null, mapDispatchToProps)(App)
