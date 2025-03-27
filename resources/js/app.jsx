import "./bootstrap";
import "./components/HomePage/Home";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import Home from "./components/HomePage/Home";
import Register from "./components/AuthPage/Register";
import Login from "./components/AuthPage/Login";
import axios from "axios";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 422) {
            const errors = error.response.data.errors;
            Object.keys(errors).forEach(key => {
                console.error(`${key}: ${errors[key][0]}`);
            });
        }
        return Promise.reject(error);
    }
);

// Wrap your root components inside BrowserRouter
const register = document.getElementById("register");
if (register) {
    const root = ReactDOM.createRoot(register);
    root.render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
}

// for Home page
const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
}

// for Login page
const login = document.getElementById("login");
if (login) {
    const root = ReactDOM.createRoot(login);
    root.render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
}
