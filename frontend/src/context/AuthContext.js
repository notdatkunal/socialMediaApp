import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../services/authApi";

const AUTH_TOKEN_KEY = "auth_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        const userData = await authApi.getMe(token);
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const login = async (email, password) => {
    const { user: u, access_token } = await authApi.login(email, password);
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, access_token);
    setUser(u);
    return u;
  };

  const register = async (email, username, password) => {
    const { user: u, access_token } = await authApi.register(email, username, password);
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, access_token);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
