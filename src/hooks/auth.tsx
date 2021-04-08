import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from '../services/api';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import Router from "next/router";

interface User {
  avatar: string;
  blocked: boolean;
  confirmed: boolean;
  email: string;
  ex_participante: boolean;
  grupo: Group;
  id: number;
  nome_completo: string;
  provider: string;
  role: Role;
  telefone: string;
  username: string;
}

interface Group {
  ccreated_at: string;
  data_inicial: string;
  id: number;
  nome: string;
  nome_abreviado: string;
  // published_at: "2021-03-26T02:16:41.711Z"
  // updated_at: "2021-03-26T02:16:41.751Z"
}

interface Role {
  description: string;
  id: number;
  name: string;
  type: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signed: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }) {
  const [data, setData] = useState<AuthState>(() => {
    const {jwt, user} = parseCookies();

    if(jwt && user) {
      api.defaults.headers.authorization = `Bearer ${jwt}`;

      return { token: jwt, user: JSON.parse(user)};
    }
    
    return {} as AuthState;
  })

  useEffect(() => {
    const cookies = parseCookies()
    console.log('chegou aqui', cookies);
  }, [data])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/local', {
      identifier: email,
      password: password
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    const { jwt: token, user } = response.data;
    
    console.log("axios login", response.data);
    
    setCookie(null, 'jwt', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setCookie(null, 'user', JSON.stringify(user), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    api.defaults.headers.authorization = `Bearer ${token}`;
    
    setData({ token, user });
    
  }, []);
  
  const signUp = useCallback(async ({ username, name, email, password }) => {
    
  }, [])

  const signOut = useCallback(() => {
    console.log('deslogado')
    destroyCookie(null, 'jwt', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    Router.push('/')

  }, []) 

  return (
    <AuthContext.Provider
      value={{user: data.user, signed: false, signIn, signUp, signOut}}
    >
      {children}
    </AuthContext.Provider>
  )

}

function useAuth() {
  const context = useContext(AuthContext)

  return context;
}

export { AuthProvider, useAuth }