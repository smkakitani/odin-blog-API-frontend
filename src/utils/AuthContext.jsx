// React
import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";



// Create default context
const AuthContext = createContext({
  token: "",
  user: {},
  onLogin: () => {},
  onLogout: () => {},
});

// Create custom provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken ] = useState(() => localStorage.getItem("token") ?? "");
  const navigate = useNavigate();

  // Get user's token
  const handleLogin = useCallback((userData) => {
    const userToken = userData.token;
    const userName = userData.user.username ?? userData.user.firstName;
    const userType = (typeof userData.user.id === "number") ? "author" : "user";

    const userObj = {
      username: userName,
      id: userData.user.id,
      type: userType,
    };

    setToken(userToken);
    setUser(userObj);

    // Keep user logged in even after refreshing page
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userObj));

    if (userType === "author") {
      navigate(`author/${userName}`);
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    setToken("");
    setUser(null);

    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
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