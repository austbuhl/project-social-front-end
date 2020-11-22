import React from 'react'
import ActivityIcon from '../activities/ActivityIcon'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {selectEventActivities} from '../../redux/selectors'
import { Item, Button, Icon } from 'semantic-ui-react'

const Event = ({ event }) => {

  const activities = useSelector(state => selectEventActivities(state)(event.id))
  const activityNames = activities.map(activity => activity.attributes.name).filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return activityNames.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <Item>
      <Item.Content>
        <Item.Header>{event.attributes.name}</Item.Header>
        <Item.Meta>{event.attributes.num_of_people}</Item.Meta>
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

export default Event
