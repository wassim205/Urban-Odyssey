import { useState, useContext } from "react";
import { AdminContext } from "../../../Context/AdminContext";
import axiosConfig from "../../../../config/axiosConfig";
import { toast } from "sonner";

export default function AddPlaceModal() {
  const { setPlaces, setIsPlaceModalOpen } = useContext(AdminContext);

  
  const [newPlace, setNewPlace] = useState({
    name: "",
    city: "",
    country: "",
    description: "",
    latitude: "",
    longitude: "",
    image_url: "",
    address: "",
  });
  const handleAddPlace = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post("places", newPlace);
      setPlaces((prevPlaces) => [...prevPlaces, response.data.place]);
      toast.success("Place added successfully");
      setIsPlaceModalOpen(false);
      setNewPlace({
        name: "",
        city: "",
        country: "",
        description: "",
        latitude: "",
        longitude: "",
        image_url: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding place:", error);
      toast.error("Failed to add place. Please try again.");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Place</h2>
        <form onSubmit={handleAddPlace} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPlace.name}
            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newPlace.city}
            onChange={(e) => setNewPlace({ ...newPlace, city: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={newPlace.country}
            onChange={(e) =>
              setNewPlace({ ...newPlace, country: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newPlace.description}
            onChange={(e) =>
              setNewPlace({ ...newPlace, description: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            step="0.0000001"
            name="latitude"
            placeholder="Latitude"
            value={newPlace.latitude}
            onChange={(e) =>
              setNewPlace({ ...newPlace, latitude: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            step="0.0000001"
            name="longitude"
            placeholder="Longitude"
            value={newPlace.longitude}
            onChange={(e) =>
              setNewPlace({ ...newPlace, longitude: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={newPlace.image_url}
            onChange={(e) =>
              setNewPlace({ ...newPlace, image_url: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newPlace.address}
            onChange={(e) =>
              setNewPlace({ ...newPlace, address: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsPlaceModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Add Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}