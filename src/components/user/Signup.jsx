import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../redux/actions'
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

const Signup = ({ createUser }) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [redirectTime, setRedirectTime] = useState(3)
  const [successMsg, setSuccessMsg] = useState(false)
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    createUser(userInfo)
    redirectTimeout()
  }

  const redirectTimeout = () =>
    setInterval(() => {
      setSuccessMsg(true)
      setRedirectTime((prevState) => prevState - 1)
    }, 1000)

  useEffect(() => {
    if (redirectTime === 0) {
      history.push('/')
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
    <>
      <Grid
        textAlign='center'
        style={{ height: '75vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            <Image src='logo192.png' /> Create an Account
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
                Signup
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <NavLink to='/login'>Login</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
      {successMsg && (
        <SuccessMessage
          header={'Account Creation Succesful'}
          seconds={redirectTime}
        />
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userObj) => dispatch(createUser(userObj)),
  }
}

export default connect(null, mapDispatchToProps)(Signup)
