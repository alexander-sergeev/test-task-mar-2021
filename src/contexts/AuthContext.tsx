import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface AuthContextState {
  authenticated: boolean;
  exchangeCode: (code: string) => Promise<void>;
  profile?: {
    name: string;
    picture: string;
    locale: string;
  };
}

const INITIAL_STATE: AuthContextState = {
  authenticated: localStorage.getItem('tokens') !== null,
  exchangeCode: async (code: string) => {},
};

const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [auth, setAuth] = useState(INITIAL_STATE.authenticated);
  const exchangeCode = useCallback(async (code: string) => {
    const { data } = await axios.post('/proceedAuth', { code });
    localStorage.setItem('tokens', JSON.stringify(data.tokens));
    setAuth(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: auth,
        exchangeCode,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
