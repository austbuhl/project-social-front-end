export const selectParks = state => Object.values((state.parks))
export const selectActivities = state => Object.values(state.activities)

export const selectPark = state => parkId => state.parks[parkId]
export const selectActivity = (activityId, state) => state.activities[activityId]

export const selectParkActivities = state => parkId =>{
  const park = state.parks[parkId]
  if(park) {
    const parkActivityIds = park.relationships.activities.data.map((activity) => activity.id)
    return parkActivityIds.map((activityId) => selectActivity(activityId, state))
  }
}