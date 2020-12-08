const defaultState = {
  activitiesLoaded: false,
  activities: {},
  selectedActivity: [],
}

export function activitiesLoadedReducer(
  state = defaultState.activitiesLoaded,
  action
) {
  switch (action.type) {
    case 'FETCH_ACTIVITIES':
      return true
    default:
      return state
  }
}

export function activitiesReducer(state = defaultState.activities, action) {
  switch (action.type) {
    case 'FETCH_ACTIVITIES':
      return action.payload
    default:
      return state
  }
}

export function activityReducer(state = defaultState.selectedActivity, action) {
  switch (action.type) {
    case 'SET_ACTIVITY':
      return [...state, action.payload]
    case 'REMOVE_ACTIVITY':
      return state.filter((activity) => activity !== action.payload)
    case 'RESET_ACTIVITY':
      return []
    default:
      return state
  }
}
