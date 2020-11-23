import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Activity from '../activities/Activity'
import EventForm from '../events/EventForm'
import Event from '../events/Event'
import { Button, Item, Grid, Container, Modal } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { selectParkActivities, selectParkEvents } from '../../redux/selectors'
import { StreetViewPanorama, GoogleMap } from '@react-google-maps/api'
import Paginate from '../home/Paginate'

const ParkDetail = ({ park, loggedIn, parkActivities, parkEvents }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const activities = parkActivities(park.id)
  const events = parkEvents(park.id)
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
    loggedIn ? setOpen(true) : history.push('/login', history.location.pathname)
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
            <br />

            <Modal
              onClose={() => setOpen(false)}
              onOpen={clickHandler}
              open={open}
              trigger={
                <Button animated='fade' secondary>
                  <Button.Content visible>Create an Event</Button.Content>
                  <Button.Content hidden>
                    {loggedIn ? 'Show Form' : 'Login'}
                  </Button.Content>
                </Button>
              }
            >
              <EventForm park={park} />
            </Modal>
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
          <Grid.Column width={5}>
            <h3>Upcoming Events</h3>
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
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    parkActivities: selectParkActivities(state),
    parkEvents: selectParkEvents(state),
  }
}

export default connect(mapStateToProps)(ParkDetail)
