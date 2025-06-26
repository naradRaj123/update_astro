import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('instaAstroUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('instaAstroUsers')) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const userData = { email: foundUser.email, id: foundUser.id };
          setUser(userData);
          localStorage.setItem('instaAstroUser', JSON.stringify(userData));
          setLoading(false);
          resolve(userData);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem('instaAstroUsers')) || [];
        if (users.find(u => u.email === email)) {
          setLoading(false);
          reject(new Error('User already exists with this email.'));
          return;
        }
        const newUser = { id: Date.now().toString(), email, password };
        users.push(newUser);
        localStorage.setItem('instaAstroUsers', JSON.stringify(users));
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('instaAstroUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}