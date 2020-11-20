import React from 'react'
import { connect } from 'react-redux'
import Park from './Park'
import ParkDetail from './ParkDetail'
import Filter from '../map/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'

const ParksList = (props) => {
  const filteredParks = props.selectedActivity
    ? props.parks.filter((park) => {
        if (
          park.activities.some(
            (activity) => activity.name === props.selectedActivity
          )
        ) {
          return park
        }
      })
    : props.parks

  const renderParks = () => {
    return filteredParks.map((park) => <Park key={park.id} park={park} />)
  }

  return (
    <Switch>
      <Route
        path='/parks/:id'
        render={(routerProps) => {
          const parkId = parseInt(routerProps.match.params.id)
          const park = props.parks.find((p) => p.id === parkId)
          return <ParkDetail park={park} />
        }}
      />

      <Route path='/parks'>
        <Grid container padded centered>
          <Grid.Column width={1}>
            <Filter />
          </Grid.Column>
          <Grid.Column width={10} textAlign='center'>
            <h1>Parks List Here</h1>
            <Item.Group divided relaxed>
              {renderParks()}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    parks: state.parks,
    selectedActivity: state.selectedActivity,
  }
}

export default withRouter(connect(mapStateToProps)(ParksList))
