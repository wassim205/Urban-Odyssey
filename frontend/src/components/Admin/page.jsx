import React from "react";
import { AdminProvider } from "../Context/AdminContext";
import Dashboard from "./dashborad/dashboard";

export default function Home() {
  return (
    <AdminProvider>
      <Dashboard />
    </AdminProvider>
  );
}
