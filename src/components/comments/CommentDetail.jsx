import React from 'react'
import { useSelector } from 'react-redux'
import { Comment } from 'semantic-ui-react'
import {selectCommentAuthor} from '../../redux/selectors'

const CommentDetail = ({ comment }) => {
  const date = new Date(comment.attributes.createdAt)
  const author = useSelector(state => selectCommentAuthor(state)(comment.id))

  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{author.attributes.username}</Comment.Author>
        <Comment.Metadata>
          <div>{date.toLocaleDateString('en-US')}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.attributes.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}

export default CommentDetail
