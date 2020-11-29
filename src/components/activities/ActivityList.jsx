import React, { useState } from 'react'
import { connect } from 'react-redux'
import Activity from './Activity'
import { selectParkActivities } from '../../redux/selectors'
import { Accordion } from 'semantic-ui-react'

const ActivityList = ({ park, parkActivities }) => {
  const activities = parkActivities(park.id)
  const [active, setActive] = useState('')

  const clickHandler = (activityName) => {
    setActive(activityName)
  }
  const activityNames = activities
    .map((activity) => activity.attributes.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivities = () => {
    const groupedActivities = activityNames.map((name) => {
      return activities.filter((activity) => activity.attributes.name === name)
    })
    return groupedActivities.map((activities) => {
      const name = activities[0].attributes.name
      return (
        <Activity
          key={name}
          title={name}
          activities={activities}
          active={name === active}
          clickHandler={clickHandler}
        />
      )
    })
  }

  return <Accordion styled>{renderActivities()}</Accordion>
}

const mapStateToProps = (state) => {
  return {
    parkActivities: selectParkActivities(state),
  }
}

export default connect(mapStateToProps)(ActivityList)
