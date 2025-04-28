import React, { useContext } from "react";
import { AdminContext } from "./../../../Context/AdminContext";
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
import { Button } from "./../../ui/button/index";
import { MapPin, MoreHorizontal } from "lucide-react";

function Facilities() {
  const {
    facilities,
    handleDeleteFacility,
    handleEditFacility,
    loading,
    error,
    setIsEditFacilityModalOpen,
  } = useContext(AdminContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Latitude</TableHead>
          <TableHead>Longitude</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facilities &&
          facilities.map((facility) => (
            <TableRow key={facility.facility_id}>
              <TableCell className="font-medium">{facility.name}</TableCell>
              <TableCell>{facility.type}</TableCell>
              <TableCell>{facility.latitude}</TableCell>
              <TableCell>{facility.longitude}</TableCell>
              <TableCell>
                {new Date(facility.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {facility.updated_at
                  ? new Date(facility.updated_at).toLocaleDateString()
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
                    <DropdownMenuItem
                      onClick={() => {
                        handleEditFacility(facility);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteFacility(facility.facility_id)}
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
  );
}

export default Facilities;
