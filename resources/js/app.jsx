import "./bootstrap";
import "./components/HomePage/Home";

import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/HomePage/Home";
import RegisterForm from "./components/AuthPage/RegisterForm";
import Login from "./components/AuthPage/Login";

// for register page
const register = document.getElementById("register");
if (register) {
    const root = ReactDOM.createRoot(register);
    root.render(<RegisterForm />);
}
// for Home page
const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<Home />);
}
// for Login page
const login = document.getElementById("login");
if (login) {
    const root = ReactDOM.createRoot(login);
    root.render(<Login />);
}
