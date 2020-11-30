import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Park from '../components/parks/Park'
import ParkDetail from '../components/parks/ParkDetail'
import Filter from '../components/home/Filter'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Item } from 'semantic-ui-react'
import Paginate from '../components/home/Paginate'
import FilterByBorough from '../components/home/FilterByBorough'
import {
  selectParks,
  selectPark,
  selectParkActivities,
} from '../redux/selectors'

const ParksList = ({ parks, selectedActivity, parkActivities, selectPark }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterValue, setFilterValue] = useState(null)
  const parksPerPage = 8

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedActivity])

  const boroughFilterHandler = (e, value) => {
    setFilterValue(value)
  }

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

  const filteredBorough =
    filterValue && filterValue !== 'All'
      ? filteredParks.filter(
          (park) => park.attributes.nycParkId[0] === filterValue
        )
      : filteredParks

  const totalPages = Math.ceil(filteredBorough.length / parksPerPage)
  const indexOfLastPark = currentPage * parksPerPage
  const indexOfFirstPark = indexOfLastPark - parksPerPage
  const renderParks = () => {
    return filteredBorough
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <h4>Active Filter: {selectedActivity || 'All'}</h4>
              <FilterByBorough
                filterHandler={boroughFilterHandler}
                filterValue={filterValue}
              />
            </div>
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
