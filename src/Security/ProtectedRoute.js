import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { auth } = useContext(AuthContext);
  
  if (!auth) {
   
    return <Navigate to="/" replace />;
  }

  return Element;
}
