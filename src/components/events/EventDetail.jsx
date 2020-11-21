import React from 'react'
import CommentsList from '../comments/CommentsList'
import CommentForm from '../comments/CommentForm'
import RSVPButton from './RSVPButton'

const EventDetail = ({ event }) => {
  console.log(event);
  const renderAttendees = () => {
    return event.users.map((user) => <li>{user.username}</li>)
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <h4>{event.description}</h4>
      <p>{event.num_of_people}</p>
      <ul>
        {renderAttendees()}
      </ul>
      <RSVPButton eventId={event.id} />
      <CommentsList comments={event.comments} />
      <CommentForm eventId={event.id} />
    </div>
  )
}

export default EventDetail
