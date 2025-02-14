import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { clearTokens, getTokens, setTokens } from '../utils/tokens';
import logger from '../config/logger';

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

  const exchangeCode = useCallback(async (code: string) => {
    logger.info(`Exchanging one-time auth code for tokens`);
    const { data } = await axios.post('/proceedAuth', { code });
    setTokens(data.tokens);
    localStorage.setItem('lastLoginTime', String(Date.now()));
    setAuth(true);
    logger.info(`Exchange complete, we're authenticated now`);
  }, []);
  const logout = useCallback(() => {
    logger.info(`Logging out`);
    clearTokens();
    client.clearStore();
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
