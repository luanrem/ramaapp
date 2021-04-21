/* eslint-disable camelcase */
import { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'
import routes from '../routes/routes'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'

interface Group {
  created_at: string
  data_inicial: string
  id: number
  nome: string
  nome_abreviado: string
}

interface Role {
  description: string
  id: number
  name: string
  type: string
}

interface User {
  avatar: string
  blocked: boolean
  confirmed: boolean
  email: string
  ex_participante: boolean
  funcao: {
    id: number
    Funcao: string
  }
  grupo: Group
  id: number
  nome_completo: string
  provider: string
  role: Role
  telefone: string
  username: string
  Cidade: string
  Estado: string
  Nacimento: Date
  sobre_mim: string
  endereco: string
  endereco_adicional: string
}

interface Menus {
  id: number
  Ativo: boolean
  Name: string
  path: string
}

interface AuthState {
  token: string
  user: User
  menus: Array<Routes>
}

interface Routes {
  name: string
  icon: string
  path: string
  layout: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpCredentials {
  username: string
  name: string
  email: string
  password: string
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

interface AuthContextData {
  user: User
  menus: Array<Routes>
  signed: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signUp(credentials: SignUpCredentials): Promise<void>
  updateUser(data: UserUpdateCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }) {
  const [data, setData] = useState<AuthState>(() => {
    const { jwt, user, menus } = parseCookies()

    if (jwt && user && menus) {
      api.defaults.headers.authorization = `Bearer ${jwt}`

      return { token: jwt, user: JSON.parse(user), menus: JSON.parse(menus) }
    }

    return {} as AuthState
  })

  const menuValidation = useCallback(
    (sideMenus: Array<Menus>): Array<Routes> => {
      const menusResult = []

      sideMenus.forEach(element => {
        const found = routes.find(e => e.path === element.path)
        if (found && element.Ativo === true) {
          menusResult.push(found)
        }
      })

      console.log('resultado do menuValidation', menusResult)
      return menusResult
    },
    []
  )

  const signIn = useCallback(async ({ email, password }) => {
    delete api.defaults.headers.authorization
    const response = await api.post(
      'auth/local',
      {
        identifier: email,
        password: password
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    const { jwt: token, user } = response.data
    console.log('axios login', response.data)

    const menusResponse = await api.get('funcaos/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const { menus } = menusResponse.data
    console.log('menus', menus)

    const paths = menuValidation(menus)
    console.log(paths)

    setCookie(null, 'jwt', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setCookie(null, 'user', JSON.stringify(user), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setCookie(null, 'menus', JSON.stringify(paths), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setData({ token, user, menus: paths })
  }, [])

  const signUp = useCallback(async ({ username, name, email, password }) => {
    const response = await api.post(
      'auth/local/register',
      {
        username: username,
        nome_completo: name,
        email: email,
        password: password,
        funcao: {
          id: 5
        }
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    const { jwt: token, user } = response.data
    console.log('axios login', response.data)

    const menusResponse = await api.get('funcaos/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const { menus } = menusResponse.data
    console.log('menus', menus)

    const paths = menuValidation(menus)
    console.log(paths)

    setCookie(null, 'jwt', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setCookie(null, 'user', JSON.stringify(user), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setCookie(null, 'menus', JSON.stringify(paths), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user, menus: paths })
  }, [])

  const signOut = useCallback(() => {
    console.log('deslogado')
    destroyCookie(null, 'jwt', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    destroyCookie(null, 'user', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    destroyCookie(null, 'menus', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    Router.push('/')
  }, [])

  const updateUser = useCallback(
    async ({
      email,
      nome_completo,
      telefone,
      username,
      Cidade,
      Estado,
      Nacimento,
      sobre_mim,
      endereco,
      endereco_adicional
    }) => {
      const requestData: UserUpdateCredentials = {}

      if (email) requestData.email = email
      if (nome_completo) requestData.nome_completo = nome_completo
      if (telefone) requestData.telefone = telefone
      if (username) requestData.username = username
      if (Cidade) requestData.Cidade = Cidade
      if (Estado) requestData.Estado = Estado
      if (Nacimento) requestData.Nacimento = Nacimento
      if (sobre_mim) requestData.sobre_mim = sobre_mim
      if (endereco) requestData.endereco = endereco
      if (endereco_adicional)
        requestData.endereco_adicional = endereco_adicional

      console.log('requestData', requestData)

      const response = await api.put('users/me', requestData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log('Usuario Atualizado', response.data)

      destroyCookie(null, 'jwt', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      destroyCookie(null, 'user', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      destroyCookie(null, 'menus', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      Router.push('/auth/signin')
    },
    []
  )

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        menus: data.menus,
        signed: false,
        signIn,
        signUp,
        signOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
