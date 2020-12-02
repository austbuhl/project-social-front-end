import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { attendEvent, cancelRSVP } from '../../redux/actions'
import { useHistory } from 'react-router-dom'

const RSVPButton = ({
  eventId,
  attending,
  loggedIn,
  attendEvent,
  cancelRSVP,
}) => {
  const history = useHistory()

  const clickHandler = () => {
    if (!loggedIn) history.push('/login', history.location.pathname)
    if (attending) {
      cancelRSVP(eventId)
    } else {
      attendEvent({ event_id: eventId })
    }
  }
  return (
    <>
      {loggedIn && (
        <Button floated='right' secondary onClick={clickHandler}>
          <Button.Content>{attending ? 'Cancel' : 'RSVP'}</Button.Content>
        </Button>
      )}
      {!loggedIn && (
        <Button
          animated='fade'
          secondary
          floated='right'
          onClick={clickHandler}
        >
          <Button.Content visible>RSVP</Button.Content>
          <Button.Content hidden>{loggedIn ? 'RSVP' : 'Login'}</Button.Content>
        </Button>
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    attendEvent: (eventId) => dispatch(attendEvent(eventId)),
    cancelRSVP: (eventId) => dispatch(cancelRSVP(eventId)),
  }
}

export default connect(null, mapDispatchToProps)(RSVPButton)
