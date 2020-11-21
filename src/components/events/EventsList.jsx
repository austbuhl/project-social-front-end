import React from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import EventDetail from './EventDetail'
import Filter from '../map/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'

const EventsList = (props) => {
  const filteredEvents = props.selectedActivity
    ? props.events.filter((event) => {
        if (
          event.event_activities.some(
            (activity) => activity.name === props.selectedActivity
          )
        ) {
          return event
        }
      })
    : props.events

  const renderEvents = () => {
    return filteredEvents.map((event) => <Event key={event.id} event={event} />)
  }

  return (
    <Switch>
      <Route
        path='/events/:id'
        render={(routerProps) => {
          const eventId = parseInt(routerProps.match.params.id)
          const event = props.events.find((e) => e.id === eventId)
          return <EventDetail event={event} />
        }}
      />

      <Route path='/events'>
        <Grid container padded centered>
          <Filter />
          <Grid.Column width={10} textAlign='center'>
            <h1>Events List Here</h1>
            <Item.Group divided relaxed>
              {renderEvents()}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    selectedActivity: state.selectedActivity,
  }
}

export default withRouter(connect(mapStateToProps)(EventsList))
