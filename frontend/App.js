import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import AuthStack from "./src/navigation/AuthStack";
import MainStack from "./src/navigation/MainStack";

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
