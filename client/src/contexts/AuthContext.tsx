// contexts/AuthContext.tsx
import React, {createContext, useContext, useState, useEffect,
} from 'react';
import type { ReactNode } from "react";
import { checkAuthStatus } from '../api/requests/userApi'; 

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  isLoadingAuth: boolean; 
  
  login: (username: string) => void;
  logout: () => void;
}

// יצירת הקונטקסט
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true); 

  useEffect(() => {
    const checkStatus = async () => {
      setIsLoadingAuth(true);
      const { isAuthenticated, username: fetchedUsername } =
        await checkAuthStatus();
      setIsLoggedIn(isAuthenticated);
      setUsername(fetchedUsername);
      setIsLoadingAuth(false);
    };
    checkStatus();
  }, []);

  const login = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    username,
    isLoadingAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};