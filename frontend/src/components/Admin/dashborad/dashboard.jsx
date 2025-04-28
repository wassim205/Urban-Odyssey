import { useState } from "react"
import Sidebar from "./sidebar"
import Header from "./header"
import DashboardStats from "./dashboard-stats"
import UserManagement from "./user-management"
import PlaceManagement from "./place-management"
import ReviewManagement from "./review-management"
import Analytics from "./analytics"
import FacilitiesManagement from "./FacilitiesManagement"
import ProfilePage from "../../Profile/ProfilePage"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "dashboard" && <DashboardStats />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "places" && <PlaceManagement />}
          {activeTab === "facilitiesManagement" && <FacilitiesManagement />}
          {activeTab === "reviews" && <ReviewManagement />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "settings" && <ProfilePage />}
        </main>
      </div>
    </div>
  )
}
