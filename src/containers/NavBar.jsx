import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutHandler } from '../redux/actions'
import { selectCurrentUser } from '../redux/selectors'
import { useHistory } from 'react-router-dom'
import { Menu, Sticky } from 'semantic-ui-react'

const NavBar = ({ currentUser, logoutHandler, loggedIn }) => {
  const history = useHistory()

  const logout = () => {
    logoutHandler()
    history.push('/')
  }

  return (
    // <div className='ui ten item menu'>
    <Sticky>
      <Menu widths={10} inverted>
        <NavLink className='item ' exact to='/'>
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
            <NavLink className='item' to={`/users/${currentUser.id}/profile`}>
              Logged in as {currentUser.attributes.username}
            </NavLink>
            <a className='item' onClick={logout}>
              Logout
            </a>
          </>
        )}
        {/* </div> */}
      </Menu>
    </Sticky>
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
