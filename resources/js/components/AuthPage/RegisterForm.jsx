import React, { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
console.log(response);
        const data = await response.json();

        if (response.ok) {
            setMessage("Registration successful!");
        } else {
            setMessage(data.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Register
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded ml-4">
                    <a href="/login">Login</a>
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded ml-4">
                    <a href="/">cancel</a>
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default RegisterForm;
