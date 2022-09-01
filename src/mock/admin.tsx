import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react'
import api from '../services/api'
import { User } from './auth'
import { useToast } from '../hooks/toast'
import { mockGroups } from './mock'

export interface GroupUsersData {
  id: number
  username: string
  email: string
  telefone: string
  nome_completo: string
  avatar: {
    id: string
    url: string
  }
}

export interface GroupFacilitadoresData {
  id: number
  nome_usuario: number
  nome: string
  avatar: {
    id: number
    url: string
  }
}

export interface FacilitadorGroups {
  id: number
  nome: string
  data_inicial: string
  nome_abreviado: string
  whatsapp_link: string
  picture: string
}

export interface FacilitadorData {
  id: number
  nome_usuario: User
  nome: string
  grupos_que_facilita: FacilitadorGroups[]
}

export interface GroupsData {
  id: number
  nome: string
  data_inicial: string
  nome_abreviado: string
  users: GroupUsersData[]
  facilitadores: GroupFacilitadoresData[]
}

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
  tabValue: number
  setTabvalue: Dispatch<SetStateAction<number>>
  groupsContext: GroupsData[]
  facilitadoresContext: FacilitadorData[]
  setGroupsContext: Dispatch<SetStateAction<GroupsData[]>>
  getGroupsData(): Promise<void>
  getFacilitadoresData(): Promise<void>
  removeFacilitadorFromGroup(
    userID: number,
    group: string,
    allGroups: GroupsData[]
  ): Promise<void>
  addFacilitadorToGroup(
    facilitadorId: number,
    groupId: number,
    allGroups: GroupsData[]
  ): Promise<void>
  updateUser(
    currentUser: previousUserCredentials,
    updatedUser: UserUpdateCredentials
  ): Promise<void>
  deleteUser(data: DeleteUserCredentials[]): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AdminMockProvider({ children }) {
  const { addToast } = useToast()
  const [groupsContext, setGroupsContext] = useState<GroupsData[]>()
  const [facilitadoresContext, setFacilitadoresContext] = useState<
    FacilitadorData[]
  >()
  const [tabValue, setTabvalue] = useState(0)

  const getFacilitadoresData = useCallback(async () => {
    const facilitadores = []
    setFacilitadoresContext(facilitadores)
  }, [])

  const getGroupsData = useCallback(async () => {
    // const response = await api.get('grupos', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    const mockGroup = JSON.stringify(mockGroups)
    setGroupsContext(JSON.parse(mockGroup))
  }, [])

  const removeFacilitadorFromGroup = useCallback(
    async (userId, group, allGroups) => {
      const groupResponse = await api.get('grupos', {
        params: {
          nome_abreviado: group
        }
      })
      const facilitadorExist = groupResponse.data[0].facilitadores.find(
        user => user.id === userId
      )

      if (!facilitadorExist) {
        addToast({
          type: 'error',
          title: 'Erro ao remover o facilitador',
          description: `O facilitador já se encontra removido, favor verificar`
        })
        return
      }

      const newFacilitadores = groupResponse.data[0].facilitadores.filter(
        // eslint-disable-next-line array-callback-return
        user => {
          if (user.id !== userId) return user
        }
      )

      await api
        .put(
          `grupos/${groupResponse.data[0].id}`,
          {
            facilitadores: newFacilitadores
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            const newGroupsValue = allGroups.map(element => {
              if (element.id === response.data.id) {
                element.facilitadores = response.data.facilitadores
                return element
              } else {
                return element
              }
            })
            setGroupsContext(newGroupsValue)

            if (newGroupsValue) {
              addToast({
                type: 'success',
                title: `O facilitador foi removido com sucesso`,
                description: ''
              })
            } else {
              addToast({
                type: 'error',
                title: 'Erro ao remover o facilitador',
                description: `Houve um erro ao remover o facilitador, recarregue a página e tente novamente.`
              })
            }
          }
        })
    },
    []
  )

  const addFacilitadorToGroup = useCallback(
    async (facilitadorId, groupId, allGroups) => {
      console.log('dados', facilitadorId, groupId)
      const groupResponse = await api.get(`grupos?id=${groupId}`)

      const facilitadorExist = groupResponse.data[0].facilitadores.find(
        user => user.id === facilitadorId
      )

      if (facilitadorExist) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar o facilitador',
          description: `O facilitador já se encontra no grupo, favor verificar`
        })
        return
      }

      await api
        .put(`grupos/${groupId}`, {
          facilitadores: [
            ...groupResponse.data[0].facilitadores,
            {
              id: facilitadorId
            }
          ]
        })
        .then(response => {
          if (response.status === 200) {
            const newGroupsValue = allGroups.map(element => {
              if (element.id === response.data.id) {
                element.facilitadores = response.data.facilitadores
                return element
              } else {
                return element
              }
            })
            setGroupsContext(newGroupsValue)

            if (newGroupsValue) {
              addToast({
                type: 'success',
                title: `O facilitador foi adicionado com sucesso`,
                description: ''
              })
            } else {
              addToast({
                type: 'error',
                title: 'Erro ao adicionar o facilitador',
                description: `Houve um erro ao adicionar o facilitador, recarregue a página e tente novamente.`
              })
            }
          }
        })

      // console.log('gruposquefacilita', facilitadorGroups)
    },
    []
  )

  const updateUser = useCallback(async (currentUser, updatedUser) => {
    // console.log('User', currentUser)
    // console.log('updatedUser', updatedUser)

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

    // console.log('final', finalUserRequest)

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
        tabValue,
        setTabvalue,
        groupsContext,
        facilitadoresContext,
        setGroupsContext,
        getGroupsData,
        getFacilitadoresData,
        removeFacilitadorFromGroup,
        addFacilitadorToGroup,
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

export { AdminMockProvider, useAdmin }
