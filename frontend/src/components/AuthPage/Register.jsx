import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom"; 
import axios from "./../../config/axiosConfig";
import planetEarth from "../../../public/images/planet-earth.png";
import RegisterForm from "./RegisterForm";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        phoneNumber: "",
        heardAbout: "From a friend",
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const errors = {};

        // Username validation
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        } else if (formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters";
        }

        // Name validation (splitting first/last names)
        if (!formData.fullName.trim()) {
            errors.fullName = "Full Name is required";
        } else {
            const nameParts = formData.fullName.trim().split(" ");
            if (nameParts.length < 2) {
                errors.fullName = "Please provide both first and last name";
            }
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = "Invalid email format";
            }
        }

        // Password validation
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const splitFullName = (fullName) => {
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        return { firstName, lastName };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).forEach((error) => {
                toast.error(error);
            });
            return;
        }

        if (!agreedToTerms) {
            toast.error("Please agree to the terms and conditions");
            return;
        }

        setLoading(true);

        const { firstName, lastName } = splitFullName(formData.fullName);
        const formattedData = {
            ...formData,
            firstname: firstName,
            lastname: lastName,
        };

        try {
            const response = await axios.post("register", formattedData);
            toast.success("Registration successful!");
            console.log("Success response:", response.data);

            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);

        } catch (err) {
            if (err.response && err.response.status === 422) {
                const backendErrors = err.response.data.errors;
                Object.keys(backendErrors).forEach((key) => {
                    toast.error(backendErrors[key][0]);
                });
            } else {
                toast.error(
                    err.response?.data?.message ||
                        "Something went wrong. Please try again later."
                );
            }
            console.error("Error response:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url('/images/City.png')` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#293D36] bg-opacity-60"></div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bebas text-[#D8C292] mb-8">
                    URBAN ODYSSEY
                </h1>

                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Colored bar with SIGN UP text */}
                    <div className="bg-[#A6936A] w-full h-20 flex items-center justify-center rounded-t-[2.5rem]">
                        <div className="flex items-center">
                            <img
                                src={planetEarth}
                                alt="Planet Earth"
                                className="w-12 h-12 mr-4"
                            />
                            <h2 className="text-4xl md:text-5xl font-bebas text-white drop-shadow-lg">
                                SIGN UP
                            </h2>
                        </div>
                    </div>

                    {/* Main form container */}
                    <div className="bg-[#D8C292] w-full rounded-b-[1.438rem] drop-shadow-lg">
                        <RegisterForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            agreedToTerms={agreedToTerms}
                            loading={loading}
                            setAgreedToTerms={setAgreedToTerms}
                        />
                    </div>
                </motion.div>

                <div className="text-center mt-6 text-xl md:text-2xl text-yellow-400 font-bebas">
                    🚨 THE DATA COLLECTED IS USED SOLELY TO ENHANCE YOUR
                    EXPERIENCE AND IS NEITHER STORED INDEFINITELY NOR USED FOR
                    ANY OTHER PURPOSE.
                </div>
            </div>

            <Toaster position="top-right" richColors />
        </motion.div>
    );
}
