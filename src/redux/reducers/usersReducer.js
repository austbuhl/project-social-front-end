const defaultState = {
  users: {},
  friendships: {},
  currentUser: {},
  loggedIn: false,
  error: '',
}

export function usersReducer(state = defaultState.users, action) {
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
    case 'CANCEL_RSVP':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            events: {
              data: [
                ...user.relationships.events.data.filter(
                  (event) => event.id !== eventId
                ),
              ],
            },
          },
        },
      }

    case 'ADD_FRIEND':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friendships: {
              data: [
                { id: Object.keys(action.payload)[0], type: 'friendship' },
                ...user.relationships.friendships.data,
              ],
            },
          },
        },
        [friendId]: {
          ...friend,
          relationships: {
            ...friend.relationships,
            friendships: {
              data: [
                { id: Object.keys(action.payload)[1], type: 'friendship' },
                ...friend.relationships.friendships.data,
              ],
            },
          },
        },
      }
    // case 'ACCEPT_REQUEST':
    //   debugger
    //   return {
    //     ...state,
    //     [userId]: {
    //       ...user,
    //       relationships: {
    //         ...user.relationships,
    //         friendships: {
    //           data: [
    //             { id: Object.keys(action.payload)[0], type: 'friendship' },
    //             ...user.relationships.friendships.data,
    //           ],
    //         },
    //       },
    //     },
    //     [friendId]: {
    //       ...friend,
    //       relationships: {
    //         ...friend.relationships,
    //         friendships: {
    //           data: [
    //             { id: Object.keys(action.payload)[1], type: 'friendship' },
    //             ...friend.relationships.friendships.data,
    //           ],
    //         },
    //       },
    //     },
    //   }
    case 'DELETE_FRIEND':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friendships: {
              data: [
                ...user.relationships.friendships.data.filter(
                  (friendship) => parseInt(friendship.id) !== action.first
                ),
              ],
            },
          },
        },
        [friendId]: {
          ...friend,
          relationships: {
            ...friend.relationships,
            friendships: {
              data: [
                ...friend.relationships.friendships.data.filter(
                  (friendship) => parseInt(friendship.id) !== action.second
                ),
              ],
            },
          },
        },
      }
    default:
      return state
  }
}

export function loggedInReducer(state = defaultState.loggedIn, action) {
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

export function currentUserReducer(state = defaultState.currentUser, action) {
  const { userId, eventId, commentId } = action
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
            events: {
              data: [
                { id: eventId, type: 'event' },
                ...user.relationships.events.data,
              ],
            },
          },
        },
      }
    // case 'ADD_FRIEND':
    //   return {
    //     ...state,
    //     [userId]: {
    //       ...user,
    //       relationships: {
    //         ...user.relationships,
    //         friendships: {
    //           data: [
    //             { id: Object.keys(action.payload)[0], type: 'friend' },
    //             ...user.relationships.friendships.data,
    //           ],
    //         },
    //       },
    //     },
    //   }
    case 'DELETE_FRIEND':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friendships: {
              data: [
                ...user.relationships.friendships.data.filter(
                  (friendship) => parseInt(friendship.id) !== action.first
                ),
              ],
            },
          },
        },
      }
    case 'ACCEPT_REQUEST':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            friendships: {
              data: [
                { id: Object.keys(action.payload)[0], type: 'friendship' },
                ...user.relationships.friendships.data,
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
    case 'CANCEL_RSVP':
      return {
        ...state,
        [userId]: {
          ...user,
          relationships: {
            ...user.relationships,
            events: {
              data: [
                ...user.relationships.events.data.filter(
                  (event) => event.id !== eventId
                ),
              ],
            },
          },
        },
      }
    default:
      return state
  }
}

export function friendsReducer(state = defaultState.friendships, action) {
  switch (action.type) {
    case 'FETCH_FRIENDS':
      return action.payload
    case 'ADD_FRIEND':
      return { ...state, ...action.payload }
    case 'ACCEPT_REQUEST':
      return {
        ...state,
        ...action.payload,
      }
    case 'DELETE_FRIEND':
      const updatedState = { ...state }
      delete updatedState[action.first]
      delete updatedState[action.second]
      return updatedState
    default:
      return state
  }
}

export function errorReducer(state = defaultState.error, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload
    case 'CLEAR_ERROR':
      return ''
    default:
      return state
  }
}
