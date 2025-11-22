const rawBase = import.meta.env.VITE_API_URL;
// Prefer local proxy during localhost development
const isLocalhost = typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
// Normalize base: if an absolute base is provided but doesn't end with /api, append it.
let base = rawBase || "/api";
if (rawBase && !/\/api\/?$/i.test(rawBase)) {
  base = rawBase.replace(/\/$/, "") + "/api";
}
if (isLocalhost) {
  base = "/api";
}

 

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
  const url = `${base}${path}`;
  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  } catch (e) {
    throw new Error(`Network error contacting ${url}`);
  }
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
