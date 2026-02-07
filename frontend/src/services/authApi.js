import API_BASE_URL from "../config/api";

async function request(path, options = {}) {
  const url = `${API_BASE_URL}/api/auth${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const authApi = {
  async login(email, password) {
    return request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email, username, password) {
    return request("/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });
  },

  async getMe(token) {
    const url = `${API_BASE_URL}/api/auth/me`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Unauthorized");
    return data;
  },
};
