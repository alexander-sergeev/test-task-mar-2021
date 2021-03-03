import axios from 'axios';
import React, { createContext, useCallback, useContext } from 'react';

interface AuthContextState {
  exchangeCode: (code: string) => Promise<void>;
}

const INITIAL_STATE: AuthContextState = {
  exchangeCode: async (code: string) => {},
};

const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const exchangeCode = useCallback(async (code: string) => {
    const { data } = await axios.post('/proceedAuth', { code });
    localStorage.setItem('tokens', data.tokens);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        exchangeCode,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
