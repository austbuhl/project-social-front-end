import React from 'react'
import { connect } from 'react-redux'
import Park from './Park'
import ParkDetail from './ParkDetail'
import { Switch, Route, withRouter } from 'react-router-dom'

const ParksList = (props) => {
  const renderParks = () => {
    return props.parks.map((park) => <Park key={park.id} park={park} />)
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
        <div>
          <h1>Parks List Here</h1>
          <div className='ui divided items'>{renderParks()}</div>
        </div>
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return { parks: state.parks }
}

export default withRouter(connect(mapStateToProps)(ParksList))
