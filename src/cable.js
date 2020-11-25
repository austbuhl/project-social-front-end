import { createConsumer } from '@rails/actioncable'

const consumer = createConsumer('ws://localhost:5000/cable')

export default consumer
