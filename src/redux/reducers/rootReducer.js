import { combineReducers } from 'redux'
import { parksReducer } from './parksReducer'
import {
  activitiesLoadedReducer,
  activitiesReducer,
  activityReducer,
} from './activitiesReducer'
import { eventsReducer } from './eventsReducer'
import {
  currentUserReducer,
  loggedInReducer,
  errorReducer,
  usersReducer,
  friendsReducer,
} from './usersReducer'
import { commentsReducer } from './commentsReducer'

const rootReducer = combineReducers({
  parks: parksReducer,
  activities: activitiesReducer,
  events: eventsReducer,
  comments: commentsReducer,
  currentUser: currentUserReducer,
  loggedIn: loggedInReducer,
  error: errorReducer,
  users: usersReducer,
  friendships: friendsReducer,
  selectedActivity: activityReducer,
  activitiesLoaded: activitiesLoadedReducer,
})

export default rootReducer
