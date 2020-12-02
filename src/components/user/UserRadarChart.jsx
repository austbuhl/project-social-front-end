import React from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  PolarRadiusAxis,
} from 'recharts'

const UserRadarChart = ({
  username,
  currentUsername,
  currentUserActivities,
  userActivities,
}) => {
  const userActivityNames = userActivities.map(
    (activity) => activity.attributes.name
  )
  const userCountedNames = userActivityNames.reduce(function (allNames, name) {
    if (name in allNames) {
      allNames[name]++
    } else {
      allNames[name] = 1
    }
    return allNames
  }, {})

  const currentUserActivityNames = currentUserActivities.map(
    (activity) => activity.attributes.name
  )
  const currentUserCountedNames = currentUserActivityNames.reduce(function (
    allNames,
    name
  ) {
    if (name in allNames) {
      allNames[name]++
    } else {
      allNames[name] = 1
    }
    return allNames
  },
  {})

  const createData = () => {
    const userUniqActivityNames = userActivityNames.filter(
      (value, index, self) => self.indexOf(value) === index
    )
    const userSorted = userUniqActivityNames.sort((a, b) => {
      return userCountedNames[b] - userCountedNames[a]
    })

    return userSorted.map((activity) => {
      return {
        name: activity,
        userCount: userCountedNames[activity],
        currentUserCount: currentUserCountedNames[activity] || 0,
      }
    })
  }

  console.log(createData())

  return (
    <RadarChart outerRadius={90} width={350} height={250} data={createData()}>
      <PolarGrid />
      <PolarAngleAxis dataKey='name' />
      {/* <PolarRadiusAxis angle={30} domain={['auto', 'auto']} /> */}
      {username !== currentUsername && (
        <Radar
          name={username}
          dataKey='userCount'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
      )}
      <Radar
        name={currentUsername}
        dataKey='currentUserCount'
        stroke='#82ca9d'
        fill='#82ca9d'
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  )
}

export default UserRadarChart
