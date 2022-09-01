import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import { AdminProvider } from './admin'
import { AuthMockProvider } from '../mock/auth'
import { AdminMockProvider } from '../mock/admin'

export default function AppProvider({ children }) {
  return (
    <AuthMockProvider>
      <AdminMockProvider>
        <AuthProvider>
          <ToastProvider>
            <AdminProvider>{children}</AdminProvider>
          </ToastProvider>
        </AuthProvider>
      </AdminMockProvider>
    </AuthMockProvider>
  )
}
