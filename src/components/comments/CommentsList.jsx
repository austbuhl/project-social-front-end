import React from 'react'
import {connect} from 'react-redux'
import Comment from './Comment'

const CommentsList = ({comments}) => {
  const renderComments = () => {
    return comments.map(comment => <Comment key={comment.id} comment={comment} />)
  }

  return (
    <div>
      <h1>Comments List Here</h1>
      {renderComments()}
    </div>
  )
}

const mapStateToProps = state => {
  return {comments: state.comments}
}

export default connect(mapStateToProps)(CommentsList)