import React from 'react'
import {connect} from 'react-redux'
import Event from './Event'

const EventsList = ({events}) => {
  
  const renderEvents = () => {
    return events.map(event => <Event key={event.id} event={event} />)
  }

  return (
    <div>
      <h1>Events List Here</h1>
      {renderEvents()}
    </div>
  )
}

const mapStateToProps = state => {
  return {events: state.events}
}

export default connect(mapStateToProps)(EventsList)