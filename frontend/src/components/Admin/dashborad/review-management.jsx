
import { useState } from "react"
import { Search, Filter, MoreHorizontal, Star } from "lucide-react"
import { Button } from "./../ui/button/index"
import { Input } from "./../ui/input/index"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./../ui/dropdown-menu/index"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../ui/table/index"
import { Badge } from "./../ui/badge/index"

export default function ReviewManagement() {
  // Static data for demonstration
  const reviews = [
    {
      id: 1,
      place: "Tour Eiffel",
      user: "Sophie Martin",
      rating: 5,
      content: "An iconic landmark that never disappoints! The views are breathtaking.",
      status: "approved",
      date: "2023-10-10",
    },
    {
      id: 2,
      place: "Musée du Louvre",
      user: "Thomas Dubois",
      rating: 4,
      content: "Amazing collection, but it was very crowded. Plan to spend at least half a day here.",
      status: "approved",
      date: "2023-10-08",
    },
    {
      id: 3,
      place: "Cathédrale Notre-Dame",
      user: "Emma Laurent",
      rating: 5,
      content: "A masterpiece of Gothic architecture. The restoration work is impressive.",
      status: "approved",
      date: "2023-10-05",
    },
    {
      id: 4,
      place: "Le Petit Café",
      user: "Lucas Bernard",
      rating: 2,
      content: "Overpriced and the service was terrible. Would not recommend.",
      status: "pending",
      date: "2023-10-12",
    },
    {
      id: 5,
      place: "Jardin du Luxembourg",
      user: "Chloé Moreau",
      rating: 5,
      content: "A peaceful oasis in the heart of Paris. Perfect for a relaxing afternoon.",
      status: "approved",
      date: "2023-09-30",
    },
    {
      id: 6,
      place: "Montmartre",
      user: "Antoine Lefebvre",
      rating: 4,
      content: "Charming area with great views of the city. Lots of artists and street performers.",
      status: "approved",
      date: "2023-09-25",
    },
    {
      id: 7,
      place: "Librairie Ancienne",
      user: "Camille Rousseau",
      rating: 3,
      content: "Interesting selection of books, but the staff wasn't very helpful.",
      status: "pending",
      date: "2023-10-14",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredReviews = reviews.filter(
    (review) =>
      review.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Review Management</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search reviews..."
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
              <TableHead>Place</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.place}</TableCell>
                <TableCell>{review.user}</TableCell>
                <TableCell>
                  <div className="flex">{renderStars(review.rating)}</div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{review.content}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(review.status)}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View full review</DropdownMenuItem>
                      {review.status === "pending" && (
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
