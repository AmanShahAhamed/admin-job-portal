"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Ellipsis, Eye, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import TableSkeleton from "@/components/table-style/TableSkeleton";
import {
  CategoryStatus,
  TCategoryListKey,
  TCategoryListValue,
} from "../../utils/category";
import {
  CategoryColumns,
  JobCategoryOptions,
} from "../../utils/category.constant";
import { useStateList } from "@/services/job-category";
import { ICategoryList } from "@/services/job-category/job-category";

export default function StateTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryStatus>("-1");

  const { data: states = [], isLoading: listLoading } = useStateList();

  const getStatusColor = (status: CategoryStatus) => {
    if (status == "0") return "bg-green-500";
    if (status == "1") return "bg-red-500";
    return "bg-gray-500";
  };

  const renderRow = (row: ICategoryList) =>
    (Object.entries(row) as [TCategoryListKey, TCategoryListValue][]).map(
      ([key, value]) => {
        if (key === "status") {
          return (
            <TableCell key={key} className="px-4 py-3 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${getStatusColor(value as CategoryStatus)}`}
                />
                {value || "N/A"}
              </div>
            </TableCell>
          );
        }

        return (
          <TableCell key={key} className="px-4 py-3 text-sm">
            {value || "N/A"}
          </TableCell>
        );
      },
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-75"
          />

          <Select
            value={filter}
            onValueChange={(x) => setFilter(x as CategoryStatus)}
          >
            <SelectTrigger className="w-32.5">
              <SelectValue placeholder="--ALL--" />
            </SelectTrigger>
            <SelectContent>
              {JobCategoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button className="flex items-center gap-1.25 bg-[#FEEA4F] hover:bg-yellow-300 text-black font-medium text-[14px] py-2 px-4 rounded-[6px] shadow-sm transition cursor-pointer">
          <Plus size={18} /> Add New
        </button>
      </div>

      {listLoading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-hidden rounded-[5px] border border-[#E2E8F0]">
          <Table>
            <TableHeader className="bg-[#F2F2F2]">
              <TableRow>
                {CategoryColumns.map((col) => (
                  <TableHead key={col} className="px-4 py-3 whitespace-nowrap">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {!states?.length ? (
                <TableRow>
                  <TableCell
                    colSpan={CategoryColumns.length}
                    className="text-center py-8"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                states.map((state) => (
                  <TableRow key={state.id}>
                    {renderRow(state)}
                    <TableCell className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded hover:bg-gray-100">
                            <Ellipsis size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/${
                                state.name === "class" ? "class" : "experience"
                              }-provider/${state.id}`}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Eye size={16} />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
