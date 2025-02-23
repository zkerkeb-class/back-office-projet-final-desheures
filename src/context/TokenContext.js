/* eslint-disable comma-dangle */
import React, { createContext, useContext, useState, useEffect } from 'react';

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const clearToken = () => {
    setToken(null);
  };

  const value = {
    token,
    updateToken,
    clearToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within TokenProvider');
  }
  return context;
};
