import React from 'react'
import { MdGpsFixed } from 'react-icons/md'
import { Button } from 'semantic-ui-react'

const Locate = ({ panTo }) => {
  return (
    <Button
      className='locate'
      secondary
      inverted
      size='large'
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
      icon={<MdGpsFixed />}
    ></Button>
  )
}

export default Locate
