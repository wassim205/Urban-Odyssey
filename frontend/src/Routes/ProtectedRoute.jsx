import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!allowedRoles.includes(userRole)) {
    return (
      <Navigate
        to="/"
        state={{ unauthorized: true }}
        replace
      />
    );
  }

  return children;
}
