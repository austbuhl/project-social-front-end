import './App.css'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchComments,
  fetchEvents,
  fetchParks,
  authorizeUser,
} from './redux/actions'
import { Switch, Route } from 'react-router-dom'
import EventsList from './components/events/EventsList'
import CommentsList from './components/comments/CommentsList'
import ParksList from './components/parks/ParksList'
import Map from './components/map/Map'
import NavBar from './components/nav/NavBar'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Profile from './components/user/Profile'

function App(props) {
  useEffect(() => {
    props.fetchEvents()
    props.fetchComments()
    props.fetchParks()
    props.authorizeUser()
  }, [])

  return (
    <div className='App'>
      <div className='ui container'>
        <NavBar />
        <Switch>
          <Route path='/events'>
            <EventsList />
          </Route>
          <Route path='/comments'>
            <CommentsList />
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
            <Map />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchComments: () => dispatch(fetchComments()),
    fetchParks: () => dispatch(fetchParks()),
    authorizeUser: () => dispatch(authorizeUser()),
  }
}

export default connect(null, mapDispatchToProps)(App)
