import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { attendEvent } from '../../redux/actions'
import { useHistory } from 'react-router-dom'

const RSVPButton = ({ eventId, currentUser, attendEvent }) => {
  const history = useHistory()
  const clickHandler = () => {
    if (currentUser) {
      attendEvent({ event_id: eventId })
    } else {
      history.push('/login', history.location.pathname)
    }
  }

  return <Button content='RSVP' onClick={clickHandler} />
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attendEvent: (userEvent) => dispatch(attendEvent(userEvent)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSVPButton)
