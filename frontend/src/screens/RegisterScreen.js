import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { register } from "../api/auth";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email.trim() || !username.trim() || !password) {
      Alert.alert("Error", "Please fill email, username and password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { user, access_token } = await register(email.trim(), username.trim(), password);
      await signIn(user, access_token);
    } catch (err) {
      Alert.alert("Registration failed", err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoComplete="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Password (min 6 characters)"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password-new"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16213e",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  input: {
    backgroundColor: "#0f0f1a",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#eee",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#e94560",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#e94560",
    fontSize: 15,
  },
});
