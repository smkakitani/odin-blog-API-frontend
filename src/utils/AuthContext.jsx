// React
import { createContext, useContext, useState } from "react";



// Create default context
const AuthContext = createContext({
  token: "",
  user: "",
  onLogin: () => {},
  onLogout: () => {},
});

// Create custom provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("user") ?? "");
  const [token, setToken ] = useState(() => localStorage.getItem("token") ?? "");

  // Get user's token
  const handleLogin = async (userData) => {
    const user = userData;
    const userToken = user.token;
    const username = user.user.username ?? user.user.firstName;

    setToken(userToken);
    setUser(username);

    // Keep user logged in even after refreshing page
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", username);
  }

  const handleLogout = () => {
    setToken("");
    setUser("");

    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (<AuthContext value={value}>{children}</AuthContext>);
};

// Create custom hook to use the context with authentication
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used with AuthProvider");
  }

  return context;
};

export {
  AuthProvider,
  useAuth,
};