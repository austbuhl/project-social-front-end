import React from 'react'
import ActivityIcon from './ActivityIcon'
import { Accordion, Icon } from 'semantic-ui-react'

const Activity = ({ title, activities, active, clickHandler }) => {
  const renderAddlDetail = (title, addlDetail) => {
    let detail
    switch (title) {
      case 'Art':
        detail = addlDetail.split(' - ')
        return (
          <a href={detail[1]} alt={detail[0]}>
            {addlDetail}
          </a>
        )
      case 'Barbecue':
        return (
          <p>
            <strong>Location: </strong> {addlDetail}
          </p>
        )
      case 'Basketball':
        return (
          <p>
            <strong>Number of Courts: </strong>
            {addlDetail}
          </p>
        )
      case 'Beach':
        return (
          <p>
            <strong>Description: </strong>
            {addlDetail}
          </p>
        )
      case 'Bocce':
        return null
      case 'Cricket':
        return (
          <p>
            <strong>Number of Fields: </strong>
            {addlDetail}
          </p>
        )
      case 'Dog Run':
        return (
          <p>
            <strong>Type: </strong>
            {addlDetail}
          </p>
        )
      case 'Handball':
        return (
          <p>
            <strong>Number of Courts: </strong>
            {addlDetail}
          </p>
        )
      case 'Hiking':
        detail = addlDetail.split(' - ')
        const length = detail[0]
        const difficulty = detail[1]

        return (
          <>
            <p>{length}</p>
            <p>{difficulty}</p>
          </>
        )
      case 'Horseback Riding':
        return (
          <p>
            <strong>Description: </strong>
            {addlDetail}
          </p>
        )
      case 'Ice Skating':
        return (
          <p>
            <strong>Type: </strong>
            {addlDetail}
          </p>
        )
      case 'Kayaking':
        return (
          <p>
            <strong>Hours: </strong>
            {addlDetail}
          </p>
        )
      case 'Nature Center':
        return (
          <p>
            <strong>Hours: </strong>
            {addlDetail}
          </p>
        )
      case 'Nature Preserve':
        return (
          <p>
            <strong>Habitat Type: </strong>
            {addlDetail}
          </p>
        )
      case 'Playground':
        return (
          <p>
            <strong>Level: </strong>
            {addlDetail}
          </p>
        )
      case 'Indoor Pool':
        return (
          <p>
            <strong>Type: </strong>
            {addlDetail}
          </p>
        )
      case 'Outdoor Pool':
        return (
          <p>
            <strong>Type: </strong>
            {addlDetail}
          </p>
        )

      case 'Running Track':
        return <p>{addlDetail}</p>
      case 'Tennis':
        return <p>{addlDetail}</p>
      case 'Zoo':
        return null
    }
  }

  const renderActivityContent = () => {
    return activities.map((activity) => {
      return (
        <Accordion.Content active={active}>
          {renderAddlDetail(title, activity.attributes.addlDetail)}
          {/* <p>{activity.attributes.addlDetail}</p> */}
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
