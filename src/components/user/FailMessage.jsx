import React from 'react'
import { Message } from 'semantic-ui-react'

const FailMessage = ({ error }) => {
  return (
    <Message negative>
      <Message.Header>{error}</Message.Header>
      <p>Please try again.</p>
    </Message>
  )
}

export default FailMessage
