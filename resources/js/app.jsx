import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Register from "./components/AuthPage/Register";
import Login from "./components/AuthPage/Login";
import Dashboard from "./components/Dashboard/dashboard";
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

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
}
