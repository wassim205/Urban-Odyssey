import React from 'react'
import { createBrowserRouter } from 'react-router'
// import Home from '../components/HomePage/Home';
import Register from '../components/AuthPage/Register';
import Login from '../components/AuthPage/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import Home from '../components/HomePage/Home';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
        
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);