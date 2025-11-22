import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../lib/api";
import { setAuthToken, clearAuthToken, getAuthToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAuthToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  async function signin(email, password) {
    const res = await apiPost("/auth/signin", { email, password });
    setToken(res.token);
    setAuthToken(res.token);
    try {
      const me = await apiGet("/auth/me");
      setUser(me);
    } catch {
      // ignore; user can continue with token-only session
    }
    return res;
  }

  async function signup(name, email, password) {
    const res = await apiPost("/auth/signup", { name, email, password });
    // optional: auto sign-in by calling signin
    return res;
  }

  function signout() {
    clearAuthToken();
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    // Load current user on refresh if token exists
    async function loadMe() {
      if (!token) { setUser(null); return; }
      try {
        const me = await apiGet("/auth/me");
        setUser(me);
      } catch {
        // token invalid/expired
        clearAuthToken();
        setToken(null);
        setUser(null);
      }
    }
    loadMe();
  }, [token]);

  const value = useMemo(() => ({
    token,
    user,
    isAuthed: !!token,
    isAdmin: user?.role === "admin",
    signin,
    signup,
    signout,
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
