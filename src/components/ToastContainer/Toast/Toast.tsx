import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { ToastMessage, useToast } from '../../../hooks/toast'

import { Container } from '../../../styles/components/Toast'

interface ToastProps {
  message: ToastMessage
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

export default function Toast({ message }: ToastProps) {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000)

    // Se eu coloco uma função no return, a função é executada toda vez que o componente deixar de existir
    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message.id])

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      initial={{
        x: 100
      }}
      animate={{
        x: 0
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30
      }}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}
