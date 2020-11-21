import React from 'react'
import { Message } from 'semantic-ui-react'

const SuccessMessage = ({ seconds, header }) => {
  return (
    <Message positive>
      <Message.Header>{header}</Message.Header>
      <p>Redirecting you in {seconds}...</p>
    </Message>
  )
}

export default SuccessMessage
