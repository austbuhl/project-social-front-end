import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Comment } from 'semantic-ui-react'
import { selectCommentAuthor } from '../../redux/selectors'

const CommentDetail = ({ comment }) => {
  const date = new Date(comment.attributes.createdAt)
  const author = useSelector((state) => selectCommentAuthor(state)(comment.id))
  const loggedIn = useSelector((state) => state.loggedIn)

  const imgs = [
    'https://react.semantic-ui.com/images/avatar/large/stevie.jpg',
    'https://react.semantic-ui.com/images/avatar/large/veronika.jpg',
    'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    'https://react.semantic-ui.com/images/avatar/large/matt.jpg',
    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
    'https://react.semantic-ui.com/images/avatar/large/joe.jpg',
    'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
  ]
  const randomImg = imgs[Math.floor(Math.random() * imgs.length)]
  return (
    <Comment>
      <Comment.Avatar src={randomImg} />
      <Comment.Content>
        <NavLink to={loggedIn ? `/users/${author.id}/profile` : '/login'}>
          <Comment.Author as='a'>{author.attributes.username}</Comment.Author>
        </NavLink>
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
