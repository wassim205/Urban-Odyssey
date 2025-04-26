import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem("userRole");

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
