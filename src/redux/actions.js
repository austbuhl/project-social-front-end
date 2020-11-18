export function fetchEvents() {
  return function (dispatch) {
    fetch("http://localhost:5000/api/v1/events")
      .then((resp) => resp.json())
      .then((events) => dispatch({ type: "FETCH_EVENTS", payload: events }));
  };
}

export function fetchParks() {
  return function (dispatch) {
    fetch("http://localhost:5000/api/v1/parks")
      .then((resp) => resp.json())
      .then((parks) => dispatch({ type: "FETCH_PARKS", payload: parks }));
  };
}

export function fetchComments() {
  return function (dispatch) {
    fetch("http://localhost:5000/api/v1/comments")
      .then((resp) => resp.json())
      .then((comments) =>
        dispatch({ type: "FETCH_COMMENTS", payload: comments })
      );
  };
}
