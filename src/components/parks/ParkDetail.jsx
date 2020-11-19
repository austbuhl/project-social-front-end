import React from 'react'
import Activity from '../activities/Activity'

const ParkDetail = ({ park }) => {
  const activities = [...new Set(park.activities)]
  console.log(activities)
  const renderActivities = () => {
    return activities.map((activity) => (
      <Activity key={activity.id} activity={activity} />
    ))
  }

  return (
    <div>
      <h1>{park.name}</h1>
      <h4>{park.location}</h4>
      <a href={park.website} target='_blank'>
        {park.website}
      </a>
      <h3>Available Activities</h3>
      {renderActivities()}
    </div>
  )
}

export default ParkDetail
