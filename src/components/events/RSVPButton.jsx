import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Message } from 'semantic-ui-react'
import { attendEvent } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import { selectCurrentUserEvents } from '../../redux/selectors'

const RSVPButton = ({ eventId, loggedIn, attendEvent, currentUserEvents }) => {
  const history = useHistory()
  const [alreadyAttending, setAlreadyAttending] = useState(false)

  useEffect(() => {
    let interval = setInterval(() => {
      setAlreadyAttending(false)
    }, 3000)
    return () => clearTimeout(interval)
  }, [alreadyAttending])

  const clickHandler = () => {
    if (!loggedIn) history.push('/login', history.location.pathname)

    if (currentUserEvents.find((event) => event.id === eventId)) {
      setAlreadyAttending(true)
    } else {
      attendEvent({ event_id: eventId })
    }
  }

  return (
    <>
      <Button secondary onClick={clickHandler}>
        <Button.Content>RSVP</Button.Content>
      </Button>
      {alreadyAttending && (
        <Message negative>
          <Message.Header>You're already attending!</Message.Header>
        </Message>
      )}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSVPButton)
