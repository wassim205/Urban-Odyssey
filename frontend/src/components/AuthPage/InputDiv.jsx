import React from "react";

const InputField = ({ label, type, name, value, onChange, className = "", width = "w-full md:w-[31.75rem]" }) => {
  return (
    <div>
      <label className="block text-lg mb-2 pl-2 font-semibold">{label} :</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${width} h-[3.875rem] bg-[#FDEDCA] rounded-md border border-[#A45A3D] text-lg pl-6 ${className}`}
      />
    </div>
  );
};

export default InputField;