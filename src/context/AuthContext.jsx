import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'std-sameera-2026',
  name: 'Sameera Bhanu',
  email: 'sameera@learnova.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  role: 'AI & Systems Fellow',
  institution: 'SVECW Bhimavaram',
  bio: 'First-year B.Tech CSE scholar passionate about autonomous AI systems, distributed consensus architectures, and high-performance frontend engineering.',
  xp: 3450,
  streak: 14,
  joined: 'November 2026',
  level: 'Level 4 Apprentice Architect'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('learnova_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('learnova_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('learnova_user');
      }
    } catch (e) {
      console.error('Failed to sync user to localStorage', e);
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated realistic authentication
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }
    const loggedInUser = {
      ...DEFAULT_USER,
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = ({ name, email, password, institution }) => {
    if (!name || !email || !password) {
      throw new Error('All required fields must be completed.');
    }
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      role: 'Student Member',
      institution: institution || 'Engineering Institute',
      bio: 'Enthusiastic developer learning next-generation computing technologies on LEARNOVA.',
      xp: 100,
      streak: 1,
      joined: 'Today',
      level: 'Level 1 Explorer'
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      defaultUserCredentials: { email: 'sameera@learnova.edu', password: 'password123' }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
