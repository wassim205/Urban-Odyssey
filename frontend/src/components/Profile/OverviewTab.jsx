import { useContext } from "react";
import { Mail, Heart,User } from "lucide-react";
import { ProfileContext } from "../Context/ProfileContext";

const OverviewTab = () => {
  const { userData } = useContext(ProfileContext);

  if (!userData) {
    return <div className="text-center py-8">Loading...</div>;
    }
    const preferredCategories = userData.user.preferred_categories
    ? JSON.parse(userData.user.preferred_categories.split(","))
    : [];

  return (
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
              {new Date(
                userData.user.created_at
              ).toLocaleDateString()}
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
            {preferredCategories.length > 0 ? (
              preferredCategories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {category}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">
                No preferred categories
              </span>
            )}
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
          <p className="text-gray-900">
            {(userData.user.role_id ?? 1) === 1 ? "admin" : "user"}
          </p>
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
  );
};

export default OverviewTab;
