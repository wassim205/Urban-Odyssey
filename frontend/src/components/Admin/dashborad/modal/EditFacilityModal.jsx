import React, { useContext } from "react";
import axios from "../../../../config/axiosConfig";
import { toast } from "sonner";
import { AdminContext } from "../../../Context/AdminContext";

function EditFacilityModal() {
  const { setIsEditFacilityModalOpen, setFacilities, editFacility, setEditFacility } =
    useContext(AdminContext);

  const handleUpdateFacility = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `dashboard/facilities/${editFacility.facility_id}`,
        editFacility
      );
      setFacilities((prevFacilities) =>
        prevFacilities.map((facility) =>
          facility.facility_id === editFacility.facility_id ? response.data.facility : facility
        )
      );
      toast.success("Facility updated successfully");
      setIsEditFacilityModalOpen(false);
    } catch (error) {
      console.error("Error updating facility:", error);
      toast.error("Failed to update facility. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Facility</h2>
        <form onSubmit={handleUpdateFacility} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Facility Name"
            value={editFacility.name}
            onChange={(e) =>
              setEditFacility({ ...editFacility, name: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Facility Type"
            value={editFacility.type}
            onChange={(e) =>
              setEditFacility({ ...editFacility, type: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            step="0.0000001"
            name="latitude"
            placeholder="Latitude"
            value={editFacility.latitude}
            onChange={(e) =>
              setEditFacility({ ...editFacility, latitude: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            step="0.0000001"
            name="longitude"
            placeholder="Longitude"
            value={editFacility.longitude}
            onChange={(e) =>
              setEditFacility({ ...editFacility, longitude: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditFacilityModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Update Facility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFacilityModal;