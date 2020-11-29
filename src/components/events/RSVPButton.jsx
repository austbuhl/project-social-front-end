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
    currentUserEvents.find((event) => event.id === eventId)
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
    <>
      <Button secondary onClick={clickHandler}>
        <Button.Content>{alreadyAttending ? 'Cancel' : 'RSVP'}</Button.Content>
      </Button>
      {/* {alreadyAttending && (
        <Message negative>
          <Message.Header>You're already attending!</Message.Header>
        </Message>
      )} */}
    </>
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
    attendEvent: (userEvent) => dispatch(attendEvent(userEvent)),
    cancelRSVP: (eventId) => dispatch(cancelRSVP(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSVPButton)
