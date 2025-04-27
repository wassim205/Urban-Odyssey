import React, { useContext, useState } from 'react';
import axios from '../../../../config/axiosConfig';
import { toast } from 'sonner';
import { AdminContext } from '../../../Context/AdminContext';

function AddFacilityModal() {
  const { setIsFacilityModalOpen, setFacilities } = useContext(AdminContext);

  const [newFacility, setNewFacility] = useState({
    name: "",
    type: "",
    latitude: "",
    longitude: "",
  });

  const handleAddFacility = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("dashboard/facilities", newFacility);
      setFacilities((prevFacilities) => [...prevFacilities, response.data.facility]);
      toast.success("Facility added successfully");
      setIsFacilityModalOpen(false);
      setNewFacility({
        name: "",
        type: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error("Error adding facility:", error);
      toast.error("Failed to add facility. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Facility</h2>
        <form onSubmit={handleAddFacility} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Facility Name"
            value={newFacility.name}
            onChange={(e) =>
              setNewFacility({ ...newFacility, name: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Facility Type"
            value={newFacility.type}
            onChange={(e) =>
              setNewFacility({ ...newFacility, type: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            step="0.0000001"
            name="latitude"
            placeholder="Latitude"
            value={newFacility.latitude}
            onChange={(e) =>
              setNewFacility({ ...newFacility, latitude: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            step="0.0000001"
            name="longitude"
            placeholder="Longitude"
            value={newFacility.longitude}
            onChange={(e) =>
              setNewFacility({ ...newFacility, longitude: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsFacilityModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Add Facility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFacilityModal;