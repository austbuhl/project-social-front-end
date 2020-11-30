import React, { useEffect } from 'react'
import moment from 'moment'
import ActivityIcon from '../activities/ActivityIcon'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Item, Button, Icon } from 'semantic-ui-react'
import { selectEventActivities, selectEventPark } from '../../redux/selectors'

const Event = ({ event, eventLocation, activities }) => {
  const park = eventLocation(event.id)
  const date = moment.utc(event.attributes.date).format('ddd, MMM Do, YYYY')
  const boroughs = {
    X: 'Bronx',
    B: 'Brooklyn',
    M: 'Manhattan',
    Q: 'Queens',
    R: 'Staten Island',
  }
  const borough = park ? boroughs[park.attributes.nycParkId[0]] : null

  const activityNames = activities
    ? activities
        .map((activity) => activity.attributes.name)
        .filter((value, index, self) => self.indexOf(value) === index)
    : []
  const renderActivityIcons = () => {
    return activityNames.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <Item style={{ padding: 'none' }}>
      <Item.Content>
        <Item.Header>{event.attributes.name}</Item.Header>
        <Item.Meta>
          {park ? `${park.attributes.name} - ${borough}` : null}
        </Item.Meta>
        <Item.Meta>{date}</Item.Meta>

        <Item.Description>{event.attributes.description}</Item.Description>

        <Item.Extra>
          {activities ? renderActivityIcons() : null}{' '}
          <NavLink to={`/events/${event.id}`}>
            <Button primary floated='right' animated size='small'>
              <Button.Content visible>More Info</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </NavLink>
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
