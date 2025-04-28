import React, { useContext } from "react";
import { AdminContext } from "../../../Context/AdminContext";
import axios from "../../../../config/axiosConfig";
import { toast } from "sonner";

export default function EditPlaceModal() {
  const { editPlace, setEditPlace, setPlaces, setIsEditPlaceModalOpen } =
    useContext(AdminContext);

  const handleUpdatePlace = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`places/${editPlace.id}`, editPlace);
      setPlaces((prevPlaces) =>
        prevPlaces.map((place) =>
          place.id === editPlace.id ? response.data.place : place
        )
      );
      toast.success("Place updated successfully");
      setIsEditPlaceModalOpen(false);
    } catch (error) {
      console.error("Error updating place:", error);
      toast.error("Failed to update place. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Place</h2>
        <form onSubmit={handleUpdatePlace} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editPlace.name || ""}
            onChange={(e) =>
              setEditPlace({ ...editPlace, name: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={editPlace.city}
            onChange={(e) =>
              setEditPlace({ ...editPlace, city: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={editPlace.country}
            onChange={(e) =>
              setEditPlace({ ...editPlace, country: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editPlace.description}
            onChange={(e) =>
              setEditPlace({ ...editPlace, description: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            step="0.0000001"
            name="latitude"
            placeholder="Latitude"
            value={editPlace.latitude}
            onChange={(e) =>
              setEditPlace({ ...editPlace, latitude: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            step="0.0000001"
            name="longitude"
            placeholder="Longitude"
            value={editPlace.longitude}
            onChange={(e) =>
              setEditPlace({ ...editPlace, longitude: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={editPlace.image_url}
            onChange={(e) =>
              setEditPlace({ ...editPlace, image_url: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={editPlace.address}
            onChange={(e) =>
              setEditPlace({ ...editPlace, address: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={editPlace.category}
            onChange={(e) =>
              setEditPlace({ ...editPlace, category: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditPlaceModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Update Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
