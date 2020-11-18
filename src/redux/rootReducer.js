import { combineReducers } from 'redux'

const defaultState = {
  events: [],
  parks: [],
  comments: [],
  currentUser: null,
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

const rootReducer = combineReducers({
  events: eventsReducer,
  parks: parksReducer,
  comments: commentsReducer,
  currentUser: userReducer,
})

export default rootReducer
