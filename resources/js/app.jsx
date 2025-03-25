import "./bootstrap";
import "./components/Home";

import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";



// for register page
const container = document.getElementById("register");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<RegisterForm />);
}
