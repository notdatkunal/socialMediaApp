import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Hello, {user?.username ?? "User"}!</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.hint}>You're signed in. This is your homepage.</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 24,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 16,
    padding: 28,
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "700",
    color: "#eee",
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: "#a0a0a0",
    marginBottom: 16,
  },
  hint: {
    fontSize: 16,
    color: "#ccc",
  },
  logoutButton: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutText: {
    color: "#e94560",
    fontSize: 16,
    fontWeight: "600",
  },
});
