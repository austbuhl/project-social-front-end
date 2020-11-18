import React, { useState } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  StreetViewPanorama,
} from '@react-google-maps/api'
import { connect } from 'react-redux'

const Map = ({ parks }) => {
  const [selectedPark, setSelectedPark] = useState(null)

  const mapContainerStyle = {
    width: '50vw',
    height: '90vh',
  }
  const center = {
    lat: 40.73061,
    lng: -73.935242,
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  const renderParks = () => {
    return parks.map((park) => {
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

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
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
  }
}

export default connect(mapStateToProps)(Map)
