import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import { createComment, attendEvent } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
// import RSVPModal from '../events/RSVPModal'
import { selectCurrentUserEvents } from '../../redux/selectors'

const CommentForm = ({
  eventId,
  createComment,
  loggedIn,
  attending,
  attendEvent,
}) => {
  const [commentText, setCommentText] = useState('')
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const submitHandler = (e) => {
    if (loggedIn && attending) {
      e.preventDefault()
      createComment({
        event_id: eventId,
        text: commentText,
      })
      setCommentText('')
    } else if (loggedIn) {
      setOpen(true)
    } else {
      history.push('/login', history.location.pathname)
    }
  }

  const clickHandler = () => {
    attendEvent({ event_id: eventId })
    setOpen(false)
  }

  return (
    <Form reply onSubmit={submitHandler}>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        // trigger={}
      >
        <Header icon>
          <Icon name='calendar alternate' />
          Please RSVP
        </Header>
        <Modal.Content>
          <p>In order to comment you must first RSVP to this event.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={clickHandler}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <Form.TextArea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button
        content='Add Reply'
        labelPosition='left'
        icon='edit'
        primary
        fluid
      />
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (commentObj) => dispatch(createComment(commentObj)),
    attendEvent: (eventId) => dispatch(attendEvent(eventId)),
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
