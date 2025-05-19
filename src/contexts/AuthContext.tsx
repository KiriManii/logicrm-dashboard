// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  
  // Effect to parse user from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<User & { exp: number }>(token);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token is expired
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          return;
        }
        
        setUser({
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role
        });
      } catch (error) {
        console.error('Failed to decode token', error);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [token]);
  
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll simulate a successful login with a mock token
      const mockResponse = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2FiYyIsImVtYWlsIjoiZGF2aWQubGV3aXNAb3B0cmFzZXJ2ZS5jb20iLCJuYW1lIjoiRGF2aWQgTGV3aXMiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE5OTk5OTk5OTl9.7x9_L_XU8penrJkLdlvDKbB9vuyxTvZGLzEfqun9EVw'
      };
      
      setToken(mockResponse.token);
      localStorage.setItem('token', mockResponse.token);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isAuthenticated: !!token,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
