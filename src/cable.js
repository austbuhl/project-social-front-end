import { createConsumer } from '@rails/actioncable'

const consumer = createConsumer('wss://project-social-api.herokuapp.com/cable')

export default consumer
