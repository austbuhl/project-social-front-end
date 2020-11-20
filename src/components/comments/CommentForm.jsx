import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { submitComment } from '../../redux/actions'

const CommentForm = ({ eventId, submitComment }) => {
  const [commentText, setCommentText] = useState('')
  //user, event, text

  const submitHandler = (e) => {
    e.preventDefault()
    submitComment({
      event_id: eventId,
      text: commentText,
    })
    setCommentText('')
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

const mapDispatchToProps = (dispatch) => {
  return {
    submitComment: (commentObj) => dispatch(submitComment(commentObj)),
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
