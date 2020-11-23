import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Activity from '../activities/Activity'
import EventForm from '../events/EventForm'
import Event from '../events/Event'
import { Button, Item, Grid, Container } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { selectParkActivities, selectParkEvents } from '../../redux/selectors'
import { StreetViewPanorama, GoogleMap } from '@react-google-maps/api'
import Paginate from '../home/Paginate'

const ParkDetail = ({ park, currentUser, parkActivities, parkEvents }) => {
  const [showForm, setShowForm] = useState(false)
  const history = useHistory()
  const activities = parkActivities(park.id)
  const events = parkEvents(park.id)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 3

  const mapContainerStyle = {
    width: '400px',
    height: '400px',
  }

  const renderActivities = () => {
    return activities.map((activity) => (
      <Activity key={activity.id} activity={activity} />
    ))
  }
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const renderEvents = () => {
    return events
      .slice(indexOfFirstEvent, indexOfLastEvent)
      .map((event) => <Event key={event.id} event={event} />)
  }
  const clickHandler = () => {
    currentUser
      ? setShowForm(true)
      : history.push('/login', history.location.pathname)
  }

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <h1>{park.attributes.name}</h1>
            <h4>{park.attributes.location}</h4>
            <a href={park.attributes.website} target='_blank'>
              {park.attributes.website}
            </a>
            <h3>Available Activities</h3>
            {renderActivities()}
          </Grid.Column>
          <Grid.Column width={6}>
            <GoogleMap mapContainerStyle={mapContainerStyle}>
              <StreetViewPanorama
                position={{
                  lat: parseFloat(park.attributes.latitude),
                  lng: parseFloat(park.attributes.longitude),
                }}
                visible
              />
            </GoogleMap>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <h3>
              Upcoming Events
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                floated='right'
              />{' '}
            </h3>
            <Item.Group divided relaxed>
              {renderEvents()}
            </Item.Group>

            <Button animated='fade' secondary onClick={clickHandler}>
              <Button.Content visible>Create an Event</Button.Content>
              <Button.Content hidden>
                {currentUser ? 'Show Form' : 'Login'}
              </Button.Content>
            </Button>
            {showForm && <EventForm park={park} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    parkActivities: selectParkActivities(state),
    parkEvents: selectParkEvents(state),
  }
}

export default connect(mapStateToProps)(ParkDetail)
