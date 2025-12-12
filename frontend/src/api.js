const API_BASE = ""; 

export async function apiRequest(path, { method = "GET", body, token } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || `Error HTTP ${res.status}`);
  }
  return data;
}

export const AuthAPI = {
  register: (email, password) =>
    apiRequest("/users/register", { method: "POST", body: { email, password } }),
  login: (email, password) =>
    apiRequest("/users/login", { method: "POST", body: { email, password } }),
};

export const ProductsAPI = {
  list: () => apiRequest("/products"),
  create: (product, token) =>
    apiRequest("/products", { method: "POST", body: product, token }),
  update: (id, product, token) =>
    apiRequest(`/products/${id}`, { method: "PUT", body: product, token }),
  remove: (id, token) =>
    apiRequest(`/products/${id}`, { method: "DELETE", token }),
};
