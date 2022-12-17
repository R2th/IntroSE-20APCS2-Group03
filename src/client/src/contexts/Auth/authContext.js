import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../hooks/useAuth";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token || userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const handleLogin = async ({ username, password }) => {
    const { token } = await loginUser({ username, password });
    saveToken({ token });
    const origin = location.state?.from?.pathname || "/";
    navigate(origin);
  };

  const handleLogout = () => {
    saveToken({ token: null });
  };

  const value = {
    token: token,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
