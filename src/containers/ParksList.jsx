import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Park from '../components/parks/Park'
import ParkDetail from '../components/parks/ParkDetail'
import Filter from '../components/map/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import Paginate from '../components/home/Paginate'
import {
  selectParks,
  selectPark,
  selectParkActivities,
} from '../redux/selectors'

const ParksList = ({ parks, selectedActivity, parkActivities, selectPark }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const parksPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedActivity])

  const filteredParks = selectedActivity
    ? parks.filter((park) => {
        if (
          parkActivities(park.id).some(
            (activity) => activity.attributes.name === selectedActivity
          )
        ) {
          return park
        }
      })
    : parks

  const totalPages = Math.ceil(filteredParks.length / parksPerPage)
  const indexOfLastPark = currentPage * parksPerPage
  const indexOfFirstPark = indexOfLastPark - parksPerPage
  const renderParks = () => {
    return filteredParks
      .slice(indexOfFirstPark, indexOfLastPark)
      .map((park) => <Park key={park.id} park={park} />)
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
          <Grid.Column width={10}>
            <h1>
              Parks Near You
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                floated='right'
              />
            </h1>
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
    parkActivities: selectParkActivities(state),
  }
}

export default withRouter(connect(mapStateToProps)(ParksList))
