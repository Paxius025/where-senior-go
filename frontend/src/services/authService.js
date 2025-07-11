const API_BASE = "http://localhost:3000/api";

async function registerService({ email, username, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to register");
  }

  return await res.json(); // { userId: ... }
}

async function loginService({ emailOrUsername, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ emailOrUsername, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to login");
  }

  return await res.json(); // { token: ... }
}

async function checkSession() {
  const res = await fetch(`${API_BASE}/auth/check-session`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to check session");
  }

  return await res.json(); // { valid: true }
}
async function logoutService() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to logout");
  }

  return await res.json(); // { message: "Logged out successfully" }
}

export { registerService, loginService, checkSession, logoutService };
