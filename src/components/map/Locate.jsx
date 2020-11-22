import React from 'react'

const Locate = ({ panTo }) => {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          () => null
        )
      }}
    >
      GEOLOCATE
    </button>
  )
}

export default Locate
