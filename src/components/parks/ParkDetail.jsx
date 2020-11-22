import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import Activity from '../activities/Activity'
import EventForm from '../events/EventForm'
import Event from '../events/Event'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import {selectParkActivities} from '../../redux/selectors'

const ParkDetail = ({ park, currentUser }) => {
  const [showForm, setShowForm] = useState(false)
  const history = useHistory()
  const activities = useSelector(state => selectParkActivities(state)(park.id))

  const renderActivities = () => {
    return activities.map((activity) => (
      <Activity key={activity.id} activity={activity} />
    ))
  }
  const renderEvents = () => {
    return park.events.map((event) => <Event key={event.id} event={event} />)
  }
  const clickHandler = () => {
    currentUser
      ? setShowForm(true)
      : history.push('/login', history.location.pathname)
  }

  return (
    <div>
      <h1>{park.attributes.name}</h1>
      <h4>{park.attributes.location}</h4>
      <a href={park.attributes.website} target='_blank'>
        {park.attributes.website}
      </a>
      <h3>Upcoming Events</h3>
      {/* {renderEvents()} */}
      <h3>Available Activities</h3>
      {renderActivities()}

      <Button animated='fade' secondary onClick={clickHandler}>
        <Button.Content visible>Create an Event</Button.Content>
        <Button.Content hidden>
          {currentUser ? 'Show Form' : 'Login'}
        </Button.Content>
      </Button>
      {showForm && <EventForm park={park} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(ParkDetail)
