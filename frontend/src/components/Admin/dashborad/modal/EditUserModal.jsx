import React, { useCallback, useContext } from "react";
import axios from "../../../../config/axiosConfig";
import { toast } from "sonner";
import { AdminContext } from "../../../Context/AdminContext";

function EditUserModal() {
  const { setIsEditModalOpen, setEditUser, setUsers, editUser } =
    useContext(AdminContext);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `dashboard/users/${editUser.id}`,
        editUser
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUser.id ? response.data.user : user
        )
      );
      toast.success("User updated successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={editUser.username}
            onChange={(e) =>
              setEditUser({ ...editUser, username: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={editUser.firstname}
            onChange={(e) =>
              setEditUser({ ...editUser, firstname: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={editUser.lastname}
            onChange={(e) =>
              setEditUser({ ...editUser, lastname: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
          <select
            name="role_id"
            value={editUser.role_id}
            onChange={(e) =>
              setEditUser({ ...editUser, role_id: parseInt(e.target.value) })
            }
            className="w-full border rounded p-2"
          >
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
