import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  StreetViewPanorama,
} from '@react-google-maps/api'
import ActivityIcon from '../activities/ActivityIcon'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dimmer, Loader, Segment, Grid } from 'semantic-ui-react'
import {selectActivities, selectParks, selectParkActivities} from '../../redux/selectors'

const Map = ({ parks, activities, selectedActivity, parkActivities }) => {
  const [selectedPark, setSelectedPark] = useState(null)
  const [loading, setLoading] = useState(true)

  const mapContainerStyle = {
    width: '40vw',
    height: '85vh',
  }
  const center = {
    lat: 40.73061,
    lng: -73.935242,
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  useEffect(() => {
    if (parks.length > 0) {
      setLoading(false)
    }
  }, [parks])


  const filteredParks = selectedActivity
    ? 
    parks.filter((park) => { 
        if (
          parkActivities(park.id).some((activity) => activity.attributes.name === selectedActivity)
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

  const uniqActivities = selectedPark
    ? parkActivities(selectedPark.id)
        .filter((value, index, self) => self.indexOf(value) === index)
    : null

  const renderActivityIcons = () => {
    return uniqActivities.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Segment>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={options}
        >
          <Grid.Column width={10}>
            <h4 className='active-filter'>
              Active Filter: {selectedActivity || 'All'}
            </h4>
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
                >
                  <div>
                    <h4>{selectedPark.attributes.name}</h4>
                    <p>{selectedPark.attributes.location}</p>
                    <a href={selectedPark.attributes.website} target='_blank'>
                      {selectedPark.attributes.website}
                    </a>
                    <div>{renderActivityIcons()}</div>
                    <NavLink to={`/parks/${selectedPark.id}`}>
                      More Info
                    </NavLink>
                  </div>
                </InfoWindow>
              )}
            </Dimmer>
          </Grid.Column>
        </GoogleMap>
      </Segment>
    </LoadScript>
  )
}

const mapStateToProps = (state) => {
  return {
    parks: selectParks(state),
    selectedActivity: state.selectedActivity,
    activities: selectActivities(state),
    parkActivities: selectParkActivities(state)
  }
}

export default connect(mapStateToProps)(Map)
