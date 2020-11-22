import './App.css'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchEvents, fetchParks, authorizeUser, fetchComments, fetchUsers } from './redux/actions'
import { Switch, Route } from 'react-router-dom'
import EventsList from './components/events/EventsList'
import ParksList from './components/parks/ParksList'
import Map from './components/map/Map'
import NavBar from './components/nav/NavBar'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Profile from './components/user/Profile'
import Filter from './components/map/Filter'
import { Container, Grid } from 'semantic-ui-react'

function App({fetchEvents, fetchParks, fetchComments, fetchUsers, authorizeUser}) {
  useEffect(() => {
    fetchParks()
    fetchEvents()
    fetchComments()
    fetchUsers()
    authorizeUser()
  }, [])

  return (
    <div className='App'>
      <Container>
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
            <Grid container padded centered>
              <Filter />
              <Map />
              {/* <EventsList /> */}
            </Grid>
          </Route>
        </Switch>
      </Container>
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
