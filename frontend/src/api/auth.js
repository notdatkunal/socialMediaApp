import { API_BASE_URL } from "../config/api";

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
}

export async function register(email, username, password) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }
  return data;
}

export async function getMe(token) {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch user");
  }
  return data;
}
