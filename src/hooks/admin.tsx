import { createContext, useCallback, useContext } from 'react'
import api from '../services/api'
import { useToast } from './toast'

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
  id: number
}

interface AuthContextData {
  updateUser(data: UserUpdateCredentials): Promise<void>
  deleteUser(data: DeleteUserCredentials[]): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AdminProvider({ children }) {
  const { addToast } = useToast()

  const updateUser = useCallback(async () => {}, [])

  const deleteUser = useCallback(async data => {
    data.forEach(async e => {
      await api
        .delete(`users/${e}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 200) {
            addToast({
              type: 'success',
              title: 'Usuário removido com sucesso',
              description: `O usuário ${res.data.username} foi removido com sucesso`
            })
          } else {
            addToast({
              type: 'error',
              title: 'Erro ao remover o usuário',
              description: `O usuário ${res.data.username} não foi removido, favor verificar`
            })
          }
        })
    })
  }, [])

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
