import { useState, useEffect, createContext } from "react";
import axios from "../../config/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    newPassword_confirmation: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCategoriesForm, setShowCategoriesForm] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get("auth/user");
      setUserData(response.data);

      setFormData({
        firstname: response.data.user.firstname || "",
        lastname: response.data.user.lastname || "",
        email: response.data.user.email || "",
        username: response.data.user.username || "",
      });

      const preferredCategories = Array.isArray(
        response.data.user.preferred_categories
      )
        ? response.data.user.preferred_categories
        : JSON.parse(response.data.user.preferred_categories || "[]");

      setSelectedCategories(preferredCategories.map((cat) => cat.name || cat));
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (editMode && userData) {
      setFormData({
        firstname: userData.user.firstname || "",
        lastname: userData.user.lastname || "",
        email: userData.user.email || "",
        username: userData.user.username || "",
      });
    }
    setEditMode(!editMode);
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put("auth/user", formData);

      setUserData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...formData,
        },
      }));

      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(
        `Failed to update profile: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.newPassword_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.put("auth/change-password", passwordData);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
      });

      setShowPasswordForm(false);
      toast.success("Password changed successfully!");
    } catch (err) {
      console.error("Error changing password:", err);
      toast.error(
        `Failed to change password: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleUpdateCategories = async () => {
    try {
      await axios.put("auth/user/preferences", {
        preferred_categories: selectedCategories,
      });

      setUserData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          preferred_categories: selectedCategories,
        },
      }));

      setShowCategoriesForm(false);
      toast.success("Preferences updated successfully!");
    } catch (err) {
      console.error("Error updating preferences:", err);
      toast.error(
        `Failed to update preferences: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const handleDeleteAccount = () => {
    const toastId = toast(
      "This action cannot be undone. All your data will be permanently deleted.",
      {
        duration: Infinity,
        action: {
          label: "Confirm",
          onClick: async () => {
            toast.dismiss(toastId);
            try {
              await axios.delete("/auth/user");
              toast.success("Account deleted successfully!");
              navigate("/");
            } catch (err) {
              toast.error(
                `Failed to delete account: ${
                  err.response?.data?.message || err.message
                }`
              );
            }
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(toastId),
        },
      }
    );
  };
  const handleRemoveFavoritePlace = async (place) => {
    if (confirm("Remove this place from favorites?")) {
      try {
        await axios.delete(`/favorites/${place.place.id}`);

        fetchUserData();
        toast.success("Place removed from favorites!");
      } catch (err) {
        console.error("Error removing favorite:", err);
        toast.error("Failed to remove from favorites.");
      }
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        userData,
        loading,
        error,
        activeTab,
        setActiveTab,
        editMode,
        formData,
        passwordData,
        showPasswordForm,
        showCategoriesForm,

        selectedCategories,
        handleInputChange,
        handlePasswordChange,
        handleEditToggle,
        handleUpdateProfile,
        handleChangePassword,
        handleCategoryToggle,
        handleUpdateCategories,
        handleDeleteAccount,
        handleRemoveFavoritePlace,
        setShowPasswordForm,
        setShowCategoriesForm,
        setSelectedCategories,
        fetchUserData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
