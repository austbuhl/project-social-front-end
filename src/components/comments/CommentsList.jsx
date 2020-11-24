import React, { useState } from 'react'
import CommentDetail from './CommentDetail'
import { Comment, Header, Button } from 'semantic-ui-react'

const CommentsList = ({ comments }) => {
  const commentsToShow = -3
  const commentsHidden = comments.length + commentsToShow
  const sortedComments = comments.sort((a, b) => a.id - b.id)

  const renderComments = () => {
    return sortedComments
      .slice(commentsToShow)
      .map((comment) => <CommentDetail key={comment.id} comment={comment} />)
  }

  return (
    <div>
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        {commentsHidden}
        <Button>Load Previous Comments</Button>
        {renderComments()}
      </Comment.Group>
    </div>
  )
}

export default CommentsList
