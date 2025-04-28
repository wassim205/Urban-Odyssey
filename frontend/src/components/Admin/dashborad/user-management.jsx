import { React } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "./../ui/button/index";
import { Toaster } from "sonner";
import AddUserModals from "./modal/AddUserModals";
import EditUserModal from "./modal/EditUserModal";
import Users from "./Table/Users";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

export default function UserManagement() {
  const { loading, isEditModalOpen, isModalOpen, setIsModalOpen, error } =
    useContext(AdminContext);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="rounded-md border">
          <Users />
        </div>
      )}
      {/* add User Modal */}
      {isModalOpen && <AddUserModals />}

      {isEditModalOpen && <EditUserModal />}
      <Toaster position="top-right" richColors />
    </div>
  );
}
