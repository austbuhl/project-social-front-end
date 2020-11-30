import React from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  PolarRadiusAxis,
} from 'recharts'

const UserRadarChart = ({ currentUserActivities, userActivities }) => {
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

    // const currentUserUniqActivityNames = currentUserActivityNames.filter(
    //   (value, index, self) => self.indexOf(value) === index
    // )
    // const currentUserSorted = currentUserUniqActivityNames.sort((a, b) => {
    //   return currentUserCountedNames[b] - currentUserCountedNames[a]
    // })

    return userSorted.map((activity) => {
      return {
        name: activity,
        userCount: userCountedNames[activity],
        currentUserCount: currentUserCountedNames[activity] || 0,
        // fullMark: 10,
      }
    })
  }

  console.log(createData())

  const data = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ]

  return (
    <RadarChart outerRadius={90} width={350} height={250} data={createData()}>
      <PolarGrid />
      <PolarAngleAxis dataKey='name' />
      <PolarRadiusAxis angle={30} domain={['auto', 'auto']} />
      <Radar
        name='user'
        dataKey='userCount'
        stroke='#8884d8'
        fill='#8884d8'
        fillOpacity={0.6}
      />
      <Radar
        name='current user'
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
