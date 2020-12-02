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
import UserRadarChart from './UserRadarChart'
import Event from '../events/Event'
import Paginate from '../home/Paginate'
import ActivityIcon from '../activities/ActivityIcon'
import { Grid, Item, Label, Button, Card, Icon, Image } from 'semantic-ui-react'

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
  const currentUserActivities = userActivities(currentUser.id)
  const events = userEvents(user.id)
  const friends = userFriends(user.id)
  const friended = !!friends.find(
    (friend) => friend.attributes.friendId === currentUser.attributes.id
  )
  const yourProfile = user.id === currentUser.id

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
    const currentUserFriends = userFriends(currentUser.id) || []
    return friends.filter((friend) =>
      currentUserFriends.find(
        (current) =>
          current.attributes.friendId === friend.attributes.friendId ||
          currentUser.attributes.id === friend.attributes.friendId
      )
    )
  }

  const imgs = [
    'https://react.semantic-ui.com/images/avatar/large/stevie.jpg',
    'https://react.semantic-ui.com/images/avatar/large/veronika.jpg',
    'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    'https://react.semantic-ui.com/images/avatar/large/matt.jpg',
    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
    'https://react.semantic-ui.com/images/avatar/large/joe.jpg',
    'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
  ]

  const randomImg = imgs[Math.floor(Math.random() * imgs.length)]

  return (
    <Grid container padded centered>
      <Grid.Row centered>
        <Grid.Column width={4}>
          <h1>Profile Page</h1>
          <Card>
            <Image src={randomImg} wrapped />
            <Card.Content>
              <Card.Header>{user.attributes.username}</Card.Header>
              <Card.Meta>Joined in 2020</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              {yourProfile && (
                <NavLink to={`/users/${user.id}/friends`}>
                  <Icon name='user' />
                  Friends: {friends.length}
                </NavLink>
              )}

              {!yourProfile && (
                <NavLink to={`/users/${user.id}/mutual`}>
                  <Icon name='user' />
                  Mutual Friends: {mutualFriends().length}
                </NavLink>
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={5} textAlign='center' verticalAlign='middle'>
          <h3>Favorite Activities</h3>
          {renderFavActivities()}

          <UserRadarChart
            username={user.attributes.username}
            currentUsername={currentUser.attributes.username}
            currentUserActivities={currentUserActivities}
            userActivities={activities}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={10}>
          {!yourProfile && !friended && (
            <Button floated='right' onClick={() => addFriend(user.id)}>
              Add Friend
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
      {(yourProfile || friended) && (
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
      )}
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
