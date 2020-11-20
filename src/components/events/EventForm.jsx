import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Button } from 'semantic-ui-react'
import { createEvent } from '../../redux/actions'

const EventForm = ({ park, createEvent }) => {
  const initialState = {
    name: '',
    description: '',
    num_of_people: '',
    date: '',
    time: '',
    park_id: park.id,
    activities: [],
  }

  const [eventData, setEventData] = useState(initialState)

  const submitHandler = (e) => {
    e.preventDefault()
    createEvent(eventData)
    setEventData(initialState)
  }

  const options = park.activities.map((activity) => ({
    key: activity.name,
    value: activity.name,
    text: activity.name,
  }))

  console.log(eventData)
  return (
    <Form
      onChange={(e) =>
        setEventData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
      onSubmit={submitHandler}
    >
      <Header>Create an Event</Header>
      <Form.Field>
        <Form.Group widths='equal'>
          <Form.Input
            label='Event Name'
            name='name'
            placeholder='Event Name'
            value={eventData.name}
          />
          <Form.Input
            readOnly
            label='Location'
            name='park'
            placeholder='Location'
            value={park.name}
          />
          <Form.Dropdown
            fluid
            onChange={(e, { value }) =>
              setEventData((prevState) => ({
                ...prevState,
                activities: value,
              }))
            }
            multiple
            selection
            name='activities'
            label='Select Activities'
            options={options}
            values={eventData.activities}
            placeholder='Select your Activity'
          />
        </Form.Group>
        <Form.TextArea
          label='Description'
          name='description'
          placeholder='Event Description'
          value={eventData.description}
        />
        <Form.Group widths='equal'>
          <Form.Input
            type='number'
            label='Number of People'
            name='num_of_people'
            placeholder='Number of People'
            value={eventData.num_of_people}
          />
          <Form.Input
            type='date'
            label='Date'
            name='date'
            value={eventData.date}
          />
          <Form.Input
            type='time'
            label='Time'
            name='time'
            value={eventData.time}
          />
        </Form.Group>
      </Form.Field>

      <Button
        content='Create Event'
        labelPosition='left'
        icon='calendar check outline'
        primary
      />
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (eventObj) => dispatch(createEvent(eventObj)),
  }
}

export default connect(null, mapDispatchToProps)(EventForm)
