import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import path from "../../../public/images/Vector 1.svg";
import map from "../../../public/images/map.png";
import { toast, Toaster } from "sonner";

// Create a motion-enabled Link for animated navigation
const MotionLink = motion(Link);

export default function MainContent({ data }) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.unauthorized) {
      toast.error("You are not authorized to access this page.");
    }
  }, [location.state]);
  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Main Content Container */}
      <div className={`z-20 lg:ml-16 w-full grid lg:grid-cols-1 font-bebas ${data}`}>
        {/* Title Section */}
        <div className="text-center w-full px-4 lg:px-0 lg:mt-20">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-[60px] text-[#D8C292] drop-shadow-xl lg:mr-[37rem]"
          >
            WELCOME TO <span className="text-[#FF6F20]">URBAN ODYSSEY</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#FDEDCA] text-xl lg:text-[35px] mt-2 lg:mb-4 lg:mr-[37rem]"
          >
            THE ONE AND THE MOST THING YOU NEED WHEN
            <br className="hidden lg:block" />
            <span className="block">YOU'RE FEELING BORED</span>
          </motion.p>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 mt-8 lg:mt-0 px-4 lg:px-0">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full lg:w-[963px] max-w-full flex flex-col items-center"
          >
            <div className="w-full max-w-[963px] h-[300px] lg:h-[528px]">
              <img
                src={map}
                alt="City Map"
                className="rounded-[9px] w-full h-full object-cover"
              />
            </div>
            <p className="font-bebas text-2xl lg:text-[40px] text-white text-center mt-4">
              Our maps come from the best tools
            </p>
          </motion.div>

          {/* Features & Buttons */}
          <div className="w-full lg:w-auto text-center lg:text-left">
            <p className="font-bebas text-3xl lg:text-[40px] text-[#FFFFAB] drop-shadow-2xl mb-4">
              What we provide?
            </p>
            <div className="text-white text-lg lg:text-[30px] font-montserrat space-y-2 mb-6">
              {[
                "Possibility to re-explore your city",
                "New way of exploration and discovering",
                "No corner can hide from us",
                "Great community",
                "Suggestions for places you may never visit",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center lg:justify-start space-x-2"
                >
                  <ArrowRight className="text-[#FF6F20]" />
                  <p>{text}</p>
                </div>
              ))}
            </div>

            {/* Button Container */}
            <div className="flex flex-col space-y-4 w-full max-w-[550px] mx-auto lg:mx-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MotionLink
                  to="/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#A45A3D] text-center text-white font-bebas text-xl lg:text-[30px] rounded-[10px] py-2 px-4"
                >
                  Sign Up
                </MotionLink>
                <MotionLink
                  to="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#CF8562] text-center text-white font-bebas text-xl lg:text-[30px] rounded-[10px] py-2 px-4"
                >
                  Log in
                </MotionLink>
              </div>
              <MotionLink
                to="/urban-odyssey"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#A45A3D] text-white text-center font-bebas text-xl lg:text-[30px] rounded-[10px] w-full py-3"
              >
                Or visit us before having an account
              </MotionLink>
            </div>
          </div>
        </div>
      </div>

      {/* Right Vector Image */}
      <div className="hidden lg:block absolute right-0 w-3/12">
        <img src={path} alt="Decorative Vector" className="w-full" />
      </div>
      <Toaster position="top-right" richColors />

    </div>
  );
}
