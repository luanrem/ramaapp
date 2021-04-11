import { ToastMessage } from '../../hooks/toast'

import { Container } from '../../styles/components/ToastContainer'
import Toast from './Toast/Toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

export default function ToastContainer({ messages }: ToastContainerProps) {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  )
}
