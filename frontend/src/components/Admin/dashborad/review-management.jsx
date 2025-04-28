import { useContext, useState } from "react";
import { Search, Filter, MoreHorizontal, Star } from "lucide-react";
import { Button } from "./../ui/button/index";
import { Input } from "./../ui/input/index";
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
import { Badge } from "./../ui/badge/index";
import Reviews from "./Table/Reviews";
import { AdminContext } from "../../Context/AdminContext";

export default function ReviewManagement() {
    const { loading, error } = useContext(AdminContext);

  if (loading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }


  return <Reviews />;
}
