import React from 'react'
import ActivityIcon from '../activities/ActivityIcon'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Item, Button, Icon } from 'semantic-ui-react'
import { selectEventActivities, selectEventPark } from '../../redux/selectors'

const Event = ({ event, eventActivities, eventLocation }) => {
  const park = eventLocation(event.id)
  const activities = eventActivities(event.id)

  const activityNames = activities
    .map((activity) => activity.attributes.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return activityNames.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }
  if (!park) {
    console.log(event)
  }
  return (
    <Item>
      <Item.Content>
        <Item.Header>{event.attributes.name}</Item.Header>
        <Item.Meta>{park ? park.attributes.name : null}</Item.Meta>
        <Item.Description>{event.attributes.description}</Item.Description>
        <Item.Extra>
          <NavLink to={`/events/${event.id}`}>
            <Button primary floated='right' animated>
              <Button.Content visible>More Info</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </NavLink>
          {renderActivityIcons()}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

const mapStateToProps = (state) => {
  return {
    eventActivities: selectEventActivities(state),
    eventLocation: selectEventPark(state),
  }
}

export default connect(mapStateToProps)(Event)
