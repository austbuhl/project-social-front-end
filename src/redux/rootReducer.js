import { combineReducers } from 'redux'

const defaultState = {
  parks: {},
  activities: {},
  events: {},
  comments: {},
  users: {},
  currentUser: null,
  selectedActivity: null,
}

function eventsReducer(state = defaultState.events, action) {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    case 'NEW_EVENT':
      return {...state, ...action.payload}
    case 'NEW_COMMENT':
      const commentId = Object.keys(action.payload)
      const comment = action.payload[commentId]
      const eventId = comment.relationships.event.data.id
      const event = state[eventId]
      return {
        ...state, 
        [eventId]: 
          {...event, 
            relationships: 
            {
              ...event.relationships,
              comments: {
                data: [
                  ...event.relationships.comments.data, 
                  {id: commentId[0], type: "comment"}
                ]
              }
            }
          }
        }
    default:
      return state
  }
}

function usersReducer(state = defaultState.users, action) {
  switch(action.type) {
    case 'FETCH_USERS' :
      return action.payload
    case 'NEW_COMMENT': 
    const commentId = Object.keys(action.payload)
    const comment = action.payload[commentId]
    const userId = comment.relationships.user.data.id
    const user = state[userId]
    return {
      ...state, 
      [userId]: 
        {...user, 
          relationships: 
          {
            ...user.relationships,
            comments: {
              data: [
              ...user.relationships.comments.data, 
              {id: commentId[0], type: "comment"}
              ]
            }
          }
        }
      }
    default:
      return state
  }
}

function commentsReducer(state = defaultState.comments, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS':
      return action.payload
    case 'NEW_COMMENT':
      return {...state, ...action.payload}
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

function activitiesReducer(state = defaultState.activities, action) {
  switch (action.type) {
    case 'FETCH_ACTIVITIES':
      return action.payload
    default: 
      return state
  }
}


function authReducer(state = defaultState.currentUser, action) {
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
  currentUser: authReducer,
  users: usersReducer,
  selectedActivity: activityReducer,
})

export default rootReducer
