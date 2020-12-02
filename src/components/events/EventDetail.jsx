import React, { useState, useEffect } from 'react'
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
  selectCurrentUserEvents,
} from '../../redux/selectors'
import { Grid, Item, Button, Segment } from 'semantic-ui-react'

const EventDetail = ({
  currentUser,
  loggedIn,
  currentUserEvents,
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
  const [viewAttendees, setViewAttendees] = useState(false)
  const [attending, setAttending] = useState(
    loggedIn
      ? !!currentUserEvents.find((currentEvent) => currentEvent.id === event.id)
      : false
  )

  useEffect(() => {
    setAttending(
      loggedIn
        ? !!currentUserEvents.find(
            (currentEvent) => currentEvent.id === event.id
          )
        : false
    )
  }, [currentUserEvents])

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
        {/* <Segment stacked> */}
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
        <RSVPButton
          eventId={event.id}
          attending={attending}
          loggedIn={loggedIn}
        />
        {renderActivityIcons()}
        <br />
        <div style={{ marginTop: '2em' }}>
          <strong>People Needed: </strong>
          {event.attributes.numOfPeople}
        </div>
        <div>
          <strong>Currently Going: </strong>
          {event.relationships.users.data.length}

          <Button
            floated='right'
            circular
            secondary
            icon={viewAttendees ? 'angle double up' : 'angle double down'}
            onClick={() => setViewAttendees((prevState) => !prevState)}
          />
        </div>
        <br />
        <hr />
        {viewAttendees && <Item.Group divided>{renderAttendees()}</Item.Group>}
        {/* </Segment> */}

        <CommentsList comments={comments} />
        <CommentForm
          eventId={event.id}
          attending={attending}
          loggedIn={loggedIn}
        />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUserEvents: selectCurrentUserEvents(state),
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
