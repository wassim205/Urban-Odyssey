"use client"

import { useContext } from "react"
import { Settings } from "lucide-react"
import { ProfileContext } from "../Context/ProfileContext"

function SettingsTab() {
  const {
    userData,
    handleEditToggle,
    setShowPasswordForm,
    showPasswordForm,
    passwordData,
    handlePasswordChange,
    handleChangePassword,
    setPasswordData,
    setShowCategoriesForm,
    showCategoriesForm,
    handleUpdateCategories,
    handleCategoryToggle,
    setSelectedCategories,
    handleDeleteAccount,
    categories,
    selectedCategories,
  } = useContext(ProfileContext)

  if (!userData) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
        <Settings size={18} className="text-blue-500" />
        Account Settings
      </h3>

      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900">Profile Information</h4>
          <p className="text-sm text-gray-500 mt-1">Update your account's profile information and email address.</p>
          <button
            className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
            onClick={handleEditToggle}
          >
            Edit
          </button>
        </div>

        {/* Password Change */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900">Password</h4>
          <p className="text-sm text-gray-500 mt-1">
            Ensure your account is using a long, random password to stay secure.
          </p>

          {!showPasswordForm ? (
            <button
              className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
              onClick={() => setShowPasswordForm(true)}
            >
              Change Password
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-500">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">Confirm New Password</label>
                <input
                  type="password"
                  name="newPassword_confirmation"
                  value={passwordData.newPassword_confirmation}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
                  onClick={handleChangePassword}
                >
                  Update Password
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-3 py-1.5 text-sm rounded hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setShowPasswordForm(false)
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      newPassword_confirmation: "",
                    })
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preferred Categories */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900">Preferred Categories</h4>
          <p className="text-sm text-gray-500 mt-1">Update your interests and preferred content categories.</p>

          {!showCategoriesForm ? (
            <button
              className="mt-3 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
              onClick={() => setShowCategoriesForm(true)}
            >
              Update
            </button>
          ) : (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategories.includes(category.name) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleCategoryToggle(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex space-x-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors"
                  onClick={handleUpdateCategories}
                >
                  Save Preferences
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-3 py-1.5 text-sm rounded hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setShowCategoriesForm(false)
                    setSelectedCategories(userData.user.preferred_categories || [])
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Account */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-red-600">Delete Account</h4>
          <p className="text-sm text-gray-500 mt-1">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            className="mt-3 bg-red-600 text-white px-3 py-1.5 text-sm rounded hover:bg-red-700 transition-colors"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsTab
