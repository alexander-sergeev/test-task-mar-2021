import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { clearTokens, getTokens, setTokens } from '../utils/tokens';

const GET_USER = gql`
  {
    user {
      name
      picture
      locale
    }
  }
`;

interface AuthContextState {
  authenticated: boolean;
  exchangeCode: (code: string) => Promise<void>;
  profile?: {
    name: string;
    picture: string;
    locale: string;
  };
  logout: () => void;
  lastLoginTime?: number;
}

const INITIAL_STATE: AuthContextState = {
  authenticated: getTokens() != null,
  exchangeCode: async (code: string) => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [auth, setAuth] = useState(INITIAL_STATE.authenticated);
  const { data, client } = useQuery(GET_USER, { skip: !auth });

  let lastLoginTime;
  const storedLastLoginTime = localStorage.getItem('lastLoginTime');
  if (storedLastLoginTime != null) {
    lastLoginTime = parseInt(storedLastLoginTime, 10);
  }

  const exchangeCode = useCallback(
    async (code: string) => {
      const { data } = await axios.post('/proceedAuth', { code });
      setTokens(data.tokens);
      localStorage.setItem('lastLoginTime', String(Date.now()));
      setAuth(true);
      client.resetStore();
    },
    [client],
  );
  const logout = useCallback(() => {
    clearTokens();
    client.resetStore();
    setAuth(false);
  }, [client]);

  return (
    <AuthContext.Provider
      value={{
        authenticated: auth,
        exchangeCode,
        profile: data?.user,
        logout,
        lastLoginTime,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
