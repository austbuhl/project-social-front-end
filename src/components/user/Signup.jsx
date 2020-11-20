import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../redux/actions'

const Signup = (props) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })

  const submitHandler = (e) => {
    e.preventDefault()
    props.createUser(userInfo)
  }

  const changeHandler = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        label='username'
        name='username'
        placeholder='username'
        value={userInfo.username}
        onChange={changeHandler}
      />

      <input
        type='password'
        label='password'
        name='password'
        placeholder='password'
        value={userInfo.password}
        onChange={changeHandler}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userObj) => dispatch(createUser(userObj)),
  }
}

export default connect(null, mapDispatchToProps)(Signup)
