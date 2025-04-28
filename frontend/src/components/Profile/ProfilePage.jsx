import React from "react";
import {ProfileProvider} from "../Context/ProfileContext";
import Profile from "./Profile";
import { Toaster } from "sonner";

function ProfilePage() {
  return (
    <ProfileProvider>
      <Profile />
      <Toaster position="top-right" richColors />
    </ProfileProvider>
  );
}

export default ProfilePage;
