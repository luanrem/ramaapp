/* eslint-disable camelcase */
import { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'
import routes from '../routes/routes'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'

export interface Group {
  created_at: string
  data_inicial: string
  id: number
  nome: string
  nome_abreviado: string
}

export interface Role {
  description: string
  id: number
  name: string
  type: string
}

export interface User {
  avatar: {
    url: string
  }
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
  photoURL: string
  smallPhotoURL: string
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

interface ChangePasswordCredentials {
  email: string
  password: string
  newPassword: string
  confirmPassword: string
}

interface AuthContextData {
  user: User
  menus: Array<Routes>
  signed: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signUp(credentials: SignUpCredentials): Promise<void>
  updateUser(data: UserUpdateCredentials): Promise<void>
  updateProfilePicture(data: FormData): Promise<void>
  changePassword(data: ChangePasswordCredentials): Promise<void>
  photoURL: string
  smallPhotoURL: string
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }) {
  const [data, setData] = useState<AuthState>(() => {
    const { jwt, user, menus, photoURL, smallPhotoURL } = parseCookies()

    let userParsed, menusParsed
    try {
      menusParsed = JSON.parse(menus)
      userParsed = JSON.parse(user)
    } catch (err) {
      // 👇️ This runs
      console.log('Error: ', err.message)
    }

    if (jwt && user && menus && photoURL && smallPhotoURL) {
      api.defaults.headers.common.Authorization = `Bearer ${jwt}`
      console.log('photo')
      return {
        token: jwt,
        user: userParsed,
        menus: menusParsed,
        photoURL,
        smallPhotoURL
      }
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

      // console.log('resultado do menuValidation', menusResult)
      return menusResult
    },
    []
  )

  const signIn = useCallback(async ({ email, password }) => {
    delete api.defaults.headers.common.Authorization
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
    console.log('user', user)
    let photoURL
    let smallPhotoURL = null

    if (response.data.user.avatar !== null) {
      photoURL = process.env.NEXT_PUBLIC_API_URL + response.data.user.avatar.url

      smallPhotoURL =
        process.env.NEXT_PUBLIC_API_URL +
        response.data.user.avatar.formats.small.url

      setCookie(null, 'photoURL', photoURL, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      setCookie(null, 'smallPhotoURL', smallPhotoURL, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
    } else {
      photoURL = 'https://avatars.dicebear.com/api/initials/' + user.username
      smallPhotoURL = photoURL

      setCookie(null, 'photoURL', photoURL, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      setCookie(null, 'smallPhotoURL', smallPhotoURL, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
    }

    const menusResponse = await api.get('funcaos/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const { menus } = menusResponse.data
    // console.log('menus', menus)

    const paths = menuValidation(menus)
    // console.log(paths)

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

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setData({ token, user, menus: paths, photoURL, smallPhotoURL })
  }, [])

  const signUp = useCallback(async ({ username, name, email, password }) => {
    delete api.defaults.headers.common.Authorization
    const response = await api.post(
      // TODO[epic=project] field blocked needs to be false as default
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

    // console.log('response', response.data)

    const photoURL =
      process.env.NEXT_PUBLIC_API_URL + response.data.user.avatar.url

    const smallPhotoURL =
      process.env.NEXT_PUBLIC_API_URL +
      response.data.user.avatar.formats.small.url

    // console.log('photo')

    const { jwt: token, user } = response.data
    // console.log('axios login', response.data)

    const menusResponse = await api.get('funcaos/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const { menus } = menusResponse.data
    // console.log('menus', menus)

    const paths = menuValidation(menus)
    // console.log(paths)

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
    setCookie(null, 'photoURL', photoURL, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    setCookie(null, 'smallPhotoURL', smallPhotoURL, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setData({ token, user, menus: paths, photoURL, smallPhotoURL })
  }, [])

  const signOut = useCallback(() => {
    // console.log('deslogado')
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
    destroyCookie(null, 'photoURL', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    destroyCookie(null, 'smallPhotoURL', {
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

      // console.log('requestData', requestData)

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
      destroyCookie(null, 'photoURL', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      destroyCookie(null, 'smallPhotoURL', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      Router.push('/auth/signin')
    },
    []
  )

  const updateProfilePicture = useCallback(async form => {
    // Upload photo to repo
    const response = await api.post('/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    })
    // console.log('response of repo put', response)

    const photoURL = process.env.NEXT_PUBLIC_API_URL + response.data[0].url

    const smallPhotoURL =
      process.env.NEXT_PUBLIC_API_URL + response.data[0].formats.small.url

    setCookie(null, 'photoURL', photoURL, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    setCookie(null, 'smallPhotoURL', smallPhotoURL, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    // Delete the last ID
    if (response.data[0].id > 1) {
      const id = response.data[0].id - 1
      api
        .delete(`upload/files/${id}`)
        .then(response => console.log('foto deletada', response))
    }

    // update the actual profile picture
    api
      .put('/users/me', {
        avatar: {
          id: response.data[0].id
        }
      })
      .then(response => console.log('atualizado perfil', response))

    Router.reload()
  }, [])

  const changePassword = useCallback(
    async ({ email, password, newPassword, confirmPassword }) => {
      // console.log('chegou aqui')

      const response = await api.post(
        'users/updatepassword',
        {
          identifier: email,
          password,
          newPassword,
          confirmPassword
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      const { jwt: token } = response.data

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setCookie(null, 'jwt', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      // console.log('Usuario Atualizado', response.data)
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
        updateUser,
        changePassword,
        photoURL: data.photoURL,
        smallPhotoURL: data.smallPhotoURL,
        updateProfilePicture
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
