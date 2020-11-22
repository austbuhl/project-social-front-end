import React from 'react'
import { useSelector } from 'react-redux'
import CommentsList from '../comments/CommentsList'
import CommentForm from '../comments/CommentForm'
import RSVPButton from './RSVPButton'
import {selectEventUsers, selectEventComments} from '../../redux/selectors'

const EventDetail = ({ event }) => {
  
  const attendees = useSelector(state => selectEventUsers(state)(event.id))
  const comments = useSelector(state => selectEventComments(state)(event.id))

  const renderAttendees = () => {
    return attendees.map((user) => <li>{user.attributes.username}</li>)
  }

  return (
    <div>
      <h1>{event.attributes.name}</h1>
      <h4>{event.attributes.description}</h4>
      <p>{event.attributes.num_of_people}</p>
      <ul>{renderAttendees()}</ul>
      <RSVPButton eventId={event.id} />
      <CommentsList comments={comments} />
      <CommentForm eventId={event.id} />
    </div>
  )
}

export default EventDetail
