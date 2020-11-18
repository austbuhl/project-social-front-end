import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutHandler } from '../../redux/actions'

const NavBar = ({ currentUser, logoutHandler }) => {
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
      <NavLink className='item' exact to='/comments'>
        Comments
      </NavLink>
      {!currentUser && (
        <>
          <NavLink className='item' exact to='/login'>
            Login
          </NavLink>
          <NavLink className='item' exact to='/signup'>
            Signup
          </NavLink>
        </>
      )}
      {currentUser && (
        <>
          <a className='item'>Logged in as {currentUser.username}</a>
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
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => dispatch(logoutHandler()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
