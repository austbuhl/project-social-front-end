import React from 'react'
import { connect } from 'react-redux'
import {
  selectCurrentUser,
  selectCurrentUserEvents,
  selectCurrentUserActivities,
} from '../../redux/selectors'
import Event from '../events/Event'
import ActivityIcon from '../activities/ActivityIcon'
import { Label } from 'semantic-ui-react'

const Profile = ({ currentUser, events, activities }) => {
  const renderEvents = () => {
    return events.map((event) => <Event key={event.id} event={event} />)
  }

  const activityNames = activities.map((activity) => activity.attributes.name)
  const countedNames = activityNames.reduce(function (allNames, name) {
    if (name in allNames) {
      allNames[name]++
    } else {
      allNames[name] = 1
    }
    return allNames
  }, {})

  const renderFavActivities = () => {
    const uniqActivityNames = activityNames.filter(
      (value, index, self) => self.indexOf(value) === index
    )
    const sorted = uniqActivityNames.sort((a, b) => {
      return countedNames[b] - countedNames[a]
    })
    return sorted.map((activity, index) => (
      <Label>
        <ActivityIcon key={index} activity={activity} />
        <Label.Detail>{countedNames[activity]}</Label.Detail>
      </Label>
    ))
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h3>{currentUser.attributes.username}</h3>
      <h3>Your Favorite Activities</h3>
      {renderFavActivities()}
      <h3>Your Events</h3>
      {renderEvents()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    events: selectCurrentUserEvents(state),
    activities: selectCurrentUserActivities(state),
  }
}

export default connect(mapStateToProps)(Profile)
