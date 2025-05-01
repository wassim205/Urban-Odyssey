import React, { useContext } from "react";
import { Edit, X, User, Save } from 'lucide-react';
import { ProfileContext } from "../Context/ProfileContext";

const ProfileHeader = () => {
  const { 
    userData, 
    editMode, 
    handleEditToggle, 
    formData, 
    handleInputChange, 
    handleUpdateProfile 
  } = useContext(ProfileContext);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-[#4B4B4D] to-[#6D6A61] relative">
        <button
          onClick={handleEditToggle}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-[#D8C292]/30 transition-colors"
        >
          {editMode ? <X size={16} className="text-white" /> : <Edit size={16} className="text-white" />}
        </button>
      </div>

      <div className="relative px-6 pb-6">
        <div className="absolute -top-16 left-6 bg-white p-1 rounded-full shadow-lg">
          <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userData.user.email}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="pt-20 md:pt-4 md:ml-40">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {editMode ? (
              <div className="space-y-2 w-full md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-[#D8C292] text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-[#C4AF7F] transition-colors flex items-center gap-2"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData.user.firstname} {userData.user.lastname}
                </h1>
                <p className="text-[#8A8778] flex items-center gap-1">
                  <User size={14} /> @{userData.user.username}
                </p>
              </div>
            )}

            {!editMode && (
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleEditToggle}
                  className="bg-[#D8C292] text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-[#C4AF7F] transition-colors flex items-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
