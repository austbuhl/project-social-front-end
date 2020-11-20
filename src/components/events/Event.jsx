import React from 'react'
import ActivityIcon from '../activities/ActivityIcon'
import { NavLink } from 'react-router-dom'
import { Item, Button, Icon } from 'semantic-ui-react'

const Event = ({ event }) => {
  let uniqActivities = event.activities
    .map((activity) => activity.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return uniqActivities.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <Item>
      <Item.Content>
        <Item.Header>{event.name}</Item.Header>
        <Item.Meta>{event.num_of_people}</Item.Meta>
        <Item.Description>{event.description}</Item.Description>
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
