export const selectParks = state => Object.values((state.parks))
export const selectActivities = state => Object.values(state.activities)

export const selectPark = (parkId, state) => state.parks[parkId]
export const selectActivity = (activityId, state) => state.activities[activityId]

export const selectParkActivities = state => parkId =>{
  const park = selectPark(parkId, state)
  if(park) {
    const parkActivityIds = park.relationships.activities.data.map((activity) => activity.id)
    const parkActivities = parkActivityIds.map((activityId) => selectActivity(activityId, state))
    return parkActivities.map(activity => activity.attributes)
  }
}