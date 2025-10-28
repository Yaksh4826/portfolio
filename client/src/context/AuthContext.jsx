import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiPost } from "../lib/api";
import { setAuthToken, clearAuthToken, getAuthToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAuthToken());

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  async function signin(email, password) {
    const res = await apiPost("/users/signin", { email, password });
    setToken(res.token);
    return res;
  }

  async function signup(name, email, password) {
    const res = await apiPost("/users/signup", { name, email, password });
    // optional: auto sign-in by calling signin
    return res;
  }

  function signout() {
    clearAuthToken();
    setToken(null);
  }

  const value = useMemo(() => ({ token, signin, signup, signout, isAuthed: !!token }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
