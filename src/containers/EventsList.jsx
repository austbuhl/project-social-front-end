import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { sortByDistance } from 'sort-by-distance'
import Event from '../components/events/Event'
import EventDetail from '../components/events/EventDetail'
import Filter from '../components/home/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import Paginate from '../components/home/Paginate'
import FilterByBorough from '../components/home/FilterByBorough'
import {
  selectEvents,
  selectEvent,
  selectEventPark,
  selectEventActivities,
} from '../redux/selectors'

const EventsList = ({
  events,
  selectEvent,
  selectEventPark,
  selectedActivity,
  eventActivities,
  activitiesLoaded,
  mapLat,
  mapLong,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterValue, setFilterValue] = useState(null)
  const eventsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedActivity])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterValue])

  const boroughFilterHandler = (e, value) => {
    setFilterValue(value)
  }

  const filteredEvents =
    selectedActivity.length > 0
      ? events.filter((event) => {
          if (
            selectedActivity.every((selected) =>
              eventActivities(event.id).find(
                (activity) => activity.attributes.name === selected
              )
            )
            // eventActivities(event.id).some(
            //   (activity) => activity.attributes.name === selectedActivity
            // )
          ) {
            return event
          }
        })
      : events

  const filteredBorough =
    filterValue && filterValue !== 'All'
      ? filteredEvents.filter((event) => {
          const park = selectEventPark(event.id)
          return park.attributes.nycParkId[0] === filterValue
        })
      : filteredEvents

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const radlon1 = (Math.PI * lon1) / 180
    const radlon2 = (Math.PI * lon2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist
  }

  const eventsPlusDistance = activitiesLoaded
    ? filteredBorough.map((event) => {
        const park = selectEventPark(event.id)
        const parkLat = park.attributes.latitude
        const parkLong = park.attributes.longitude
        const distance = calculateDistance(parkLat, parkLong, mapLat, mapLong)
        return {
          ...event,
          distance,
        }
      })
    : null

  const eventsSortedByDistance = eventsPlusDistance
    ? eventsPlusDistance.sort((a, b) => a.distance - b.distance)
    : []

  const totalPages = Math.ceil(eventsSortedByDistance.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage

  const renderEvents = () => {
    return eventsSortedByDistance
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <h4>
                Active Filter:
                {selectedActivity.length > 0 ? selectedActivity : 'All'}
              </h4>
              <FilterByBorough
                filterHandler={boroughFilterHandler}
                filterValue={filterValue}
              />
            </div>
            <Item.Group divided>{renderEvents()}</Item.Group>
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
            Active Filter:
            {selectedActivity.length > 0 ? selectedActivity : 'All'}
          </h4>
          <Grid.Row>
            <Item.Group divided>{renderEvents()}</Item.Group>
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
    selectEventPark: selectEventPark(state),
    selectedActivity: state.selectedActivity,
    eventActivities: selectEventActivities(state),
    activitiesLoaded: state.activitiesLoaded,
  }
}

export default withRouter(connect(mapStateToProps)(EventsList))
