import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Modal } from 'semantic-ui-react'
import { createEvent } from '../../redux/actions'
import { selectParkActivities } from '../../redux/selectors'

const EventForm = ({ park, createEvent, selectParkActivities }) => {
  const initialState = {
    name: '',
    description: '',
    num_of_people: '',
    date: '',
    time: '',
    park_id: park ? park.id : null,
    activities: [],
  }

  const [eventData, setEventData] = useState(initialState)
  // const parks =

  const activities = park ? selectParkActivities(park.id) : []
  // const activities = useSelector((state) =>
  //   selectParkActivities(state)(park.id)
  // )

  const submitHandler = (e) => {
    e.preventDefault()
    createEvent(eventData)
    setEventData(initialState)
  }

  const options = activities.map((activity) => ({
    key: activity.id,
    value: activity.attributes.name,
    text: activity.attributes.name,
  }))

  return (
    <>
      <Modal.Header>Create an Event</Modal.Header>
      <Modal.Content>
        <Form
          onChange={(e) =>
            setEventData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
          onSubmit={submitHandler}
        >
          <Form.Field>
            <Form.Group widths='equal'>
              <Form.Input
                required
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
                value={park ? park.attributes.name : null}
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
              required
              label='Description'
              name='description'
              placeholder='Event Description'
              value={eventData.description}
            />
            <Form.Group widths='equal'>
              <Form.Input
                required
                type='number'
                label='Number of People'
                name='num_of_people'
                placeholder='Number of People'
                value={eventData.num_of_people}
              />
              <Form.Input
                required
                type='date'
                label='Date'
                name='date'
                value={eventData.date}
              />
              <Form.Input
                required
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
            style={{ width: '350px', marginLeft: '235px' }}
            // fluid
          />
        </Form>
      </Modal.Content>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    selectParkActivities: selectParkActivities(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (eventObj) => dispatch(createEvent(eventObj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
