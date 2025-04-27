import React from "react";
import { createBrowserRouter } from "react-router";
// import Home from '../components/HomePage/Home';
import Register from "../components/AuthPage/Register";
import Login from "../components/AuthPage/Login";
// import Dashboard from '../components/Dashboard/Dashboard';
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../components/HomePage/Home";
import Logout from "../components/AuthPage/Logout";
import Favorites from "../components/Favorites/Favorites";
import Reviews from "../components/Reviews/Reviews";
import Contact from "../components/ContactPage/Contact";
import Page from "../components/Admin/page";
import ProtectedRoute from "./ProtectedRoute";
import About from "../components/About/About"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/urban-odyssey",
    element: <Dashboard />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Page />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: <About />,
  }
]);
