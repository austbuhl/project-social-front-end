import React from 'react'
import EventsList from './EventsList'
import Filter from '../components/map/Filter'
import Map from '../components/map/Map'
import { Grid, Segment } from 'semantic-ui-react'

const Home = () => {
  return (
    <Grid container fluid padded>
      <Grid.Column width={1}>
        <Filter />
      </Grid.Column>
      <Grid.Column width={10}>
        <Map />
      </Grid.Column>
      <Grid.Column width={5}>
        <EventsList />
      </Grid.Column>
    </Grid>
  )
}

export default Home
