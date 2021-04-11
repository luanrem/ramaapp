import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  )
}
