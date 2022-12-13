import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  console.log(token);

  const location = useLocation();

  if (!token) {
    console.log("No token");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
