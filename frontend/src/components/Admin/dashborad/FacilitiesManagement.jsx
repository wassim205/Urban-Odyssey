import { React } from "react";
import { Plus } from "lucide-react";
import { Button } from "./../ui/button/index";
import { Toaster } from "sonner";
import AddFacilityModal from "./modal/AddFacilityModal";
import EditFacilityModal from "./modal/EditFacilityModal";
import Facilities from "./Table/Facilities";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

export default function FacilitiesManagement() {
  const { loading, isEditFacilityModalOpen, isFacilityModalOpen, setIsFacilityModalOpen, error } =
    useContext(AdminContext);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Nearby Facilities Management</h2>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsFacilityModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Facility
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading facilities...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="rounded-md border">
          <Facilities />
        </div>
      )}
      {/* Add Facility Modal */}
      {isFacilityModalOpen && <AddFacilityModal />}

      {/* Edit Facility Modal */}
      {isEditFacilityModalOpen && <EditFacilityModal />}
      <Toaster position="top-right" richColors />
    </div>
  );
}