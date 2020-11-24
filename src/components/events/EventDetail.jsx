import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
} from '../../redux/selectors'
import { Grid, List } from 'semantic-ui-react'

const EventDetail = ({
  event,
  eventUsers,
  eventComments,
  eventActivities,
  eventLocation,
}) => {
  const park = eventLocation(event.id)
  const attendees = eventUsers(event.id)
  const comments = eventComments(event.id)
  const activities = eventActivities(event.id)

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

  console.log(attendees)
  return (
    <Grid container padded centered>
      <Grid.Column width={10}>
        <h1>{event.attributes.name}</h1>
        <NavLink to={`/parks/${park.id}`}>
          <h3>Location: {park.attributes.name}</h3>
        </NavLink>
        <h4>Details: {event.attributes.description}</h4>
        {renderActivityIcons()}
        <p>People Needed: {event.attributes.numOfPeople} </p>
        <p>Currently Going: {event.relationships.users.data.length} </p>
        <List animated={false} verticalAlign='middle'>
          {renderAttendees()}
        </List>
        <RSVPButton eventId={event.id} />
        <CommentsList comments={comments} />
        <CommentForm eventId={event.id} />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    eventUsers: selectEventUsers(state),
    eventComments: selectEventComments(state),
    eventActivities: selectEventActivities(state),
    eventLocation: selectEventPark(state),
  }
}

export default connect(mapStateToProps)(EventDetail)
