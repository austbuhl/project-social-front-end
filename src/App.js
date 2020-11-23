import './App.css'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchEvents,
  fetchParks,
  authorizeUser,
  fetchComments,
  fetchUsers,
} from './redux/actions'
import { Switch, Route } from 'react-router-dom'
import EventsList from './containers/EventsList'
import ParksList from './containers/ParksList'
import Map from './components/map/Map'
import NavBar from './containers/NavBar'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Profile from './components/user/Profile'
import Filter from './components/map/Filter'
import Home from './containers/Home'
import { Container, Grid } from 'semantic-ui-react'

function App({
  fetchEvents,
  fetchParks,
  fetchComments,
  fetchUsers,
  authorizeUser,
}) {
  useEffect(() => {
    fetchParks()
    authorizeUser()
    fetchEvents()
    fetchUsers()
    fetchComments()
  }, [])

  return (
    <div className='App'>
      <NavBar />
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
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchParks: () => dispatch(fetchParks()),
    fetchComments: () => dispatch(fetchComments()),
    fetchUsers: () => dispatch(fetchUsers()),
    authorizeUser: () => dispatch(authorizeUser()),
  }
}

export default connect(null, mapDispatchToProps)(App)
