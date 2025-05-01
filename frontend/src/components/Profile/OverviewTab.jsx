"use client"

import { useContext } from "react"
import { Mail, Heart, User } from "lucide-react"
import { ProfileContext } from "../Context/ProfileContext"

const OverviewTab = () => {
  const { userData } = useContext(ProfileContext)

  let preferredCategories = []
  try {
    preferredCategories = Array.isArray(userData.user.preferred_categories)
      ? userData.user.preferred_categories
      : JSON.parse(userData.user.preferred_categories || "[]")
    console.log(preferredCategories)
  } catch (error) {
    console.error("Failed to parse preferred categories:", error)
    preferredCategories = []
  }

  if (!userData) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#F5F3EE] rounded-lg p-4 border border-[#E5DFD3]">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Mail size={18} className="text-[#D8C292]" />
            Contact Information
          </h3>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{userData.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-gray-900">{new Date(userData.user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F3EE] rounded-lg p-4 border border-[#E5DFD3]">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Heart size={18} className="text-[#D8C292]" />
            Preferences
          </h3>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preferred Categories</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {preferredCategories.length > 0 ? (
                preferredCategories.map((category, index) => (
                  <span key={index} className="px-3 py-1 bg-[#EAE3D2] text-[#8A7A5A] rounded-full text-sm">
                    {category}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No preferred categories</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F3EE] rounded-lg p-4 border border-[#E5DFD3]">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <User size={18} className="text-[#D8C292]" />
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
            <p className="text-gray-900">{(userData.user.role_id ?? 1) === 1 ? "admin" : "user"}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default OverviewTab
