import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "@auth_user";
const TOKEN_STORAGE_KEY = "@auth_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(AUTH_STORAGE_KEY),
          AsyncStorage.getItem(TOKEN_STORAGE_KEY),
        ]);
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (e) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (userData, accessToken) => {
    await Promise.all([
      AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData)),
      AsyncStorage.setItem(TOKEN_STORAGE_KEY, accessToken),
    ]);
    setUser(userData);
    setToken(accessToken);
  };

  const signOut = async () => {
    await Promise.all([
      AsyncStorage.removeItem(AUTH_STORAGE_KEY),
      AsyncStorage.removeItem(TOKEN_STORAGE_KEY),
    ]);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
