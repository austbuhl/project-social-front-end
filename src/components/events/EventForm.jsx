import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Modal, Input } from 'semantic-ui-react'
import { createEvent } from '../../redux/actions'
import { selectParkActivities, selectParks } from '../../redux/selectors'

const EventForm = ({
  park,
  createEvent,
  selectParkActivities,
  selectedActivities,
  parks,
  setOpen,
}) => {
  const initialState = {
    name: '',
    description: '',
    num_of_people: '',
    date: '',
    time: '',
    park: '',
    park_id: '',
    activities: [],
  }

  const [eventData, setEventData] = useState(initialState)
  const filteredParks = !park
    ? parks.filter((park) => {
        if (
          selectedActivities.every((selected) =>
            selectParkActivities(park.id).find(
              (activity) => activity.attributes.name === selected
            )
          )
        ) {
          return park
        }
      })
    : parks

  const activityNames = park
    ? selectParkActivities(park.id)
        .map((activity) => activity.attributes.name)
        .filter((value, index, self) => self.indexOf(value) === index)
    : null

  const activities = park ? activityNames : selectedActivities

  useEffect(() => {
    if (!park) {
      setEventData((prevState) => ({
        ...prevState,
        activities: selectedActivities,
      }))
    } else {
      setEventData((prevState) => ({
        ...prevState,
        park: park.attributes.name,
        park_id: park.id,
      }))
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    const park_id = filteredParks.find(
      (park) => park.attributes.name === eventData.park
    ).id
    const eventInfo = { ...eventData }
    delete eventInfo.park
    eventInfo.park_id = park_id
    createEvent(eventInfo)
    setOpen(false)
    setEventData(initialState)
  }

  const options = park
    ? activities.map((activity, index) => ({
        key: index,
        value: activity,
        text: activity,
      }))
    : selectedActivities.map((activity, index) => ({
        key: index,
        value: activity,
        text: activity,
      }))

  const locations = () => {
    return filteredParks.map((park) => {
      return <option key={park.id} value={park.attributes.name} />
    })
  }

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
              {park ? (
                <Form.Input
                  readOnly
                  label='Location'
                  name='park'
                  placeholder='Location'
                  value={eventData.park}
                />
              ) : (
                <>
                  <Form.Input
                    label='Location'
                    list='locations'
                    placeholder='Location'
                    name='park'
                    value={eventData.park}
                  />
                  <datalist id='locations'>{locations()}</datalist>
                </>
              )}

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
                value={eventData.activities}
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
    parks: selectParks(state),
    selectParkActivities: selectParkActivities(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (eventObj) => dispatch(createEvent(eventObj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
