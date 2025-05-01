import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children, allowedRoles }) {
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!authToken) {
    toast.error("You must log in to access this page.");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/urban-odyssey" replace />;
  }

  return children;
}
