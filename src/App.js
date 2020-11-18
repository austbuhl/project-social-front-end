import './App.css';
import EventsList from './components/events/EventsList';
import CommentsList from './components/comments/CommentsList'
import ParksList from './components/parks/ParksList'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchComments, fetchEvents, fetchParks } from './redux/actions';

function App(props) {

  useEffect(() => {
    props.fetchEvents()
    props.fetchComments()
    props.fetchParks()
  }, [])

  return (
    <div className="App">
      <div className="main">
        <EventsList />
        <CommentsList />
        <ParksList />
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchComments: () => dispatch(fetchComments()),
    fetchParks: () => dispatch(fetchParks())
  }
}

export default connect(null, mapDispatchToProps)(App);
