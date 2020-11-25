import React from 'react'
import ActivityIcon from './ActivityIcon'
import { Accordion, Icon } from 'semantic-ui-react'

const Activity = ({ title, activities, active, clickHandler }) => {
  const renderActivityContent = () => {
    return activities.map((activity) => {
      return (
        <Accordion.Content active={active}>
          <p>{activity.attributes.addlDetail}</p>
        </Accordion.Content>
      )
    })
  }
  const renderActivityIcon = () => {
    return <ActivityIcon activity={title} />
  }

  const localClickHandler = () => {
    if (active) {
      clickHandler(null)
    } else if (activities.find((activity) => activity.attributes.addlDetail)) {
      clickHandler(title)
    }
  }

  return (
    <>
      <Accordion.Title active={active} onClick={localClickHandler}>
        {/* <Icon name='dropdown' /> */}
        {renderActivityIcon()}
        {title}
      </Accordion.Title>
      {renderActivityContent()}
    </>
  )
}

export default Activity
