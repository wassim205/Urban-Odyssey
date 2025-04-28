// import { useState, useEffect } from "react";
// import {
//   User,
//   Settings,
//   Mail,
//   Calendar,
//   Heart,
//   MapPin,
//   Edit,
//   Save,
//   X,
// } from "lucide-react";
// import axios from "../../config/axiosConfig";
// import { toast, Toaster } from "sonner";

// export default function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [showPasswordForm, setShowPasswordForm] = useState(false);
//   const [showCategoriesForm, setShowCategoriesForm] = useState(false);
//   const [availableCategories, setAvailableCategories] = useState([
//     "Restaurants",
//     "Parks",
//     "Museums",
//     "Shopping",
//     "Entertainment",
//     "Sports",
//   ]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get("auth/user");
//       setUserData(response.data);

//       // Initialize form data with current user data
//       setFormData({
//         firstname: response.data.user.firstname || "",
//         lastname: response.data.user.lastname || "",
//         email: response.data.user.email || "",
//         username: response.data.user.username || "",
//       });

//       // Initialize selected categories
//       setSelectedCategories(response.data.user.preferred_categories || []);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setError("Failed to load user data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditToggle = () => {
//     if (editMode) {
//       // Discard changes
//       setFormData({
//         firstname: userData.user.firstname || "",
//         lastname: userData.user.lastname || "",
//         email: userData.user.email || "",
//         username: userData.user.username || "",
//       });
//     }
//     setEditMode(!editMode);
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await axios.put("auth/user", formData);

//       // Update the local user data
//       setUserData((prev) => ({
//         ...prev,
//         user: {
//           ...prev.user,
//           ...formData,
//         },
//       }));

//       setEditMode(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast.error(
//         `Failed to change password: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     }
//   };

//   const handleChangePassword = async () => {
//     if (passwordData.newPassword !== passwordData.newPassword_confirmation) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       await axios.put("auth/change-password", passwordData);

//       // Reset the password form
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         newPassword_confirmation: "",
//       });

//       setShowPasswordForm(false);
//       toast.success("Password changed successfully!");
//     } catch (err) {
//       console.error("Error changing password:", err);
//       toast.error(
//         `Failed to change password: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     }
//   };

//   const handleCategoryToggle = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   const handleUpdateCategories = async () => {
//     try {
//       await axios.put("auth/user/preferences", {
//         preferred_categories: selectedCategories,
//       });

//       setUserData((prev) => ({
//         ...prev,
//         user: {
//           ...prev.user,
//           preferred_categories: selectedCategories,
//         },
//       }));

//       setShowCategoriesForm(false);
//       toast.success("Preferences updated successfully!");
//     } catch (err) {
//       console.error("Error updating preferences:", err);
//       toast.error(
//         `Failed to change password: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const confirmText = "DELETE";
//     const userInput = prompt(
//       `This action cannot be undone. All your data will be permanently deleted. Type "${confirmText}" to confirm.`
//     );

//     if (userInput === confirmText) {
//       try {
//         await axios.delete("auth/user");
//         toast.success("Account deleted successfully!");
//         window.location.href = "/";
//       } catch (err) {
//         console.error("Error deleting account:", err);
//         toast.error(
//           `Failed to change password: ${
//             err.response?.data?.message || err.message
//           }`
//         );
//       }
//     } else if (userInput !== null) {
//       toast.error(
//         "Account deletion cancelled: confirmation text didn't match."
//       );
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   }
//   const preferredCategories = userData.user.preferred_categories
//     ? JSON.parse(userData.user.preferred_categories)
//     : [];

//   return (
//     <div className="bg-gray-50 min-h-screen py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Profile Header */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
//             <button
//               onClick={handleEditToggle}
//               className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
//             >
//               {editMode ? (
//                 <X size={16} className="text-white" />
//               ) : (
//                 <Edit size={16} className="text-white" />
//               )}
//             </button>
//           </div>

//           <div className="relative px-6 pb-6">
//             <div className="absolute -top-16 left-6 bg-white p-1 rounded-full shadow-lg">
//               <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userData.user.email}`}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             <div className="pt-20 md:pt-4 md:ml-40">
//               <div className="flex flex-col md:flex-row md:items-center justify-between">
//                 {editMode ? (
//                   <div className="space-y-2 w-full md:w-2/3">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm text-gray-500">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           name="firstname"
//                           value={formData.firstname || ""}
//                           onChange={handleInputChange}
//                           className="w-full p-2 border border-gray-300 rounded-md"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-500">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           name="lastname"
//                           value={formData.lastname || ""}
//                           onChange={handleInputChange}
//                           className="w-full p-2 border border-gray-300 rounded-md"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-500">
//                           Username
//                         </label>
//                         <input
//                           type="text"
//                           name="username"
//                           value={formData.username || ""}
//                           onChange={handleInputChange}
//                           className="w-full p-2 border border-gray-300 rounded-md"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-500">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email || ""}
//                           onChange={handleInputChange}
//                           className="w-full p-2 border border-gray-300 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={handleUpdateProfile}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
//                       >
//                         <Save size={16} /> Save Changes
//                       </button>
//                       <button
//                         onClick={handleEditToggle}
//                         className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-900">
//                       {userData.user.firstname} {userData.user.lastname}
//                     </h1>
//                     <p className="text-gray-500 flex items-center gap-1">
//                       <User size={14} /> @{userData.user.username}
//                     </p>
//                   </div>
//                 )}

//                 {!editMode && (
//                   <div className="mt-4 md:mt-0">
//                     <button
//                       onClick={handleEditToggle}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
//                     >
//                       <Edit size={16} /> Edit Profile
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white mt-6 rounded-xl shadow-md">
//           <div className="border-b border-gray-200">
//             <nav className="flex overflow-x-auto">
//               <button
//                 onClick={() => setActiveTab("overview")}
//                 className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//                   activeTab === "overview"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Overview
//               </button>
//               <button
//                 onClick={() => setActiveTab("places")}
//                 className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//                   activeTab === "places"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Favorite Places
//               </button>
//               <button
//                 onClick={() => setActiveTab("settings")}
//                 className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//                   activeTab === "settings"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Settings
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === "overview" && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                       <Mail size={18} className="text-blue-500" />
//                       Contact Information
//                     </h3>
//                     <div className="mt-4 space-y-3">
//                       <div>
//                         <p className="text-sm text-gray-500">Email</p>
//                         <p className="text-gray-900">{userData.user.email}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Member Since</p>
//                         <p className="text-gray-900">
//                           {new Date(
//                             userData.user.created_at
//                           ).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                       <Heart size={18} className="text-blue-500" />
//                       Preferences
//                     </h3>
//                     <div className="mt-4">
//                       <p className="text-sm text-gray-500">
//                         Preferred Categories
//                       </p>

//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {preferredCategories.length > 0 ? (
//                           preferredCategories.map((category, index) => (
//                             <span
//                               key={index}
//                               className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                             >
//                               {category}
//                             </span>
//                           ))
//                         ) : (
//                           <span className="text-gray-500 text-sm">
//                             No preferred categories
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                     <User size={18} className="text-blue-500" />
//                     Account Information
//                   </h3>
//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Username</p>
//                       <p className="text-gray-900">@{userData.user.username}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Full Name</p>
//                       <p className="text-gray-900">
//                         {userData.user.firstname} {userData.user.lastname}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Account Role</p>
//                       <p className="text-gray-900">
//                         {(userData.user.role_id ?? 1) === 1 ? "admin" : "user"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">
//                         Email Verification
//                       </p>
//                       <p className="text-gray-900">
//                         {userData.user.email_verified_at ? (
//                           <span className="text-green-600 flex items-center gap-1">
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M5 13l4 4L19 7"
//                               ></path>
//                             </svg>
//                             Verified
//                           </span>
//                         ) : (
//                           <span className="text-red-600">Not Verified</span>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Favorite places */}
//             {activeTab === "places" && (
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
//                   <MapPin size={18} className="text-blue-500" />
//                   Favorite Places
//                 </h3>

//                 {userData.favorites && userData.favorites.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {userData.favorites.map((place) => (
//                       <div
//                         key={place.place.id}
//                         className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="h-40 bg-gray-200">
//                           <img
//                             src={
//                               place.place.image_url ||
//                               "/api/placeholder/400/320"
//                             }
//                             alt={place.place.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.src = "/api/placeholder/400/320";
//                             }}
//                           />
//                         </div>
//                         <div className="p-4">
//                           <h4 className="font-medium text-gray-900">
//                             {place.place.name}
//                           </h4>
//                           <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//                             <Calendar size={14} /> Saved on{" "}
//                             {new Date(
//                               place.place.updated_at
//                             ).toLocaleDateString()}
//                           </p>
//                           <button
//                             className="mt-2 text-sm text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
//                             onClick={async () => {
//                               if (
//                                 confirm("Remove this place from favorites?")
//                               ) {
//                                 try {
//                                   await axios.delete(
//                                     `/favorites/${place.place.id}`
//                                   );
//                                   // Update favorites list
//                                   fetchUserData();
//                                 } catch (err) {
//                                   console.error(
//                                     "Error removing favorite:",
//                                     err
//                                   );
//                                   alert("Failed to remove from favorites.");
//                                 }
//                               }
//                             }}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     You haven't saved any favorite places yet.
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Settings */}
//             {activeTab === "settings" && (
// <div>
//   <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
//     <Settings size={18} className="text-blue-500" />
//     Account Settings
//   </h3>

//   <div className="space-y-6">
//     {/* Profile Information */}
//     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//       <h4 className="font-medium text-gray-900">
//         Profile Information
//       </h4>
//       <p className="text-sm text-gray-500 mt-1">
//         Update your account's profile information and email
//         address.
//       </p>
//       <button
//         className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
//         onClick={handleEditToggle}
//       >
//         Edit
//       </button>
//     </div>

//     {/* Password Change */}
//     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//       <h4 className="font-medium text-gray-900">Password</h4>
//       <p className="text-sm text-gray-500 mt-1">
//         Ensure your account is using a long, random password to
//         stay secure.
//       </p>

//       {!showPasswordForm ? (
//         <button
//           className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
//           onClick={() => setShowPasswordForm(true)}
//         >
//           Change Password
//         </button>
//       ) : (
//         <div className="mt-4 space-y-3">
//           <div>
//             <label className="block text-sm text-gray-500">
//               Current Password
//             </label>
//             <input
//               type="password"
//               name="currentPassword"
//               value={passwordData.currentPassword}
//               onChange={handlePasswordChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-500">
//               New Password
//             </label>
//             <input
//               type="password"
//               name="newPassword"
//               value={passwordData.newPassword}
//               onChange={handlePasswordChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-500">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               name="newPassword_confirmation"
//               value={passwordData.newPassword_confirmation}
//               onChange={handlePasswordChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="flex space-x-3">
//             <button
//               className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
//               onClick={handleChangePassword}
//             >
//               Update Password
//             </button>
//             <button
//               className="bg-gray-200 text-gray-800 px-3 py-1.5 text-sm rounded hover:bg-gray-300 transition-colors"
//               onClick={() => {
//                 setShowPasswordForm(false);
//                 setPasswordData({
//                   currentPassword: "",
//                   newPassword: "",
//                   newPassword_confirmation: "",
//                 });
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Preferred Categories */}
//     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//       <h4 className="font-medium text-gray-900">
//         Preferred Categories
//       </h4>
//       <p className="text-sm text-gray-500 mt-1">
//         Update your interests and preferred content categories.
//       </p>

//       {!showCategoriesForm ? (
//         <button
//           className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
//           onClick={() => setShowCategoriesForm(true)}
//         >
//           Update
//         </button>
//       ) : (
//         <div className="mt-4">
//           <div className="flex flex-wrap gap-2">
//             {availableCategories.map((category) => (
//               <button
//                 key={category}
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   selectedCategories.includes(category)
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//                 onClick={() => handleCategoryToggle(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//           <div className="mt-4 flex space-x-3">
//             <button
//               className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
//               onClick={handleUpdateCategories}
//             >
//               Save Preferences
//             </button>
//             <button
//               className="bg-gray-200 text-gray-800 px-3 py-1.5 text-sm rounded hover:bg-gray-300 transition-colors"
//               onClick={() => {
//                 setShowCategoriesForm(false);
//                 setSelectedCategories(
//                   userData.user.preferred_categories || []
//                 );
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Delete Account */}
//     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//       <h4 className="font-medium text-red-600">Delete Account</h4>
//       <p className="text-sm text-gray-500 mt-1">
//         Permanently delete your account and all associated data.
//         This action cannot be undone.
//       </p>
//       <button
//         className="mt-3 bg-red-600 text-white px-3 py-1.5 text-sm rounded hover:bg-red-700 transition-colors"
//         onClick={handleDeleteAccount}
//       >
//         Delete Account
//       </button>
//     </div>
//   </div>
// </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Toaster position="top-right" richColors />
//     </div>
//   );
// }

import React, { useContext } from "react";
import ProfileHeader from "./ProfileHeader";
import NavigationTabs from "./NavigationTabs";
import OverviewTab from "./OverviewTab";
import FavoritePlacesTab from "./FavoritePlacesTab";
import SettingsTab from "./SettingsTab";
import { ProfileContext } from "../Context/ProfileContext";

const Profile = () => {
  const { activeTab, loading, error } = useContext(ProfileContext);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <ProfileHeader />
        <NavigationTabs />
        <div className="p-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "places" && <FavoritePlacesTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

