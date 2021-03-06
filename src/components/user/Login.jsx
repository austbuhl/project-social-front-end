import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginHandler, clearError } from '../../redux/actions'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'
import { useHistory, NavLink } from 'react-router-dom'
import SuccessMessage from './SuccessMessage'
import FailMessage from './FailMessage'

const Login = ({ loginHandler, error, loggedIn, clearError }) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [msgTimer, setMsgTimer] = useState(3)
  const [successMsg, setSuccessMsg] = useState(false)
  const [failMsg, setFailMsg] = useState(false)
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    loginHandler(userInfo)
  }

  useEffect(() => {
    if (msgTimer === 0 && loggedIn) {
      if (history.location.state) {
        history.push(history.location.state)
      } else {
        history.push('/')
      }
    } else if (msgTimer === 0) {
      setFailMsg(false)
      clearError()
      setMsgTimer(3)
    }
  }, [msgTimer])

  useEffect(() => {
    if (loggedIn) {
      setSuccessMsg(true)
      const redirectTimeout = setInterval(() => {
        setMsgTimer((prevState) => prevState - 1)
      }, 1000)
      return () => clearTimeout(redirectTimeout)
    }
  }, [loggedIn])

  useEffect(() => {
    if (error !== '') {
      setFailMsg(true)
      const errorTimeout = setInterval(() => {
        setMsgTimer((prevState) => prevState - 1)
      }, 1000)
      return () => clearTimeout(errorTimeout)
    }
  }, [error])

  const changeHandler = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Grid textAlign='center' style={{ height: '75vh' }}>
        <Grid.Column style={{ maxWidth: 450, marginTop: '2em' }}>
          <Image src='PS_full.png' size='medium' />
          <Header as='h2' textAlign='center'>
            Login To Your Account
          </Header>
          <Form size='large' onSubmit={submitHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                name='username'
                placeholder='Enter Username'
                value={userInfo.username}
                onChange={changeHandler}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                placeholder='Enter Password'
                value={userInfo.password}
                onChange={changeHandler}
              />

              <Button primary fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          {successMsg && (
            <SuccessMessage header={'Login Succesful'} seconds={msgTimer} />
          )}
          {failMsg && <FailMessage error={error} />}
          <Message>
            New to us? <NavLink to='/signup'>Signup</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    loggedIn: state.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: (userObj) => dispatch(loginHandler(userObj)),
    clearError: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
