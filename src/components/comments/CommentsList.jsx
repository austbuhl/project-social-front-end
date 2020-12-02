import React, { useEffect, useState } from 'react'

import CommentDetail from './CommentDetail'
import { Comment, Header, Button, Segment } from 'semantic-ui-react'

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
    <Segment stacked>
      <Comment.Group size='large'>
        <Header as='h3' dividing>
          Comments
        </Header>
        {firstComment > 0 && (
          <Button
            style={{ marginLeft: '37.5%' }}
            basic
            size='tiny'
            secondary
            onClick={() => setFirstComment(firstComment - 1)}
          >
            Load Previous Comments
          </Button>
        )}

        {renderComments()}
      </Comment.Group>
    </Segment>
  )
}

export default CommentsList
