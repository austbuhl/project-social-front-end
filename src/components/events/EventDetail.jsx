import React from 'react'
import CommentsList from '../comments/CommentsList'
import CommentForm from '../comments/CommentForm'
import RSVPButton from './RSVPButton'

const EventDetail = ({ event }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <h4>{event.description}</h4>
      <p>{event.num_of_people}</p>
      <RSVPButton eventId={event.id} />
      <CommentsList comments={event.comments} />
      <CommentForm eventId={event.id} />
    </div>
  )
}

export default EventDetail
