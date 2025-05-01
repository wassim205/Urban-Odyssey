import React, { useContext } from "react";
import { Search, Filter, MoreHorizontal, Star } from "lucide-react";
import { Button } from "./../../ui/button/index";
import { Input } from "./../../ui/input/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./../../ui/dropdown-menu/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../ui/table/index";
import { Badge } from "./../../ui/badge/index";
import { AdminContext } from "../../../Context/AdminContext";

function Reviews() {
  const {
    reviews,
    renderStars,
    getStatusColor,
    handleApproveReview,
    handleRejectReview,
    handleDeleteReview,
    handleViewFullReview,
    selectedReview,
    setSelectedReview,
  } = useContext(AdminContext);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Review Management</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Place</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.review_id}>
                <TableCell className="font-medium">
                  {review.facility.name}
                </TableCell>
                <TableCell>{review.user.username}</TableCell>
                <TableCell>
                  <div className="flex">{renderStars(review.rating)}</div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {review.comment}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(review.status)}
                  >
                    {review.status.charAt(0).toUpperCase() +
                      review.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(review.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewFullReview(review)}
                      >
                        View full review
                      </DropdownMenuItem>
                      {review.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            className="text-green-600"
                            onClick={() =>
                              handleApproveReview(review.review_id)
                            }
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleRejectReview(review.review_id)}
                          >
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteReview(review.review_id)}
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
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedReview.facility.name}
            </h2>
            <p className="mb-2">
              <strong>User:</strong> {selectedReview.user.username}
            </p>
            <p className="mb-2">
              <strong>Rating:</strong> {renderStars(selectedReview.rating)}
            </p>
            <p className="mb-2">
              <strong>Comment:</strong>{" "}
              {selectedReview.comment || "No comment provided."}
            </p>
            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {new Date(selectedReview.created_at).toLocaleDateString()}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedReview(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
