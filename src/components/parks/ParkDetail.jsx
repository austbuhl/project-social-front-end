import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Activity from '../activities/Activity'
import EventForm from '../events/EventForm'
import Event from '../events/Event'
import { Button, Item, Grid, Container } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { selectParkActivities, selectParkEvents } from '../../redux/selectors'
import { StreetViewPanorama, GoogleMap } from '@react-google-maps/api'

const ParkDetail = ({ park, currentUser, parkActivities, parkEvents }) => {
  const [showForm, setShowForm] = useState(false)
  const history = useHistory()
  const activities = parkActivities(park.id)
  const events = parkEvents(park.id)

  const mapContainerStyle = {
    width: '500px',
    height: '500px',
  }

  const renderActivities = () => {
    return activities.map((activity) => (
      <Activity key={activity.id} activity={activity} />
    ))
  }
  const renderEvents = () => {
    return events.map((event) => <Event key={event.id} event={event} />)
  }
  const clickHandler = () => {
    currentUser
      ? setShowForm(true)
      : history.push('/login', history.location.pathname)
  }

  return (
    <Container>
      <Grid>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <h1>{park.attributes.name}</h1>
            <h4>{park.attributes.location}</h4>
            <a href={park.attributes.website} target='_blank'>
              {park.attributes.website}
            </a>
            <h3>Available Activities</h3>
            {renderActivities()}
          </Grid.Column>
          <Grid.Column>
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
            <h3>Upcoming Events</h3>
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
