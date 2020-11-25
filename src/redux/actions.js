import normalize from 'json-api-normalizer'

export function fetchEvents() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/events')
      .then((resp) => resp.json())
      .then((events) =>
        dispatch({ type: 'FETCH_EVENTS', payload: normalize(events).event })
      )
      .catch(console.log)
  }
}

export function fetchParks() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/parks')
      .then((resp) => resp.json())
      .then((parks) => {
        dispatch({ type: 'FETCH_PARKS', payload: normalize(parks).park })
        dispatch({
          type: 'FETCH_ACTIVITIES',
          payload: normalize(parks).activity,
        })
      })

      .catch(console.log)
  }
}

export function fetchComments() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/comments')
      .then((resp) => resp.json())
      .then((comments) => {
        dispatch({
          type: 'FETCH_COMMENTS',
          payload: normalize(comments).comment,
        })
      })
      .catch(console.log)
  }
}

export function fetchUsers() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/users')
      .then((resp) => resp.json())
      .then((users) => {
        dispatch({ type: 'FETCH_USERS', payload: normalize(users).user })
      })
      .catch(console.log)
  }
}

export function fetchFriends() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/users/friends')
      .then((resp) => resp.json())
      .then((friends) => {
        dispatch({
          type: 'FETCH_FRIENDS',
          payload: normalize(friends).friendship,
        })
      })
      .catch(console.log)
  }
}

export function addFriend(friendId) {
  return function (dispatch) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/v1/users/friends', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ friend_id: friendId }),
      })
        .then((resp) => resp.json())
        .then((friends) => {
          const userId = friends.data[0].attributes.user_id
          const friendId = friends.data[0].attributes.friend_id
          dispatch({
            type: 'ADD_FRIEND',
            payload: normalize(friends).friendship,
            userId: userId,
            friendId: friendId,
          })
        })
    }
  }
}

export function acceptRequest(friendId) {
  return function (dispatch) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/v1/users/friends', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ friend_id: friendId }),
      })
        .then((resp) => resp.json())
        .then((friends) => {
          const userId = friends.data[0].attributes.user_id
          const friendId = friends.data[0].attributes.friend_id
          dispatch({
            type: 'ACCEPT_REQUEST',
            payload: normalize(friends).friendship,
            userId: userId,
            friendId: friendId,
          })
        })
    }
  }
}

export function deleteFriend(friendId) {
  return function (dispatch) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:5000/api/v1/users/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((deleted) => {
          dispatch({
            type: 'DELETE_FRIEND',
            first: deleted.first.id,
            second: deleted.second.id,
            userId: deleted.userId,
            friendId: parseInt(deleted.friendId),
          })
        })
    }
  }
}

export function loginHandler(userObj) {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
      },
      body: JSON.stringify(userObj),
    })
      .then((resp) => resp.json())
      .then((user) => {
        localStorage.setItem('token', user.meta)
        dispatch({ type: 'LOGIN_USER', payload: normalize(user).user })
      })
      .catch(console.log)
  }
}

export function createComment(commentObj) {
  return function (dispatch, getState) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/v1/comments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentObj),
      })
      // .then((resp) => resp.json())
      // .then((comment) => {
      //   const commentId = comment.data.id
      //   const eventId = comment.data.relationships.event.data.id
      //   const userId = Object.keys(getState().currentUser)[0]
      //   dispatch({
      //     type: 'NEW_COMMENT',
      //     payload: normalize(comment).comment,
      //     commentId: commentId,
      //     eventId: eventId,
      //     userId: userId,
      //   })
      // })
      // .catch(console.log)
    }
  }
}

export function newCommentReceived(comment, eventId, userId) {
  const commentId = comment.data.id
  return {
    type: 'NEW_COMMENT',
    payload: normalize(comment).comment,
    commentId: commentId,
    eventId: eventId,
    userId: userId,
  }
}

export function createEvent(eventObj) {
  return function (dispatch, getState) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/v1/events', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ event: eventObj }),
      })
        .then((resp) => resp.json())
        .then((event) => {
          const eventId = event.data.id
          const parkId = event.data.relationships.park.data.id
          const userId = Object.keys(getState().currentUser)[0]
          dispatch({
            type: 'NEW_EVENT',
            payload: normalize(event).event,
            eventId: eventId,
            userId: userId,
            parkId: parkId,
          })
        })
        .catch(console.log)
    }
  }
}

export function attendEvent(userEvent) {
  return function (dispatch, getState) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:5000/api/v1/events/${userEvent.event_id}/rsvp`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ event: userEvent }),
      })
        .then((resp) => resp.json())
        .then((event) => {
          const eventId = event.data.id
          const userId = Object.keys(getState().currentUser)[0]
          dispatch({
            type: 'ATTEND_EVENT',
            payload: normalize(event).event,
            eventId: eventId,
            userId: userId,
          })
        })
        .catch(console.log)
    }
  }
}

export function logoutHandler() {
  return function (dispatch) {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT_USER' })
  }
}

export function authorizeUser() {
  return function (dispatch) {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/v1/users/auth', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((user) => {
          dispatch({ type: 'AUTHORIZE_USER', payload: normalize(user).user })
        })
        .catch(console.log)
    }
  }
}

export function createUser(userObj) {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/users/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
      },
      body: JSON.stringify({ user: userObj }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt)
        dispatch({ type: 'LOGIN_USER', payload: data.user })
      })
      .catch(console.log)
  }
}

export function setActivity(activity) {
  return { type: 'SET_ACTIVITY', payload: activity }
}

export function resetActivity() {
  return { type: 'RESET_ACTIVITY' }
}
