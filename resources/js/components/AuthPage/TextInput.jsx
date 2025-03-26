import React from 'react';

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label className="block text-lg mb-2">{label}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-[508px] h-[62px] bg-[#FDEDCA] rounded-md border border-[#A45A3D]"
      />
    </div>
  );
};

export default TextInput;