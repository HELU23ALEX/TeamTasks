import React, { createContext, useState } from 'react';
import { authApi } from '../../features/auth/api/auth.api';
import type { User } from '../../features/auth/types/auth.types';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Export the context so the hook file can import it
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    
    const authData: User = { 
      ...response.user, 
      token: response.access_token 
    };

    setUser(authData);
    localStorage.setItem('auth_user', JSON.stringify(authData));
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.registerUser({ name, email, password });
    
    const authData: User = { 
      ...response.user, 
      token: response.access_token 
    };

    setUser(authData);
    localStorage.setItem('auth_user', JSON.stringify(authData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};