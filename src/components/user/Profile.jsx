import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  selectUserEvents,
  selectUserActivities,
  selectUserFriends,
  selectCurrentUser,
  selectEventActivities,
} from '../../redux/selectors'
import { addFriend } from '../../redux/actions'
import Event from '../events/Event'
import Paginate from '../home/Paginate'
import ActivityIcon from '../activities/ActivityIcon'
import { Grid, Item, Label, List, Button } from 'semantic-ui-react'

const Profile = ({
  user,
  currentUser,
  userEvents,
  userActivities,
  eventActivities,
  addFriend,
  userFriends,
}) => {
  const activities = userActivities(user.id)
  const events = userEvents(user.id)
  const friends = userFriends(user.id)
  const friended = !!friends.find(
    (friend) => friend.attributes.friendId === currentUser.attributes.id
  )

  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 3
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage

  const renderEvents = () => {
    return events.slice(indexOfFirstEvent, indexOfLastEvent).map((event) => {
      const activities = eventActivities(event.id)
      return <Event key={event.id} event={event} activities={activities} />
    })
  }

  const activityNames = activities.map((activity) => activity.attributes.name)
  const countedNames = activityNames.reduce(function (allNames, name) {
    if (name in allNames) {
      allNames[name]++
    } else {
      allNames[name] = 1
    }
    return allNames
  }, {})

  const renderFavActivities = () => {
    const uniqActivityNames = activityNames.filter(
      (value, index, self) => self.indexOf(value) === index
    )
    const sorted = uniqActivityNames.sort((a, b) => {
      return countedNames[b] - countedNames[a]
    })
    return sorted.map((activity, index) => (
      <Label>
        <ActivityIcon key={index} activity={activity} />
        <Label.Detail>{countedNames[activity]}</Label.Detail>
      </Label>
    ))
  }

  const mutualFriends = () => {
    const currentUserFriends = userFriends(currentUser.id)
    return friends.filter((friend) =>
      currentUserFriends.find(
        (current) => current.attributes.friendId === friend.attributes.friendId
      )
    )
  }

  return (
    <Grid container padded centered>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <h1>Profile</h1>
          <h2>{user.attributes.username}</h2>
          <h3>Favorite Activities</h3>
          {renderFavActivities()}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <NavLink to={`/users/${user.id}/friends`}>
            <p>Friends: {friends.length}</p>
          </NavLink>
          <p>Mutual Friends: {mutualFriends().length + (friended ? 1 : 0)}</p>
          {currentUser.id !== user.id && !friended && (
            <Button floated='right' onClick={() => addFriend(user.id)}>
              Add Friend
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
      {friended ||
        (user.id === currentUser.id && (
          <>
            <Grid.Row>
              <Grid.Column width={5}>
                <h3>Upcoming Events</h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <Paginate
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  floated='right'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={10}>
                <Item.Group divided relaxed>
                  {renderEvents()}
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
          </>
        ))}
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    userEvents: selectUserEvents(state),
    userActivities: selectUserActivities(state),
    userFriends: selectUserFriends(state),
    eventActivities: selectEventActivities(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (friendId) => dispatch(addFriend(friendId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
