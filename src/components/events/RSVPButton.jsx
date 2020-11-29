import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Message } from 'semantic-ui-react'
import { attendEvent, cancelRSVP } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import { selectCurrentUserEvents } from '../../redux/selectors'

const RSVPButton = ({
  eventId,
  loggedIn,
  attendEvent,
  currentUserEvents,
  cancelRSVP,
}) => {
  const history = useHistory()
  const [alreadyAttending, setAlreadyAttending] = useState(
    loggedIn ? currentUserEvents.find((event) => event.id === eventId) : false
  )

  const clickHandler = () => {
    if (!loggedIn) history.push('/login', history.location.pathname)

    if (alreadyAttending) {
      cancelRSVP(eventId)
      setAlreadyAttending(false)
    } else {
      attendEvent({ event_id: eventId })
      setAlreadyAttending(true)
    }
  }
  return (
    <Button floated='right' secondary onClick={clickHandler}>
      <Button.Content>{alreadyAttending ? 'Cancel' : 'RSVP'}</Button.Content>
    </Button>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUserEvents: selectCurrentUserEvents(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attendEvent: (eventId) => dispatch(attendEvent(eventId)),
    cancelRSVP: (eventId) => dispatch(cancelRSVP(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSVPButton)
