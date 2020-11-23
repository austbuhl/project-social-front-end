import React from 'react'
import { useSelector } from 'react-redux'
import CommentsList from '../comments/CommentsList'
import CommentForm from '../comments/CommentForm'
import RSVPButton from './RSVPButton'
import EventAttendee from './EventAttendee'
import { selectEventUsers, selectEventComments } from '../../redux/selectors'
import { Grid, List } from 'semantic-ui-react'

const EventDetail = ({ event }) => {
  const attendees = useSelector((state) => selectEventUsers(state)(event.id))
  const comments = useSelector((state) => selectEventComments(state)(event.id))

  const renderAttendees = () => {
    return attendees.map((user) => <EventAttendee key={user.id} user={user} />)
  }

  return (
    <Grid container padded centered>
      <Grid.Column width={10}>
        <h1>{event.attributes.name}</h1>
        <h4>{event.attributes.description}</h4>
        <p>Number of People: {event.attributes.numOfPeople}</p>
        <List animated verticalAlign='middle'>
          {renderAttendees()}
        </List>
        <RSVPButton eventId={event.id} />
        <CommentsList comments={comments} />
        <CommentForm eventId={event.id} />
      </Grid.Column>
    </Grid>
  )
}

export default EventDetail
