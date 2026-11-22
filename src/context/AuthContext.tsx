'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

export type UserRole = 'student' | 'tutor' | 'admin';
export type UserPlan = 'free' | 'pro';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  phone?: string;
  bio?: string;
  image?: string;
  bookmarks?: string[];
  createdAt: string;
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateLocalUser: (updatedData: Partial<IUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('mentorlagbe_token');
    const storedUser = localStorage.getItem('mentorlagbe_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Verify with server quietly
        api.get('/auth/me')
          .then((res) => {
            if (res.data.success && res.data.data) {
              setUser(res.data.data);
              localStorage.setItem('mentorlagbe_user', JSON.stringify(res.data.data));
            }
          })
          .catch(() => {
            // Keep local data or handle expired token gracefully
          })
          .finally(() => setLoading(false));
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: IUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('mentorlagbe_token', newToken);
    localStorage.setItem('mentorlagbe_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mentorlagbe_token');
    localStorage.removeItem('mentorlagbe_user');
    window.location.href = '/';
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success && res.data.data) {
        setUser(res.data.data);
        localStorage.setItem('mentorlagbe_user', JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const updateLocalUser = (updatedData: Partial<IUser>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem('mentorlagbe_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshUser,
        updateLocalUser,
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
