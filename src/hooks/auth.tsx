import { createContext, useCallback, useContext, useState } from "react";
import api from '../services/api';

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
    const response = await api.post('auth/local', {
      identifier: email,
      password,
    });

    const { token, user } = response.data;
    console.log(response.data);

    // localStorage.setItem('@Gobarber:token', token);
    // localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    // api.defaults.headers.authorization = `Bearer ${token}`;

    // setData({ token, user });
  }, []);

  async function signOut() {
    console.log('deslogado')
  }

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