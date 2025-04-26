import React, { useContext } from 'react'
import { useState } from 'react';
import axios from '../../../../config/axiosConfig';
import { toast } from 'sonner';
import { AdminContext } from '../../../Context/AdminContext';

function AddUserModals() {
  
   const { setIsModalOpen,setUsers } =
      useContext(AdminContext);

  const [newUser, setNewUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role_id: 2,
  });
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
  )
}

export default AddUserModals