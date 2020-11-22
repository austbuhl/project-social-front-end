import normalize from 'json-api-normalizer';

export function fetchEvents() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/events')
      .then((resp) => resp.json())
      .then((events) => dispatch({ type: 'FETCH_EVENTS', payload: events }))
      .catch(console.log)
  }
}

export function fetchParks() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/parks')
      .then((resp) => resp.json())
      .then((parks) => {
        dispatch({ type: 'FETCH_PARKS', payload: normalize(parks).park })
        dispatch({type: 'FETCH_ACTIVITIES', payload: normalize(parks).activity})
      })
        
      .catch(console.log)
  }
}

export function fetchComments() {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/comments')
      .then((resp) => resp.json())
      .then((comments) =>
        dispatch({ type: 'FETCH_COMMENTS', payload: comments })
      )
      .catch(console.log)
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
      .then((data) => {
        localStorage.setItem('token', data.jwt)
        dispatch({ type: 'LOGIN_USER', payload: data.user })
      })
      .catch(console.log)
  }
}

export function createComment(commentObj) {
  return function (dispatch) {
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
        .then((resp) => resp.json())
        .then((commentObj) => {
          dispatch({ type: 'UPDATE_EVENT', payload: commentObj.event })
        })
        .catch(console.log)
    }
  }
}

export function createEvent(eventObj) {
  return function (dispatch) {
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
          dispatch({ type: 'NEW_EVENT', payload: event })
        })
        .catch(console.log)
    }
  }
}

export function attendEvent(userEvent) {
  return function (dispatch) {
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
        .then((eventObj) => {
          dispatch({ type: 'UPDATE_EVENT', payload: eventObj })
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
      fetch('http://localhost:5000/api/v1/users', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((user) => {
          dispatch({ type: 'AUTHORIZE_USER', payload: user })
        })
        .catch(console.log)
    }
  }
}

export function createUser(userObj) {
  return function (dispatch) {
    fetch('http://localhost:5000/api/v1/users', {
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
