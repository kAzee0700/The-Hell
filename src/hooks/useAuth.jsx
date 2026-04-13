import { createContext, useContext, useState, useEffect } from 'react';
import { api, setToken, clearToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hell_token');
    if (token) {
      api.auth.me()
        .then(data => setUser(data.user))
        .catch(() => clearToken())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.auth.login(email, password);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const signupIndividual = async (formData) => {
    const data = await api.auth.signupIndividual(formData);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const signupCompany = async (formData) => {
    const data = await api.auth.signupCompany(formData);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signupIndividual, signupCompany }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
