import React, { useEffect, useState } from 'react'

import CommentDetail from './CommentDetail'
import { Comment, Header, Button } from 'semantic-ui-react'

const CommentsList = ({ comments }) => {
  const commentsToShow = comments.length < 3 ? comments.length : 3
  const sortedComments = comments.sort((a, b) => a.id - b.id)
  const initialComment = comments.length - commentsToShow
  const [firstComment, setFirstComment] = useState(initialComment)

  useEffect(() => {
    setFirstComment(initialComment)
  }, [comments])

  const indexOfLastComment = firstComment + 3

  const renderComments = () => {
    return sortedComments
      .slice(firstComment, indexOfLastComment)
      .map((comment) => <CommentDetail key={comment.id} comment={comment} />)
  }

  return (
    <div>
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        {firstComment > 0 && (
          <Button onClick={() => setFirstComment(firstComment - 1)}>
            Load Previous Comments
          </Button>
        )}

        {renderComments()}
      </Comment.Group>
    </div>
  )
}

export default CommentsList
