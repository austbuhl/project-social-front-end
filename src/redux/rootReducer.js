import { combineReducers } from 'redux'

const defaultState = {
  parks: {},
  activities: {},
  events: {},
  comments: {},
  users: {},
  friends: {},
  currentUser: {},
  loggedIn: false,
  selectedActivity: null,
}

function eventsReducer(state = defaultState.events, action) {
  const { eventId, commentId, userId } = action
  const event = state[eventId]

  switch (action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    case 'NEW_EVENT':
      return { ...state, ...action.payload }
    case 'NEW_COMMENT':
      return {
        ...state,
        [eventId]: {
          ...event,
          relationships: {
            ...event.relationships,
            comments: {
              data: [
                ...event.relationships.comments.data,
                { id: commentId, type: 'comment' },
              ],
            },
          },
        },
      }
    case 'ATTEND_EVENT':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

function usersReducer(state = defaultState.users, action) {
  const { eventId, commentId, userId, friendId } = action
  const user = state[userId]
  const friend = state[friendId]
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload
    case 'NEW_COMMENT':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            comments: {
              data: [
                ...user.relationships.comments.data,
                { id: commentId, type: 'comment' },
              ],
            },
          },
        },
      }
    case 'NEW_EVENT':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            events: {
              data: [
                ...user.relationships.events.data,
                { id: eventId, type: 'event' },
              ],
            },
          },
        },
      }
    case 'ATTEND_EVENT':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            events: {
              data: [
                { id: eventId, type: 'event' },
                ...user.relationships.events.data,
              ],
            },
          },
        },
      }
    case 'NEW_FRIENDS':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friends: {
              data: [
                { id: friendId, type: 'friend' },
                ...user.relationships.friends.data,
              ],
            },
          },
        },
        [friendId]: {
          ...friend,
          relationships: {
            ...friend.relationships,
            friends: {
              data: [
                { id: userId, type: 'friend' },
                ...friend.relationships.friends.data,
              ],
            },
          },
        },
      }
    default:
      return state
  }
}

function parksReducer(state = defaultState.parks, action) {
  const { eventId, parkId } = action
  const park = state[parkId]
  switch (action.type) {
    case 'FETCH_PARKS':
      return action.payload
    case 'NEW_EVENT':
      return {
        ...state,
        [parkId]: {
          ...park,
          relationships: {
            ...park.relationships,
            events: {
              data: [
                ...park.relationships.events.data,
                { id: eventId, type: 'event' },
              ],
            },
          },
        },
      }
    default:
      return state
  }
}

function loggedInReducer(state = defaultState.loggedIn, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return true
    case 'AUTHORIZE_USER':
      return true
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}

function currentUserReducer(state = defaultState.currentUser, action) {
  const { userId, eventId, commentId, friendId } = action
  const user = userId ? state[userId] : {}

  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload
    case 'AUTHORIZE_USER':
      return action.payload
    case 'LOGOUT_USER':
      return {}
    case 'NEW_COMMENT':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            comments: {
              data: [
                { id: commentId, type: 'comment' },
                ...user.relationships.comments.data,
              ],
            },
          },
        },
      }
    case 'NEW_EVENT':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friends: {
              data: [
                { id: userId, type: 'friend' },
                ...user.relationships.friends.data,
              ],
            },
          },
        },
      }
    case 'NEW_FRIENDS':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friends: {
              data: [
                ...user.relationships.friends.data,
                { id: friendId, type: 'friend' },
              ],
            },
          },
        },
      }

    case 'ATTEND_EVENT':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            events: {
              data: [
                ...user.relationships.events.data,
                { id: eventId, type: 'event' },
              ],
            },
          },
        },
      }
    default:
      return state
  }
}

function friendsReducer(state = defaultState.friends, action) {
  switch (action.type) {
    case 'FETCH_FRIENDS':
      return action.payload
    case 'NEW_FRIENDS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

function commentsReducer(state = defaultState.comments, action) {
  switch (action.type) {
    case 'FETCH_COMMENTS':
      return action.payload
    case 'NEW_COMMENT':
      return { ...state, ...action.payload }
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
  currentUser: currentUserReducer,
  loggedIn: loggedInReducer,
  users: usersReducer,
  friends: friendsReducer,
  selectedActivity: activityReducer,
})

export default rootReducer
