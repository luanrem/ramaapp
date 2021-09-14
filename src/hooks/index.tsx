import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import { AdminProvider } from './admin'

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <AdminProvider>{children}</AdminProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
