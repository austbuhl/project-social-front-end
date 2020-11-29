import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { newCommentReceived } from '../../redux/actions'
import consumer from '../../cable'
import moment from 'moment'
import CommentsList from '../comments/CommentsList'
import CommentForm from '../comments/CommentForm'
import RSVPButton from './RSVPButton'
import EventAttendee from './EventAttendee'
import ActivityIcon from '../activities/ActivityIcon'
import {
  selectEventUsers,
  selectEventComments,
  selectEventActivities,
  selectEventPark,
  selectCurrentUser,
} from '../../redux/selectors'
import { Grid, List, Card } from 'semantic-ui-react'

const EventDetail = ({
  currentUser,
  event,
  eventUsers,
  eventComments,
  eventActivities,
  eventLocation,
  newCommentReceived,
}) => {
  const park = eventLocation(event.id)
  const attendees = eventUsers(event.id)
  const comments = eventComments(event.id)
  const activities = eventActivities(event.id)
  const time = moment.utc(event.attributes.time).format('LT')
  const date = moment.utc(event.attributes.date).format('ddd, MMM Do, YYYY')

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      {
        channel: 'FeedChannel',
        event: event.id,
      },
      {
        received: (comment) =>
          newCommentReceived(comment, event.id, currentUser.id),
        connected: () => console.log('connected'),
        disconnected: () => console.log('disconnected'),
      }
    )
    return () => subscription.unsubscribe()
  }, [event.id])

  const renderAttendees = () => {
    return attendees.map((user) => <EventAttendee key={user.id} user={user} />)
  }

  const activityNames = activities
    .map((activity) => activity.attributes.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return activityNames.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <Grid container padded centered>
      <Grid.Column width={10}>
        <h1>{event.attributes.name}</h1>
        <NavLink to={`/parks/${park.id}`}>
          <h3>Location: {park.attributes.name}</h3>
        </NavLink>
        <br />
        <div>
          <strong>Date:</strong> {date}
        </div>
        <div>
          <strong>Time:</strong> {time}
        </div>
        <h4>Event Description: {event.attributes.description}</h4>
        {renderActivityIcons()}

        <br />
        <br />
        <div>
          <strong>People Needed:</strong> {event.attributes.numOfPeople}{' '}
        </div>
        <div>
          <strong>Currently Going:</strong>{' '}
          {event.relationships.users.data.length}{' '}
        </div>
        <Card.Group itemsPerRow={3}>{renderAttendees()}</Card.Group>

        {/* <List selection verticalAlign='middle' divided>
        </List> */}
        <RSVPButton eventId={event.id} />
        <CommentsList comments={comments} />
        <CommentForm eventId={event.id} />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    eventUsers: selectEventUsers(state),
    eventComments: selectEventComments(state),
    eventActivities: selectEventActivities(state),
    eventLocation: selectEventPark(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newCommentReceived: (comment, eventId, userId) =>
      dispatch(newCommentReceived(comment, eventId, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
