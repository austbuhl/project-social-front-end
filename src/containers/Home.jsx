import React, { useState } from 'react'
import EventsList from './EventsList'
import Filter from '../components/home/Filter'
import Map from '../components/home/Map'
import { Grid } from 'semantic-ui-react'

const Home = () => {
  const [mapLat, setMapLat] = useState(0)
  const [mapLong, setMapLong] = useState(0)

  const mapDragHandler = (lat, long) => {
    setMapLat(lat)
    setMapLong(long)
  }

  return (
    <Grid container fluid padded>
      <Grid.Column width={1}>
        <Filter />
      </Grid.Column>
      <Grid.Column width={10}>
        <Map mapDragHandler={mapDragHandler} />
      </Grid.Column>
      <Grid.Column width={5}>
        <EventsList mapLat={mapLat} mapLong={mapLong} />
      </Grid.Column>
    </Grid>
  )
}

export default Home
