const KEY = "auth";

export function saveAuth({ token, role }) {
  localStorage.setItem(KEY, JSON.stringify({ token, role }));
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { token: null, role: null };
  } catch {
    return { token: null, role: null };
  }
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}
