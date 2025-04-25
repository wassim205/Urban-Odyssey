import { useState } from "react"
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react"
import { Button } from "./../ui/button/index"
import { Input } from "./../ui/input/index"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./../ui/dropdown-menu/index"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../ui/table/index"
import { Badge } from "./../ui/badge/index"

export default function UserManagement() {
  // Static data for demonstration
  const users = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-05-12",
      lastActive: "2023-10-15",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-06-24",
      lastActive: "2023-10-14",
    },
    {
      id: 3,
      name: "Emma Laurent",
      email: "emma.laurent@example.com",
      status: "inactive",
      role: "user",
      joinDate: "2023-04-18",
      lastActive: "2023-09-30",
    },
    {
      id: 4,
      name: "Lucas Bernard",
      email: "lucas.bernard@example.com",
      status: "active",
      role: "moderator",
      joinDate: "2023-03-05",
      lastActive: "2023-10-15",
    },
    {
      id: 5,
      name: "Chloé Moreau",
      email: "chloe.moreau@example.com",
      status: "blocked",
      role: "user",
      joinDate: "2023-07-30",
      lastActive: "2023-09-15",
    },
    {
      id: 6,
      name: "Antoine Lefebvre",
      email: "antoine.lefebvre@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-08-14",
      lastActive: "2023-10-12",
    },
    {
      id: 7,
      name: "Camille Rousseau",
      email: "camille.rousseau@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-09-02",
      lastActive: "2023-10-10",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      {user.status === "active" ? (
                        <DropdownMenuItem className="text-yellow-600">Deactivate</DropdownMenuItem>
                      ) : user.status === "inactive" ? (
                        <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                      ) : null}
                      {user.status !== "blocked" ? (
                        <DropdownMenuItem className="text-red-600">Block</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">Unblock</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
