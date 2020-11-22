import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutHandler } from '../../redux/actions'
import { selectCurrentUser } from '../../redux/selectors'

const NavBar = ({ currentUser, logoutHandler, loggedIn }) => {
  console.log(currentUser)
  return (
    <div className='ui ten item menu'>
      <NavLink className='item' exact to='/'>
        Home
      </NavLink>
      <NavLink className='item' exact to='/parks'>
        Parks
      </NavLink>
      <NavLink className='item' exact to='/events'>
        Events
      </NavLink>
      {!loggedIn && (
        <>
          <NavLink className='item' exact to='/login'>
            Login
          </NavLink>
          <NavLink className='item' exact to='/signup'>
            Signup
          </NavLink>
        </>
      )}
      {loggedIn && (
        <>
          <a className='item'>Logged in as {currentUser.attributes.username}</a>
          <a className='item' onClick={logoutHandler}>
            Logout
          </a>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: selectCurrentUser(state),
    loggedIn: state.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => dispatch(logoutHandler()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
