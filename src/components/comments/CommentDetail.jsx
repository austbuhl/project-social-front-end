import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentDetail = ({ comment }) => {
  const date = new Date(comment.created_at)
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{comment.username}</Comment.Author>
        <Comment.Metadata>
          <div>{date.toLocaleDateString('en-US')}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}

export default CommentDetail
