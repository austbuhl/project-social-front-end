import React from 'react'
import CommentsList from '../comments/CommentsList'

const EventDetail = ({ event }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <h4>{event.description}</h4>
      <p>{event.num_of_people}</p>
      <CommentsList comments={event.comments} />
    </div>
  )
}

export default EventDetail
