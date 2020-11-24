import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  selectCurrentUser,
  selectCurrentUserEvents,
  selectCurrentUserActivities,
} from '../../redux/selectors'
import Event from '../events/Event'
import Paginate from '../home/Paginate'
import ActivityIcon from '../activities/ActivityIcon'
import { Grid, Item, Label } from 'semantic-ui-react'

const Profile = ({ currentUser, events, activities }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 3
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage

  const renderEvents = () => {
    return events
      .slice(indexOfFirstEvent, indexOfLastEvent)
      .map((event) => <Event key={event.id} event={event} />)
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
    <Grid container padded centered>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <h1>Profile Page</h1>
          <h3>{currentUser.attributes.username}</h3>
          <h3>Your Favorite Activities</h3>
          {renderFavActivities()}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={5}>
          <h3>Your Events</h3>
        </Grid.Column>
        <Grid.Column width={5}>
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            floated='right'
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <Item.Group divided relaxed>
            {renderEvents()}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
