import { Plus } from "lucide-react";
import { Button } from "./../ui/button/index";
import { Toaster } from "sonner";
import Places from "./Table/Places";

export default function PlaceManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Place Management</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Place
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Places />
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
