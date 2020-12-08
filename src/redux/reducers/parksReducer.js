const defaultState = {
  parks: {},
}

export function parksReducer(state = defaultState.parks, action) {
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
