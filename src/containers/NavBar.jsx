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
    <Sticky>
      <Menu
        inverted
        pointing
        secondary
        style={{ backgroundColor: 'black', padding: '.5em' }}
      >
        <div className='header item' style={{ height: 35, width: 75 }}>
          <Image
            src='PS_dark.png'
            style={{ objectFit: 'contain', marginTop: 5 }}
          />
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
            <NavLink className='item' to='/login'>
              Login
            </NavLink>
            <NavLink className='item' to='/signup'>
              Signup
            </NavLink>
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
