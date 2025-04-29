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

