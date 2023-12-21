import { AuthContext } from './context';
import { useAuth } from '../hook';

import React, { FC, PropsWithChildren } from 'react'

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{
      user, setUser(user) {
        console.log(user);

      },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

