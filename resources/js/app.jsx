import "./bootstrap";
import "./components/HomePage/Home";

import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/HomePage/Home";
import RegisterForm from "./components/AuthPage/RegisterForm";

// for register page
const container = document.getElementById("register");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<RegisterForm />);
}
// for Home page
const container2 = document.getElementById("root");
if (container2) {
    const root = ReactDOM.createRoot(container2);
    root.render(<Home />);
}
