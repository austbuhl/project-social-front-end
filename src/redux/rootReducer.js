import { act } from 'react-dom/test-utils'
import { combineReducers } from 'redux'

const defaultState = {
  events: [],
  parks: [],
  comments: [],
  currentUser: null,
  selectedActivity: null,
}

function eventsReducer(state = defaultState.events, action) {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return action.payload
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

function commentsReducer(state = defaultState.comments, action) {
  switch (action.type) {
    case 'FETCH_COMMENTS':
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
  events: eventsReducer,
  parks: parksReducer,
  comments: commentsReducer,
  currentUser: userReducer,
  selectedActivity: activityReducer,
})

export default rootReducer
