// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from "react";
import { checkAuthStatus } from '../api/requests/userApi';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  userId: string | null;          
  isLoadingAuth: boolean;

  login: (user: { username: string; userId: string }) => void;  // עדכון הפרמטר ל-login
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);  // מצב לשמירת userId
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const checkStatus = async () => {
      setIsLoadingAuth(true);
      const { isAuthenticated, username: fetchedUsername, userId: fetchedUserId } = await checkAuthStatus();
      setIsLoggedIn(isAuthenticated);
      setUsername(fetchedUsername);
      setUserId(fetchedUserId || null);
      setIsLoadingAuth(false);
    };
    checkStatus();
  }, []);

  const login = (user: { username: string; userId: string }) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setUserId(user.userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setUserId(null);
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    username,
    userId,
    isLoadingAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
