import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import ActivityIcon from '../activities/ActivityIcon'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dimmer, Loader, Segment, Grid } from 'semantic-ui-react'
import { selectParks, selectParkActivities } from '../../redux/selectors'
import Search from './Search'
import Locate from './Locate'

import '@reach/combobox/styles.css'

const Map = ({ parks, selectedActivity, parkActivities, mapDragHandler }) => {
  const [selectedPark, setSelectedPark] = useState(null)
  const [loading, setLoading] = useState(true)

  const mapContainerStyle = {
    width: '100%',
    height: '85vh',
    // height: '850px',
  }
  const center = {
    lat: 40.73061,
    lng: -73.935242,
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }
  const libraries = ['places']

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const mapRef = React.useRef()
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  }, [])

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  useEffect(() => {
    if (parks.length > 0) {
      setLoading(false)
    }
  }, [parks])

  const filteredParks = selectedActivity
    ? parks.filter((park) => {
        if (
          parkActivities(park.id).some(
            (activity) => activity.attributes.name === selectedActivity
          )
        ) {
          return park
        }
      })
    : parks

  const renderParks = () => {
    return filteredParks.map((park) => {
      return (
        <Marker
          key={park.id}
          position={{
            lat: parseFloat(park.attributes.latitude),
            lng: parseFloat(park.attributes.longitude),
          }}
          onClick={() => setSelectedPark(park)}
        />
      )
    })
  }

  const activities = selectedPark ? parkActivities(selectedPark.id) : []
  const activityNames = activities
    .map((activity) => activity.attributes.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return activityNames.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  const dragHandler = () => {
    // const currentLat = mapRef.current.center.lat()
    // const currentLong = mapRef.current.center.lng()
    // mapDragHandler(currentLat, currentLong)
  }

  if (loadError) return 'Error'
  if (!isLoaded) return 'Loading...'
  console.log(center)
  return (
    <Segment>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={onMapLoad}
        onDrag={dragHandler}
        options={options}
      >
        <Grid.Column width={10}>
          <Dimmer active={loading}>
            <Loader />
            {renderParks()}
            {selectedPark && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedPark.attributes.latitude),
                  lng: parseFloat(selectedPark.attributes.longitude),
                }}
                onCloseClick={() => setSelectedPark(null)}
                // options={{ disableAutoPan: true }}
              >
                <div>
                  <h4>{selectedPark.attributes.name}</h4>
                  <p>{selectedPark.attributes.location}</p>
                  <a href={selectedPark.attributes.website} target='_blank'>
                    {selectedPark.attributes.website}
                  </a>
                  <div>{renderActivityIcons()}</div>
                  <NavLink to={`/parks/${selectedPark.id}`}>More Info</NavLink>
                </div>
              </InfoWindow>
            )}
          </Dimmer>
        </Grid.Column>
      </GoogleMap>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    parks: selectParks(state),
    selectedActivity: state.selectedActivity,
    parkActivities: selectParkActivities(state),
  }
}

export default connect(mapStateToProps)(Map)
