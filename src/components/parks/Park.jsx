import React from 'react'
import ActivityIcon from '../activities/ActivityIcon'
import { NavLink } from 'react-router-dom'
import { Item, Button, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { selectParkActivities } from '../../redux/selectors'

const Park = ({ park }) => {
  const boroughs = {
    X: 'Bronx',
    B: 'Brooklyn',
    M: 'Manhattan',
    Q: 'Queens',
    R: 'Staten Island',
  }
  const borough = park ? boroughs[park.attributes.nycParkId[0]] : null

  const activities = useSelector((state) =>
    selectParkActivities(state)(park.id)
  )
  const activityNames = activities
    .map((activity) => activity.attributes.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return activityNames.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <Item>
      <Item.Content>
        <Item.Header>{park.attributes.name}</Item.Header>
        <Item.Meta>{borough}</Item.Meta>
        <Item.Description>{park.attributes.description}</Item.Description>
        <Item.Extra>
          <NavLink to={`/parks/${park.id}`}>
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

export default Park
