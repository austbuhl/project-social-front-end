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
  Icon,
  Label,
  Input,
} from 'semantic-ui-react'
import { useHistory, NavLink } from 'react-router-dom'
import SuccessMessage from './SuccessMessage'

const Signup = ({ createUser }) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [redirectTime, setRedirectTime] = useState(3)
  const [successMsg, setSuccessMsg] = useState(false)
  const [strength, setStrength] = useState(0)
  const [validations, setValidations] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordStrength, setShowPasswordStrength] = useState(false)
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

  const validatePassword = (e) => {
    const password = e.target.value
    let validationsCheck = [
      password.length > 5,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[!$&+,:;=?@#]/) > -1,
    ]
    let strengthValue = validationsCheck.reduce((tot, cur) => tot + cur)

    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    setValidations(validationsCheck)
    setStrength(strengthValue)
    setShowPasswordStrength(true)
  }

  return (
    <>
      <Grid textAlign='center' style={{ height: '75vh' }}>
        <Grid.Column style={{ maxWidth: 450, marginTop: '2em' }}>
          <Image src='PS_full.png' size='medium' />
          <Header as='h2' textAlign='center'>
            Create an Account
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
              <Input
                style={{ marginBottom: '1em' }}
                fluid
                iconPosition='left'
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                labelPosition={showPasswordStrength ? 'right' : null}
                placeholder='Enter Password'
                value={userInfo.password}
                onChange={validatePassword}
              >
                <Icon name='lock' />
                <input />
                {showPasswordStrength && (
                  <Label
                    basic
                    style={{ cursor: 'help' }}
                    onMouseOver={() => setShowPassword(true)}
                    onMouseOut={() => setShowPassword(false)}
                  >
                    {showPassword ? '🙈' : '👀'}
                  </Label>
                )}
              </Input>

              <Button primary fluid size='large' disabled={strength < 4}>
                Signup
              </Button>
            </Segment>
          </Form>
          {showPasswordStrength && (
            <Segment>
              <div className='strength'>
                <span
                  className={`bar bar-1 ${strength > 0 ? 'bar-show' : ''}`}
                />
                <span
                  className={`bar bar-2 ${strength > 1 ? 'bar-show' : ''}`}
                />
                <span
                  className={`bar bar-3 ${strength > 2 ? 'bar-show' : ''}`}
                />
                <span
                  className={`bar bar-4 ${strength > 3 ? 'bar-show' : ''}`}
                />
              </div>
              <ul className='validations'>
                <li>
                  {validations[0] ? (
                    <Icon name='check' color='green' />
                  ) : (
                    <Icon name='cancel' color='red' />
                  )}
                  must be at least 5 characters
                </li>
                <li>
                  {validations[1] ? (
                    <Icon name='check' color='green' />
                  ) : (
                    <Icon name='cancel' color='red' />
                  )}
                  must contain a capital letter
                </li>
                <li>
                  {validations[2] ? (
                    <Icon name='check' color='green' />
                  ) : (
                    <Icon name='cancel' color='red' />
                  )}
                  must contain a number
                </li>
                <li>
                  {validations[3] ? (
                    <Icon name='check' color='green' />
                  ) : (
                    <Icon name='cancel' color='red' />
                  )}
                  must contain one of !$&+,:;=?@#
                </li>
              </ul>
            </Segment>
          )}
          {successMsg && (
            <SuccessMessage
              header={'Account Creation Succesful'}
              seconds={redirectTime}
            />
          )}
          <Message>
            Already have an account? <NavLink to='/login'>Login</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userObj) => dispatch(createUser(userObj)),
  }
}

export default connect(null, mapDispatchToProps)(Signup)
