import { Plus } from "lucide-react";
import { Button } from "./../ui/button/index";
import { Toaster } from "sonner";
import Places from "./Table/Places";
import AddPlaceModal from "./modal/AddPlaceModal";
import EditPlaceModal from "./modal/EditPlaceModal";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

export default function PlaceManagement() {
  const { setIsPlaceModalOpen, isPlaceModalOpen, isEditPlaceModalOpen } =
    useContext(AdminContext);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Place Management</h2>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsPlaceModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Place
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Places />
      </div>

      {isPlaceModalOpen && <AddPlaceModal />}
      {isEditPlaceModalOpen && <EditPlaceModal />}
      <Toaster position="top-right" richColors />
    </div>
  );
}