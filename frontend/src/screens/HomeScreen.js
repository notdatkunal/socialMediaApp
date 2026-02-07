import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Logged in as</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16213e",
    padding: 24,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 28,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#eee",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#a0a0a0",
  },
  logoutButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e94560",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#e94560",
    fontSize: 16,
    fontWeight: "600",
  },
});
