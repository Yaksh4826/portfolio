const base = import.meta.env.VITE_API_URL || "/api";

 

let authToken = localStorage.getItem("auth_token") || null;

export function setAuthToken(token) {
  authToken = token;
  if (token) localStorage.setItem("auth_token", token);
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem("auth_token");
}

export function getAuthToken() {
  return authToken;
}

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : data?.message || "Request failed");
  }
  return data;
}

export const apiGet = (path) => request(path);
export const apiPost = (path, body) => request(path, { method: "POST", body });
export const apiPut = (path, body) => request(path, { method: "PUT", body });
export const apiDelete = (path) => request(path, { method: "DELETE" });
