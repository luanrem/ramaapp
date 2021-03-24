import { createContext, useCallback, useContext, useState } from "react";
import api from '../services/api';
import { setCookie, destroyCookie } from 'nookies';
import Router from "next/router";

interface User {
  id: string;
  avatar_url: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signed: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }) {
  const [data, setData] = useState<AuthState>({
    token: "lfjkalsdkfjasdlkfj",
    user: {
      id: "1",
      avatar_url: "lasdkfjsl",
      email: "luanrem@gmail.com",
      name: "Luan Roberto Estrada Martins"
    }
  })

  const signIn = useCallback(async ({ email, password }) => {

    // localStorage.setItem('@Gobarber:token', token);
    // localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    // api.defaults.headers.authorization = `Bearer ${token}`;

    // setData({ token, user });

    const logInfo = {
      identifier: email,
      password: password
    }
  
    const login = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/local`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInfo)
    }) 

    const loginResponse = await login.json()

    console.log(loginResponse);

    setCookie(null, 'jwt', loginResponse.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    Router.push('/admin/dashboard')

  }, []);

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
      value={{user: data.user, signed: false, signIn, signOut}}
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