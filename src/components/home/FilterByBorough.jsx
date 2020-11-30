import React from 'react'
import { Select, Form } from 'semantic-ui-react'

const FilterByBorough = ({ filterHandler, filterValue }) => {
  const options = [
    { key: 'All', value: 'All', text: 'All' },
    { key: 'X', value: 'X', text: 'Bronx' },
    { key: 'B', value: 'B', text: 'Brooklyn' },
    { key: 'M', value: 'M', text: 'Manhattan' },
    { key: 'Q', value: 'Q', text: 'Queens' },
    { key: 'R', value: 'R', text: 'Staten Island' },
  ]

  return (
    <Form>
      <Form.Dropdown
        inline
        placeholder='Filter by Borough'
        selection
        label='Filter by Borough'
        options={options}
        value={filterValue}
        onChange={(e, { value }) => filterHandler(e, value)}
      />
    </Form>
  )
}

export default FilterByBorough
