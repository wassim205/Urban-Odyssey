import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "./../../config/axiosConfig";
import { toast } from "sonner";
import { Button } from "./../Admin/ui/button/index";
import { Star } from "lucide-react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role_id: 2,
  });
  const [placeToEdit, setPlaceToEdit] = useState(null);
  const [editPlace, setEditPlace] = useState(placeToEdit);
  const [isEditPlaceModalOpen, setIsEditPlaceModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleViewFullReview = (review) => {
    setSelectedReview(review);
  };

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

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("reviews");

      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews.");
      toast.error("error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const handleDeletePlace = async (placeId) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this place?</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              onClick={() => toast.dismiss(t)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={async () => {
                toast.dismiss(t);
                try {
                  await axios.delete(`places/${placeId}`);
                  setPlaces((prevPlaces) =>
                    prevPlaces.filter((place) => place.id !== placeId)
                  );
                  toast.success("Place deleted successfully");
                } catch (error) {
                  console.error("Error deleting place:", error);
                  toast.error("Failed to delete place. Please try again.");
                }
              }}
            >
              Delete
            </button>
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
  const handleEditPlace = (place) => {
    setEditPlace(place);
    setIsEditPlaceModalOpen(true);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await axios.put(`/reviews/${reviewId}/approve`);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.review_id === reviewId ? { ...review, status: "approved" } : review
        )
      );
      toast.success("Review approved successfully.");
    } catch (err) {
      console.error("Error approving review:", err);
      toast.error("Failed to approve review.");
    }
  };
  
  const handleRejectReview = async (reviewId) => {
    try {
      await axios.put(`/reviews/${reviewId}/reject`);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.review_id === reviewId ? { ...review, status: "rejected" } : review
        )
      );
      toast.success("Review rejected successfully.");
    } catch (err) {
      console.error("Error rejecting review:", err);
      toast.error("Failed to reject review.");
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.review_id !== reviewId)
      );
      toast.success("Review deleted successfully.");
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        places,
        reviews,
        loading,
        error,
        editUser,
        editPlace,
        placeToEdit,
        isModalOpen,
        isEditModalOpen,
        isEditPlaceModalOpen,
        isPlaceModalOpen,
        setUsers,
        setPlaces,
        setReviews,
        setEditUser,
        fetchPlaces,
        fetchReviews,
        handleEditUser,
        setIsModalOpen,
        setIsEditModalOpen,
        getUsers,
        handleDeleteUser,
        setEditPlace,
        setIsEditPlaceModalOpen,
        setPlaceToEdit,
        handleDeletePlace,
        setIsPlaceModalOpen,
        handleEditPlace,
        renderStars,
        getStatusColor,
        handleApproveReview,
    handleRejectReview,
    handleDeleteReview,
    handleViewFullReview,
    selectedReview,
    setSelectedReview,
  
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
