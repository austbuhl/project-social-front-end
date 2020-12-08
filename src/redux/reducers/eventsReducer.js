const defaultState = {
  events: {},
}

export function eventsReducer(state = defaultState.events, action) {
  const { eventId, commentId } = action
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
    case 'CANCEL_RSVP':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
