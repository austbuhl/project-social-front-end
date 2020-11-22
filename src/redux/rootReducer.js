import { combineReducers } from 'redux'

const defaultState = {
  parks: [],
  activities: [],
  events: [],
  comments: [],
  users: [],
  currentUser: null,
  selectedActivity: null,
}

function eventsReducer(state = defaultState.events, action) {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    case 'NEW_EVENT':
      return [...state, action.payload]
    case 'UPDATE_EVENT':
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

function activitiesReducer(state = defaultState.activities, action) {
  switch (action.type) {
    case 'FETCH_ACTIVITIES':
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
  activities: activitiesReducer,
  events: eventsReducer,
  comments: commentsReducer,
  currentUser: userReducer,
  selectedActivity: activityReducer,
})

export default rootReducer
