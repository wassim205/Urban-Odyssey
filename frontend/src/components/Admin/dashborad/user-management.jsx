import { useState, useEffect, useCallback } from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "./../ui/button/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./../ui/dropdown-menu/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../ui/table/index";
import axios from "./../../../config/axiosConfig";
import { Toaster, toast } from "sonner";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role_id: 2,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role_id: 2,
  });

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`dashboard/users/${editUser.id}`, editUser);
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

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("dashboard/users");
      setUsers(response.data.users);
      console.log("users", response.data.users);
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

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("dashboard/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      toast.success("User added successfully");
      setIsModalOpen(false);
      setNewUser({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role_id: 2,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{`${user.firstname} ${user.lastname}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role_id === 1 ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.updated_at
                      ? new Date(user.updated_at).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=> handleEditUser(user)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={newUser.firstname}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstname: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={newUser.lastname}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <select
                name="role_id"
                value={newUser.role_id}
                onChange={(e) =>
                  setNewUser({ ...newUser, role_id: parseInt(e.target.value) })
                }
                className="w-full border rounded p-2"
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{isEditModalOpen && (
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
          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
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
)}
      <Toaster position="top-right" richColors />
    </div>
  );
}
