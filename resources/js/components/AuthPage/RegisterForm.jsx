import React, { useState } from "react";
import planetEarth from "../../../../public/images/planet-earth.png";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const response = await axios.post("/api/register", formData);
      setSuccess("Registration successful!");
      console.log("Success response:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      console.error("Error response:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <h1 className="flex justify-center my-8 font-bebas text-[2.5rem] text-[#D8C292]">
        URBAN ODYSSEY
      </h1>
      <div className="flex justify-center flex-col items-center">
        {/* Colored bar with SIGN UP text */}
        <div className="bg-[#A6936A] w-[99rem] h-[4.875rem] relative z-50 flex items-center justify-center rounded-t-[2.5rem]">
          <div className="flex items-center">
            <img
              src={planetEarth}
              alt=""
              width="50"
              className="mr-5"
            />
            <h2 className="text-5xl font-bebas text-white drop-shadow-lg">
              SIGN UP
            </h2>
          </div>
        </div>

        {/* Main form container */}
        <div className="flex items-start justify-center bg-cover bg-center">
          <div className="bg-[#D8C292] w-[99rem] h-[42rem] rounded-b-[1.438rem] drop-shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-[0.6fr_0.07fr_1fr] gap-4 p-8"
            >
              {/* First Column */}
              <div className="flex flex-col justify-center space-y-4 font-Belgrano text-[#A45A3D] text-2xl">
                <div>
                  <label className="block text-lg mb-2 pl-2 font-semibold">
                    Full Name :
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-[31.75rem] h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6"
                  />
                </div>
                <div>
                  <label className="block text-lg mb-2 pl-2 font-semibold">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-[31.75rem] h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6"
                  />
                </div>
                <div>
                  <label className="block text-lg mb-2 pl-2 font-semibold">
                    Password :
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-[31.75rem] h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6"
                  />
                </div>
                <div>
                  <label className="block text-lg mb-2 pl-2 font-semibold">
                    Confirm password :
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-[31.75rem] h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6"
                  />
                </div>
              </div>

              {/* Vertical Separator */}
              <div className="bg-[#CF8562] w-[2px] drop-shadow-2xl"></div>

              {/* Second Column */}
              <div className="space-y-4 font-Belgrano text-[#A45A3D] text-2xl">
                <div className="grid grid-cols-2 w-[46.1875rem] space-x-12">
                  <div className="w-[20.94rem]">
                    <label className="block text-lg mb-2 font-semibold pl-2">
                      City :
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6"
                    />
                  </div>
                  <div className="w-[20.94rem]">
                    <label className="block text-lg mb-2 font-semibold pl-2">
                      Phone Number :
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-lg mb-2 font-semibold pl-2">
                    Where you heard about us :
                  </label>
                  <select
                    name="heardAbout"
                    value={formData.heardAbout}
                    onChange={handleChange}
                    className="w-[46.1875rem] h-[3.875rem] pl-4 bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg"
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
                    onChange={() =>
                      setAgreedToTerms(!agreedToTerms)
                    }
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
                <button
                  type="submit"
                  disabled={!agreedToTerms || loading}
                  className="w-[12.313rem] bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#85442B] transition duration-300 mt-4 text-lg"
                >
                  {loading ? "Signing Up..." : "SIGN UP"}
                </button>
                
                {/* Display Error and Success Messages */}
                <div className="mt-4">
                  {error && (
                    <div className="mb-2 text-red-600 font-bold">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-2 text-green-600 font-bold">
                      {success}
                    </div>
                  )}
                </div>
                
                <div className="text-center my-4">
                  <span>or</span>
                </div>
                <button
                  type="button"
                  className="w-full bg-white text-gray-700 py-2 rounded-md border border-[#A45A3D] flex items-center justify-center"
                >
                  <img
                    src="/path/to/google-icon.svg"
                    alt="Google"
                    className="mr-2 w-6 h-6"
                  />
                  Sign up with Google
                </button>
                <div className="text-center mt-4">
                  <span>Have an account? </span>
                  <a
                    href="/signin"
                    className="text-[#A0522D] hover:underline"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </form>
            <div className="text-center mt-6 text-sm italic px-8">
              <p>
                "Urban. Together." Every hidden alley and vibrant avenue holds a story waiting to be told—an urban heartbeat whispering secrets of untold journeys. Let's explore together and uncover the magic of every step.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-2xl text-yellow-400 font-bebas">
          🚨 THE DATA COLLECTED IS USED SOLELY TO ENHANCE YOUR EXPERIENCE AND IS NEITHER STORED INDEFINITELY NOR USED FOR ANY OTHER PURPOSE.
        </div>
      </div>
    </div>
  );
}
