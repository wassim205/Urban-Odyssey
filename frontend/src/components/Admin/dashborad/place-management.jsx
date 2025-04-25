import { useState } from "react"
import { Search, Filter, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "./../ui/button/index"
import { Input } from "./../ui/input/index"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./../ui/dropdown-menu/index"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../ui/table/index"
import { Badge } from "./../ui/badge/index"

export default function PlaceManagement() {
  // Static data for demonstration
  const places = [
    {
      id: 1,
      name: "Tour Eiffel",
      category: "Monument",
      status: "approved",
      location: "Paris, France",
      addedBy: "Admin",
      addedDate: "2023-01-15",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Musée du Louvre",
      category: "Museum",
      status: "approved",
      location: "Paris, France",
      addedBy: "Admin",
      addedDate: "2023-01-15",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Cathédrale Notre-Dame",
      category: "Religious Site",
      status: "approved",
      location: "Paris, France",
      addedBy: "Admin",
      addedDate: "2023-01-16",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Montmartre",
      category: "District",
      status: "approved",
      location: "Paris, France",
      addedBy: "Admin",
      addedDate: "2023-01-18",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Jardin du Luxembourg",
      category: "Park",
      status: "approved",
      location: "Paris, France",
      addedBy: "Admin",
      addedDate: "2023-01-20",
      rating: 4.4,
    },
    {
      id: 6,
      name: "Le Petit Café",
      category: "Café",
      status: "pending",
      location: "Paris, France",
      addedBy: "Emma Laurent",
      addedDate: "2023-10-10",
      rating: null,
    },
    {
      id: 7,
      name: "Librairie Ancienne",
      category: "Shop",
      status: "pending",
      location: "Paris, France",
      addedBy: "Thomas Dubois",
      addedDate: "2023-10-12",
      rating: null,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Place Management</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Place
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search places..."
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
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlaces.map((place) => (
              <TableRow key={place.id}>
                <TableCell className="font-medium">{place.name}</TableCell>
                <TableCell>{place.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(place.status)}>
                    {place.status.charAt(0).toUpperCase() + place.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{place.location}</TableCell>
                <TableCell>{place.addedBy}</TableCell>
                <TableCell>{new Date(place.addedDate).toLocaleDateString()}</TableCell>
                <TableCell>{place.rating ? place.rating : "-"}</TableCell>
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
                      <DropdownMenuItem>Edit place</DropdownMenuItem>
                      {place.status === "pending" && (
                        <>
                          <DropdownMenuItem className="text-green-600">Approve</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                        </>
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
