import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "./../../config/axiosConfig";
import { toast } from "sonner";
import { Button } from "./../Admin/ui/button/index";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role_id: 2,
  });
  
    // Fetch users
  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("dashboard/users");
      setUsers(response.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDeleteUser = async (userId) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <div className="flex justify-end space-x-2 mt-2">
            <Button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800"
              onClick={() => toast.dismiss(t)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={async () => {
                toast.dismiss(t);
                try {
                  await axios.delete(`dashboard/users/${userId}`);
                  setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== userId)
                  );
                  toast.success("User deleted successfully");
                } catch (error) {
                  console.error("Error deleting user:", error);
                  toast.error("Failed to delete user. Please try again");
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Fetch places
  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("places");
      setPlaces(response.data.places);
    } catch (err) {
      console.error("Error fetching places:", err);
      setError("Failed to fetch places.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
    fetchPlaces();
  }, [getUsers, fetchPlaces]);

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        setUsers,
        places,
        setPlaces,
        loading,
        error,
        fetchPlaces,
        handleEditUser,
        editUser,
        setEditUser,
        isModalOpen,
        setIsModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        getUsers,
        handleDeleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
