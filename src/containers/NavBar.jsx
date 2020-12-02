import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutHandler } from '../redux/actions'
import { selectCurrentUser } from '../redux/selectors'
import { useHistory } from 'react-router-dom'
import { Menu, Sticky, Image } from 'semantic-ui-react'

const NavBar = ({ currentUser, logoutHandler, loggedIn }) => {
  const history = useHistory()

  const logout = () => {
    logoutHandler()
    history.push('/')
  }

  return (
    // <div className='ui ten item menu'>
    <Sticky>
      <Menu inverted>
        <div className='header item'>
          <Image src='PS.png' size='tiny' />
        </div>
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
          <Menu.Menu position='right'>
            <Menu.Item href='/login'>Login</Menu.Item>
            <Menu.Item href='/signup'>Signup</Menu.Item>
          </Menu.Menu>
        )}
        {loggedIn && (
          <>
            <NavLink className='item' to={`/users/${currentUser.id}/profile`}>
              Profile
            </NavLink>
            <Menu.Item position='right' onClick={logout}>
              Logout
            </Menu.Item>
          </>
        )}
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
