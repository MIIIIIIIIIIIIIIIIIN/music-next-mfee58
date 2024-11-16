import { createContext, useContext, useState, useEffect } from "react";
import { JWT_LOGIN_POST } from "@/config/api-path";

const AuthContext = createContext();

const emptyAuth = {
  id: 0,
  email: "",
  nickname: "",
  token: "",
  account: "",
};

const storageKey = "member-auth";

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem(storageKey);
      return savedAuth ? JSON.parse(savedAuth) : { ...emptyAuth };
    }
    return { ...emptyAuth };
  });

  const login = async (email, password) => {
    try {
      const response = await fetch(JWT_LOGIN_POST, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success && result.data) {
        const account = result.data.account;
        if (!account) return { success: false };

        if (typeof window !== "undefined") {
          sessionStorage.setItem(storageKey, JSON.stringify(result.data));
        }
        setAuth(result.data);
        return { success: true, account };
      }
    } catch (ex) {
      console.error("Login error:", ex);
    }
    return { success: false };
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(storageKey);
    }
    setAuth({ ...emptyAuth });
  };

  const getAuthHeader = () => {
    return auth.token ? { Authorization: "Bearer " + auth.token } : {};
  };

  useEffect(() => {
    if (typeof window !== "undefined" && auth.token) {
      sessionStorage.setItem(storageKey, JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
