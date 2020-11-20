import { combineReducers } from 'redux'

const defaultState = {
  parks: [],
  events: [],
  currentUser: null,
  selectedActivity: null,
}

function eventsReducer(state = defaultState.events, action) {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    case 'NEW_EVENT':
      return [...state, action.payload]
    case 'NEW_COMMENT':
      return [
        ...state.map((event) => {
          if (event.id === action.payload.id) {
            return action.payload
          } else {
            return event
          }
        }),
      ]
    default:
      return state
  }
}

function parksReducer(state = defaultState.parks, action) {
  switch (action.type) {
    case 'FETCH_PARKS':
      return action.payload
    default:
      return state
  }
}

function userReducer(state = defaultState.currentUser, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload
    case 'AUTHORIZE_USER':
      return action.payload
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

function activityReducer(state = defaultState.selectedActivity, action) {
  switch (action.type) {
    case 'SET_ACTIVITY':
      return action.payload
    case 'RESET_ACTIVITY':
      return null
    default:
      return state
  }
}

const rootReducer = combineReducers({
  parks: parksReducer,
  events: eventsReducer,
  currentUser: userReducer,
  selectedActivity: activityReducer,
})

export default rootReducer
