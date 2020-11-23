import React from 'react'
import { connect } from 'react-redux'
import Event from '../components/events/Event'
import EventDetail from '../components/events/EventDetail'
import Filter from '../components/map/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import {
  selectEvents,
  selectEvent,
  selectEventActivities,
} from '../redux/selectors'

const EventsList = ({
  events,
  selectEvent,
  selectedActivity,
  eventActivities,
}) => {
  const filteredEvents = selectedActivity
    ? events.filter((event) => {
        if (
          eventActivities(event.id).some(
            (activity) => activity.attributes.name === selectedActivity
          )
        ) {
          return event
        }
      })
    : events

  const renderEvents = () => {
    return filteredEvents.map((event) => {
      return <Event key={event.id} event={event} />
    })
  }

  return (
    <Switch>
      <Route
        path='/events/:id'
        render={({ match }) => {
          const event = selectEvent(parseInt(match.params.id))
          return <EventDetail event={event} />
        }}
      />

      <Route path='/events'>
        <Grid container padded centered>
          <Grid.Column width={1}>
            <Filter />
          </Grid.Column>
          <Grid.Column width={10}>
            <h1>Events List Here</h1>
            <Item.Group divided relaxed>
              {renderEvents()}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Route>

      <Route path='/'>
        <h1>Events List Here</h1>
        <Item.Group divided relaxed>
          {renderEvents()}
        </Item.Group>
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    events: selectEvents(state),
    selectEvent: selectEvent(state),
    selectedActivity: state.selectedActivity,
    eventActivities: selectEventActivities(state),
  }
}

export default withRouter(connect(mapStateToProps)(EventsList))
