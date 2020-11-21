import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { createComment } from '../../redux/actions'
import { useHistory } from 'react-router-dom'

const CommentForm = ({ eventId, createComment, currentUser }) => {
  const [commentText, setCommentText] = useState('')
  const history = useHistory()

  const submitHandler = (e) => {
    if (currentUser) {
      e.preventDefault()
      createComment({
        event_id: eventId,
        text: commentText,
      })
      setCommentText('')
    } else {
      history.push('/login', history.location.pathname)
    }
  }

  return (
    <Form reply onSubmit={submitHandler}>
      <Form.TextArea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (commentObj) => dispatch(createComment(commentObj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
