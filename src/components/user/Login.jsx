import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginHandler } from '../../redux/actions'
import { Form, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import LoginMessage from './LoginMessage'

const Login = ({ loginHandler }) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [redirectTime, setRedirectTime] = useState(3)
  const [successMsg, setSuccessMsg] = useState(false)
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    loginHandler(userInfo)
    redirectTimeout()
  }

  const redirectTimeout = () =>
    setInterval(() => {
      setSuccessMsg(true)
      setRedirectTime((prevState) => prevState - 1)
    }, 1000)

  useEffect(() => {
    if (redirectTime === 0) {
      if (history.location.state) {
        history.push(history.location.state)
      } else {
        history.push('/')
      }
    }
    return () => clearTimeout(redirectTimeout)
  }, [redirectTime])

  const changeHandler = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Input
        label='Username'
        name='username'
        placeholder='Enter Username'
        value={userInfo.username}
        onChange={changeHandler}
      />

      <Form.Input
        type='password'
        label='Password'
        name='password'
        placeholder='Enter Password'
        value={userInfo.password}
        onChange={changeHandler}
      />
      {successMsg && <LoginMessage seconds={redirectTime} />}
      <Button content='Login' labelPosition='left' icon='user' primary />
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: (userObj) => dispatch(loginHandler(userObj)),
  }
}

export default connect(null, mapDispatchToProps)(Login)
