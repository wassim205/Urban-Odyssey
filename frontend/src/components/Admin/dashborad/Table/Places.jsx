import React from "react";
import { useContext } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./../../ui/button/index";
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
import { AdminContext } from "../../../Context/AdminContext";
import EditPlaceModal from "../modal/EditPlaceModal";

function Places() {
  const { places, isEditPlaceModalOpen, handleDeletePlace, handleEditPlace } =
    useContext(AdminContext);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            {/* <TableHead>Category</TableHead> */}
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.map((place) => (
            <TableRow key={place.id}>
              <TableCell>
                {place.image_url ? (
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </TableCell>
              <TableCell className="font-medium">{place.name || "-"}</TableCell>
              <TableCell>{place.address || "-"}</TableCell>
              <TableCell>{place.city || "-"}</TableCell>
              <TableCell>{place.country || "-"}</TableCell>
              <TableCell>
                {place.created_at
                  ? new Date(place.created_at).toLocaleDateString()
                  : "-"}
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
                    <DropdownMenuItem onClick={() => handleEditPlace(place)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeletePlace(place.id)}
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
      {isEditPlaceModalOpen && <EditPlaceModal />}
    </>
  );
}

export default Places;
