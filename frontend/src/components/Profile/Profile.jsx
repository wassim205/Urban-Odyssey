import { useState, useEffect } from "react";
import {
  User,
  Settings,
  Bookmark,
  Mail,
  Calendar,
  Heart,
  MapPin,
  Edit,
} from "lucide-react";
import axios from "../../config/axiosConfig";

// Mock data for the static profile
// const userData = {
//   id: 1,
//   username: "johndoe",
//   firstname: "John",
//   lastname: "Doe",
//   email: "john.doe@example.com",
//   email_verified_at: "2024-01-15T09:30:00",
//   role_id: 2,
//   role_name: "Member",
//   preferred_categories: ["Technology", "Travel", "Food"],
//   created_at: "2023-10-10T14:22:00",
//   favorite_places: [
//     { id: 1, name: "Central Park, New York", visited: "2023-12-15" },
//     { id: 2, name: "Eiffel Tower, Paris", visited: "2023-08-20" },
//     { id: 3, name: "Kyoto Gardens, Japan", visited: "2024-02-05" }
//   ]
// };

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axios.get("auth/user");
          
          setUserData(response.data);
          console.log(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
              <Edit size={16} className="text-white" />
            </button>
          </div>

          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6 bg-white p-1 rounded-full shadow-lg">
              <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-20 md:pt-4 md:ml-40">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.user.firstname} {userData.user.lastname}
                  </h1>
                  <p className="text-gray-500 flex items-center gap-1">
                    <User size={14} /> @{userData.user.username}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white mt-6 rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("places")}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "places"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Favorite Places
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "settings"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <Mail size={18} className="text-blue-500" />
                      Contact Information
                    </h3>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{userData.user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="text-gray-900">
                          {new Date(userData.user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <Heart size={18} className="text-blue-500" />
                      Preferences
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Preferred Categories
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userData.user.preferred_categories && userData.user.preferred_categories.map(
                          (category, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {category}
                            </span>
                          )
                        ) || 'no preferred categories'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <User size={18} className="text-blue-500" />
                    Account Information
                  </h3>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="text-gray-900">@{userData.user.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-gray-900">
                        {userData.user.firstname} {userData.user.lastname}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Role</p>
                      <p className="text-gray-900">{(userData.user.role_id ?? 1) === 1 ? 'admin' : 'user'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Email Verification
                      </p>
                      <p className="text-gray-900">
                        {userData.user.email_verified_at ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span className="text-red-600">Not Verified</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "places" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-blue-500" />
                  Favorite Places
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userData.favorites.map((place) => (
                    <div
                      key={place.place.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 bg-gray-200">
                        <img
                          src={place.place.image_url}
                          alt={place.place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900">
                          {place.place.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <Calendar size={14} /> Saved on{" "}
                          {new Date(place.place.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="mt-6 text-center">
                  <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                    <Bookmark size={16} /> Add New Favorite Place
                  </button>
                </div> */}
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <Settings size={18} className="text-blue-500" />
                  Account Settings
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900">
                      Profile Information
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Update your account's profile information and email
                      address.
                    </p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors">
                      Edit
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900">Password</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Ensure your account is using a long, random password to
                      stay secure.
                    </p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900">
                      Preferred Categories
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Update your interests and preferred content categories.
                    </p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors">
                      Update
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 text-red-600">
                      Delete Account
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="mt-3 bg-red-600 text-white px-3 py-1.5 text-sm rounded hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
