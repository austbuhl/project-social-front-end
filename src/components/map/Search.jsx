import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'

const Search = ({ panTo }) => {
  const center = {
    lat: 40.73061,
    lng: -73.935242,
  }

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => center.lat, lng: () => center.lng },
      // distance in meters
      radius: 200 * 1000,
    },
  })

  return (
    <Combobox
      onSelect={async (address) => {
        setValue(address, false)
        clearSuggestions()

        try {
          const results = await getGeocode({ address })
          const { lat, lng } = await getLatLng(results[0])
          panTo({ lat, lng })
        } catch (error) {
          console.log(error)
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder='Enter an address'
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
export default Search
