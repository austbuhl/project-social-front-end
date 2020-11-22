export const selectCurrentUser = (state) => {
  if (state.loggedIn) {
    const userId = Object.keys(state.currentUser)[0]
    return state.currentUser[userId]
  }
}

export const selectParks = (state) => Object.values(state.parks)
export const selectActivities = (state) => Object.values(state.activities)

export const selectPark = (state) => (parkId) => state.parks[parkId]
export const selectActivity = (state, activityId) =>
  state.activities[activityId]

export const selectParkActivities = (state) => (parkId) => {
  const park = selectPark(state)(parkId)
  if (park) {
    const activityIds = park.relationships.activities.data.map(
      (activity) => activity.id
    )
    return activityIds.map((activityId) => selectActivity(state, activityId))
  }
}

export const selectParkEvents = (state) => (parkId) => {
  const park = selectPark(state)(parkId)
  if (park) {
    const eventIds = park.relationships.events.data.map((event) => event.id)
    return eventIds.map((eventId) => selectEvent(state)(eventId))
  }
}

export const selectEvents = (state) => Object.values(state.events)
export const selectComments = (state) => Object.values(state.comments)
export const selectUsers = (state) => Object.values(state.users)

export const selectEvent = (state) => (eventId) => state.events[eventId]
export const selectComment = (state, commentId) => state.comments[commentId]
export const selectUser = (state, userId) => state.users[userId]

export const selectCommentAuthor = (state) => (commentId) => {
  const comment = selectComment(state, commentId)
  if (comment) {
    const userId = comment.relationships.user.data.id
    return selectUser(state, userId)
  }
}

export const selectEventComments = (state) => (eventId) => {
  const event = selectEvent(state)(eventId)
  if (event) {
    const commentIds = event.relationships.comments.data.map(
      (comment) => comment.id
    )
    return commentIds.map((commentId) => selectComment(state, commentId))
  }
}

export const selectEventUsers = (state) => (eventId) => {
  const event = selectEvent(state)(eventId)
  if (event) {
    const userIds = event.relationships.users.data.map((user) => user.id)
    return userIds.map((userId) => selectUser(state, userId))
  }
}

export const selectEventActivities = (state) => (eventId) => {
  const event = selectEvent(state)(eventId)
  if (event) {
    const activityIds = event.relationships.activities.data.map(
      (activity) => activity.id
    )
    return activityIds.map((activityId) => selectActivity(state, activityId))
  }
}
