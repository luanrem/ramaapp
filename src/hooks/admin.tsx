import { createContext, useCallback, useContext } from 'react'

interface UserUpdateCredentials {
  email?: string
  nome_completo?: string
  telefone?: string
  username?: string
  Cidade?: string
  Estado?: string
  Nacimento?: Date
  sobre_mim?: string
  endereco?: string
  endereco_adicional?: string
}

interface DeleteUserCredentials {
  email: string
  id: number
}

interface AuthContextData {
  updateUser(data: UserUpdateCredentials): Promise<void>
  deleteUser(data: DeleteUserCredentials): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AdminProvider({ children }) {
  const updateUser = useCallback(async () => {}, [])

  const deleteUser = useCallback(async () => {}, [])

  return (
    <AuthContext.Provider
      value={{
        updateUser,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAdmin() {
  const context = useContext(AuthContext)

  return context
}

export { AdminProvider, useAdmin }
