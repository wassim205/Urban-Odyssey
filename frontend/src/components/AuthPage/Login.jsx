import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "./../../config/axiosConfig";
import { Eye, EyeOff } from "lucide-react";
import planetEarth from "../../../public/images/planet-earth.png";
import googleIcon from "../../../public/images/google.png";
import InputField from "./InputDiv";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const errors = {};

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
        }

        return errors;
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

        setLoading(true);

        try {
            const response = await axios.post("login", formData);
            toast.success("Login successful!");
            localStorage.setItem('authToken', response.data.access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
            setTimeout(() => {
                navigate("/urban-odyssey");
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
                    className="max-w-4xl mx-auto"
                >
                    {/* Colored bar with LOG IN text */}
                    <div className="bg-[#A6936A] w-full h-20 flex items-center justify-center rounded-t-[2.5rem]">
                        <div className="flex items-center">
                            <img
                                src={planetEarth}
                                alt="Planet Earth"
                                className="w-12 h-12 mr-4"
                            />
                            <h2 className="text-4xl md:text-5xl font-bebas text-white drop-shadow-lg">
                                LOG IN
                            </h2>
                        </div>
                    </div>

                    {/* Main form container */}
                    <div className="bg-[#D8C292] w-full rounded-b-[1.438rem] drop-shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-4 font-Belgrano text-[#A45A3D]">
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                width="w-full"
                            />

                            <div className="relative">
                                <InputField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    width="w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[3.5rem] text-[#A45A3D]"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#85442B] transition duration-300 mt-4 text-lg"
                            >
                                {loading ? "Logging In..." : "LOG IN"}
                            </motion.button>

                            <div className="text-center my-4 flex items-center justify-center space-x-4 relative">
                                <div className="bg-[#A45A3D] w-full h-[2px] blur-sm absolute"></div>
                                <span className="text-2xl font-Poppins font-medium relative bottom-[0.15rem] drop-shadow-lg">
                                    or
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    className="bg-none font-Poppins font-medium text-[#313131] text-xl rounded-md mt-4 border border-[#A45A3D] flex items-center justify-center w-full md:w-[17rem] h-[2.475rem]"
                                >
                                    <img
                                        src={googleIcon}
                                        alt="Google"
                                        className="mr-2 w-6 h-6"
                                    />
                                    Log in with Google
                                </motion.button>
                                <div className="text-center text-[#313131] font-Poppins text-xl font-medium mt-4">
                                    <span>Don't have an account? </span>
                                    <a
                                        href="/register"
                                        className="text-[#0F3DDE] hover:underline"
                                    >
                                        Sign Up
                                    </a>
                                </div>
                            </div>

                            <div className="text-center px-22 flex flex-col items-center">
                                <p className="text-[#A45A3D] font-Poltawski font-medium text-[1.5rem] drop-shadow">
                                    "Urban. Together."
                                </p>

                                <p className="text-[#313131] font-montserrat text-base font-medium text-center">
                                    Every hidden alley and vibrant avenue holds a story
                                    waiting to be told—an urban heartbeat whispering secrets
                                    of untold journeys. Let's explore together and uncover
                                    the magic of every step.
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            <Toaster position="top-right" richColors />
        </motion.div>
    );
}