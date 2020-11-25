import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  selectUserEvents,
  selectUserActivities,
  selectUserFriends,
} from '../../redux/selectors'
import { addFriend, acceptRequest, deleteFriend } from '../../redux/actions'
import Event from '../events/Event'
import Paginate from '../home/Paginate'
import ActivityIcon from '../activities/ActivityIcon'
import { Grid, Item, Label, List, Button } from 'semantic-ui-react'

const Profile = ({
  user,
  userEvents,
  userActivities,
  addFriend,
  userFriends,
  deleteFriend,
  acceptRequest,
}) => {
  const activities = userActivities(user.id)
  const events = userEvents(user.id)
  const friends = userFriends(user.id)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 3
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage

  const renderEvents = () => {
    return events
      .slice(indexOfFirstEvent, indexOfLastEvent)
      .map((event) => <Event key={event.id} event={event} />)
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

  const renderFriendsList = () => {
    return friends.map((friend) => (
      <List.Item key={friend.id}>
        <List.Content>{friend.attributes.friendName}</List.Content>
        <List.Content floated='right'>
          <Button onClick={() => acceptRequest(friend.attributes.friendId)}>
            {friend.attributes.status}
          </Button>
          <Button onClick={() => deleteFriend(friend.attributes.friendId)}>
            Delete Friend
          </Button>
        </List.Content>
      </List.Item>
    ))
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
      <Button onClick={() => addFriend(user.id)}>Add Friend</Button>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <List divided verticalAlign='middle'>
            {renderFriendsList()}
          </List>
        </Grid.Column>
      </Grid.Row>
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
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    userEvents: selectUserEvents(state),
    userActivities: selectUserActivities(state),
    userFriends: selectUserFriends(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (friendId) => dispatch(addFriend(friendId)),
    acceptRequest: (friendId) => dispatch(acceptRequest(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
