import React from 'react'
import { connect } from 'react-redux'
import Park from './Park'
import ParkDetail from './ParkDetail'
import Filter from '../map/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import {selectParks, selectPark, selectParkActivities} from '../../redux/selectors'

const ParksList = ({parks, selectedActivity, parkActivities, selectPark}) => {
  const filteredParks = selectedActivity
    ? 
    parks.filter((park) => { 
        if (
          parkActivities(park.id).some((activity) => activity.attributes.name === selectedActivity)
        ) {
          return park
        }
      })
    : parks


  const renderParks = () => {
    return filteredParks.map((park) => <Park key={park.id} park={park} />)
  }

  return (
    <Switch>
      <Route
        path='/parks/:id'
        render={({ match }) => {
          const park = selectPark(parseInt(match.params.id))
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
    parks: selectParks(state),
    selectPark: selectPark(state),
    selectedActivity: state.selectedActivity,
    parkActivities: selectParkActivities(state)
  }
}

export default withRouter(connect(mapStateToProps)(ParksList))
