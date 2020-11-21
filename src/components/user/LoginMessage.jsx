import React from 'react'
import { Message } from 'semantic-ui-react'

const LoginMessage = ({ seconds }) => {
  return (
    <Message positive>
      <Message.Header>Login Succesful</Message.Header>
      <p>Redirecting you in {seconds}...</p>
    </Message>
  )
}

export default LoginMessage
