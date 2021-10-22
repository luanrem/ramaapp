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

interface previousUserCredentials extends UserUpdateCredentials {
  id: number
}

interface DeleteUserCredentials {
  id: number
}

interface AuthContextData {
  updateUser(
    currentUser: previousUserCredentials,
    updatedUser: UserUpdateCredentials
  ): Promise<void>
  deleteUser(data: DeleteUserCredentials[]): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AdminProvider({ children }) {
  const { addToast } = useToast()

  const updateUser = useCallback(async (currentUser, updatedUser) => {
    console.log('User', currentUser)
    console.log('updatedUser', updatedUser)

    var finalUserRequest = {}

    const updatedUsersKeys = Object.keys(updatedUser)

    updatedUsersKeys.forEach(key => {
      // TODO[epic=project] Group needs to send the number
      // console.log('compare', user[key], updatedUser[key])
      // If the passed update is null we don't need to update
      // if the updatedUser is diferent of the curent user we send the update
      if (updatedUser[key] !== '' && updatedUser[key] !== currentUser[key]) {
        finalUserRequest[key] = updatedUser[key]
      }
    })

    console.log('final', finalUserRequest)

    await api.put(`users/${currentUser.id}`, finalUserRequest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }, [])

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
