import React from 'react'
import ActivityIcon from '../activities/ActivityIcon'
import { NavLink } from 'react-router-dom'

const Park = ({ park }) => {
  let uniqActivities = park.activities
    .map((activity) => activity.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  const renderActivityIcons = () => {
    return uniqActivities.map((activity, index) => (
      <ActivityIcon key={index} activity={activity} />
    ))
  }

  return (
    <div className='item'>
      <div className='content'>
        <a className='header'>{park.name}</a>
        <div className='meta'>
          <span className='cinema'>{park.location}</span>
        </div>
        <div className='description'>
          <a href={park.website} target='_blank'>
            {park.website}
          </a>
        </div>
        <div className='extra'>
          <NavLink to={`/parks/${park.id}`}>
            <div className='ui right floated primary button'>
              More Info
              <i className='right chevron icon'></i>
            </div>
          </NavLink>
          {renderActivityIcons()}
        </div>
      </div>
    </div>
  )
}

export default Park
