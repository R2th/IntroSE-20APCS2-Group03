import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  const location = useLocation();

  if (!token) {
    return <Navigate to="auth/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
