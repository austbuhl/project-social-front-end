import { combineReducers } from 'redux'

const defaultState = {
  events: [],
  parks: [],
  comments: [],
  currentUser: ''
}

function eventsReducer(state = defaultState.events, action) {
  switch(action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    default:
      return state
  }
}

function parksReducer(state = defaultState.parks, action) {
  switch(action.type) {
    case 'FETCH_PARKS':
      return action.payload
    default:
      return state
  }
}

function commentsReducer(state = defaultState.comments, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS':
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  events: eventsReducer,
  parks: parksReducer,
  comments: commentsReducer
})

export default rootReducer