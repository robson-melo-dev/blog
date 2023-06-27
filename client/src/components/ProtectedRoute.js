import React from "react";
import { UserContext } from "./Context/UserContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = UserContext;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
