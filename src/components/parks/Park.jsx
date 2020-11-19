import React from 'react'
import ActivityIcon from '../activities/ActivityIcon'
import { NavLink } from 'react-router-dom'

const Park = ({ park }) => {
  // const activities = [...new Set(park.activities)]
  const activities = park.activities.reduce((accum, current) => {
    if (accum.find((act) => act.name === current.name)) {
      return accum
    } else {
      return accum.push(current)
    }
  }, [])

  console.log(activities)
  const renderActivityIcons = () => {
    return activities.map((activity) => (
      <ActivityIcon key={activity.id} activity={activity} />
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
          {/* {renderActivityIcons()} */}
        </div>
      </div>
    </div>
  )
}

export default Park
