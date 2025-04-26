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

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("dashboard");
      setUsers(response.data.users);
      console.log(response.data.users);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
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
      <Toaster position="top-right" richColors />
    </div>
  );
}
