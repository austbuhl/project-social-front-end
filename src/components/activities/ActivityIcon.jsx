import React from 'react'

const ActivityIcon = ({ activity }) => {
  // need icons for every activity - font awesome?
  const icons = {
    Handball: 'hand spock outline icon',
    Basketball: 'basketball ball icon',
    Tennis: 'table tennis icon',
    Barbecue: 'fire icon',
  }

  return <i className={icons[activity.name]}></i>
}

export default ActivityIcon
