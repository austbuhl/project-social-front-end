const defaultState = {
  comments: {},
}

export function commentsReducer(state = defaultState.comments, action) {
  switch (action.type) {
    case 'FETCH_COMMENTS':
      return action.payload
    case 'NEW_COMMENT':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
