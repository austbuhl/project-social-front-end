import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Event from '../components/events/Event'
import EventDetail from '../components/events/EventDetail'
import Filter from '../components/home/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import Paginate from '../components/home/Paginate'
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
  activitiesLoaded,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedActivity])

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

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage

  const renderEvents = () => {
    return filteredEvents
      .slice(indexOfFirstEvent, indexOfLastEvent)
      .map((event) => {
        const activities = activitiesLoaded ? eventActivities(event.id) : null
        return <Event key={event.id} event={event} activities={activities} />
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
            <h1>
              Events Near You
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                floated='right'
              />
            </h1>
            <h4>Active Filter: {selectedActivity || 'All'}</h4>
            <Item.Group divided relaxed>
              {renderEvents()}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Route>

      <Route path='/'>
        <Grid centered divided>
          <Grid.Row>
            <h2>Events Near You</h2>
          </Grid.Row>
          <Grid.Row>
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </Grid.Row>
          <h4 style={{ marginTop: 0 }}>
            Active Filter: {selectedActivity || 'All'}
          </h4>
          <Grid.Row>
            <Item.Group divided relaxed>
              {renderEvents()}
            </Item.Group>
          </Grid.Row>
        </Grid>
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
    activitiesLoaded: state.activitiesLoaded,
  }
}

export default withRouter(connect(mapStateToProps)(EventsList))
