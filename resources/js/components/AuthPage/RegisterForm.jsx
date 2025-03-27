import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./InputDiv";
import googleIcon from "../../../../public/images/google.png";

const RegisterForm = ({
    formData,
    handleChange,
    handleSubmit,
    agreedToTerms,
    loading,
    setAgreedToTerms,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_0.1fr_1fr] gap-8 p-8 w-full"
        >
            {/* First Column */}
            <div className="flex flex-col justify-center space-y-4 font-Belgrano text-[#A45A3D] w-full">
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    width="w-full"
                />

                <InputField
                    label="Full Name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    width="w-full"
                />
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
                <div className="relative">
                    <InputField
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        width="w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-[3.5rem] text-[#A45A3D]"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            {/* Vertical Separator (Hidden on mobile) */}
            <div className="hidden lg:block bg-[#CF8562] w-[2px] drop-shadow-md"></div>

            {/* Second Column */}
            <div className="space-y-4 font-Belgrano text-[#A45A3D] w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="City"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        width="w-full"
                    />
                    <InputField
                        label="Phone Number"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        width="w-full"
                    />
                </div>
                <div>
                    <label className="block text-lg mb-2 font-semibold pl-2">
                        Where you heard about us :
                    </label>
                    <select
                        name="heardAbout"
                        value={formData.heardAbout}
                        onChange={handleChange}
                        className="w-full h-[3.875rem] pl-4 bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg"
                    >
                        <option>From a friend</option>
                        <option>Social Media</option>
                        <option>Advertisement</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="flex items-center mt-4 text-lg text-[#542F2F]">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={() => setAgreedToTerms(!agreedToTerms)}
                        className="mr-2 w-6 h-6 border-2 border-[#542F2F] bg-[#F5ECD2] rounded-sm appearance-none checked:bg-[#542F2F] checked:bg-opacity-70 relative 
                      after:content-['✓'] 
                      after:absolute 
                      after:top-1/2 
                      after:left-1/2 
                      after:-translate-x-1/2 
                      after:-translate-y-1/2 
                      after:text-white 
                      after:text-lg 
                      after:opacity-0 
                      checked:after:opacity-100 
                      cursor-pointer 
                      transition-all 
                      duration-300 
                      focus:ring-2 
                      focus:ring-[#542F2F]"
                    />
                    <label>I agree to the terms & policy</label>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#85442B] transition duration-300 mt-4 text-lg"
                >
                    {loading ? "Signing Up..." : "SIGN UP"}
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
                        Sign up with Google
                    </motion.button>
                    <div className="text-center text-[#313131] font-Poppins text-xl font-medium mt-4">
                        <span>Have an account? </span>
                        <a
                            href="/login"
                            className="text-[#0F3DDE] hover:underline"
                        >
                            Log In
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
            </div>
        </form>
    );
};

export default RegisterForm;