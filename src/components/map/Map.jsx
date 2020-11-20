import React, { useState } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  StreetViewPanorama,
} from '@react-google-maps/api'
import ActivityIcon from '../activities/ActivityIcon'
import { connect } from 'react-redux'

const Map = ({ parks, selectedActivity }) => {
  const [selectedPark, setSelectedPark] = useState(null)

  const mapContainerStyle = {
    width: '40vw',
    height: '100vh',
  }
  const center = {
    lat: 40.73061,
    lng: -73.935242,
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  const filteredParks = selectedActivity
    ? parks.filter((park) => {
        if (
          park.activities.some((activity) => activity.name === selectedActivity)
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
            lat: parseFloat(park.latitude),
            lng: parseFloat(park.longitude),
          }}
          onClick={() => setSelectedPark(park)}
        />
      )
    })
  }

  let uniqActivities = selectedPark
    ? selectedPark.activities
        .map((activity) => activity.name)
        .filter((value, index, self) => self.indexOf(value) === index)
    : null

  const renderActivityIcons = () => {
    return uniqActivities.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
        <h4 className='active-filter'>
          Active Filter: {selectedActivity || 'All'}
        </h4>
        {renderParks()}
        {selectedPark && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedPark.latitude),
              lng: parseFloat(selectedPark.longitude),
            }}
            onCloseClick={() => setSelectedPark(null)}
          >
            <div>
              <h4>{selectedPark.name}</h4>
              <p>{selectedPark.location}</p>
              <a href={selectedPark.website} target='_blank'>
                {selectedPark.website}
              </a>
              <div>{renderActivityIcons()}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

const mapStateToProps = (state) => {
  return {
    parks: state.parks,
    selectedActivity: state.selectedActivity,
  }
}

export default connect(mapStateToProps)(Map)
