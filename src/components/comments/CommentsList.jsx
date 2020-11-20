import React from 'react'
import CommentDetail from './CommentDetail'
import { Comment, Header } from 'semantic-ui-react'

const CommentsList = ({ comments }) => {
  console.log(comments)
  const renderComments = () => {
    return comments.map((comment) => (
      <CommentDetail key={comment.id} comment={comment} />
    ))
  }

  return (
    <div>
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        {renderComments()}
      </Comment.Group>
    </div>
  )
}

export default CommentsList
