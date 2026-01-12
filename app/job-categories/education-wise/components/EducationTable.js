"use client";
import React, { useState, useMemo } from "react";
import { format } from "date-fns";
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

const types = [
  { label: "All Types", value: "all" },
  { label: "Academy", value: "Academy" },
  { label: "Freelancer", value: "Freelancer" },
];

export default function SimpleTable({ data = [], type = "class" }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);

  // Simple data structure for demo - replace with your actual data
  const demoData = [
    {
      id: 1,
      name: "John Doe",
      type: "Academy",
      email: "john@example.com",
      phone: "+1234567890",
      region: "North America",
      regDate: new Date(),
      status: "APPROVED",
      profileImage: "/avatar.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Freelancer",
      email: "jane@example.com",
      phone: "+0987654321",
      region: "Europe",
      regDate: new Date(),
      status: "PENDING",
      profileImage: "/avatar.jpg",
    },
  ];

  const tableData = data.length > 0 ? data : demoData;

  const filteredData = useMemo(() => {
    let filtered = [...tableData];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerSearch)
        )
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    return filtered;
  }, [search, filterType, tableData]);

  // Simple table columns configuration
  const columns = [
    { label: "Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Region", key: "region" },
    { label: "Reg. Date", key: "regDate" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button className="flex items-center gap-[5px] bg-[#FEEA4F] hover:bg-yellow-300 text-black font-[500] text-[14px] py-2 px-4 rounded-[6px] shadow-sm transition cursor-pointer">
          <Plus size={18} /> Add New
        </button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-hidden rounded-[5px] border border-[#E2E8F0]">
          <Table>
            <TableHeader className="bg-[#F2F2F2]">
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          src={item.profileImage || "/default-avatar.png"}
                          alt={item.name}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {item.type || "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {item.email || "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {item.phone || "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {item.region || "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {item.regDate
                        ? format(new Date(item.regDate), "dd-MM-yyyy")
                        : "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.status === "APPROVED"
                              ? "bg-green-500"
                              : item.status === "PENDING"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        {item.status || "N/A"}
                      </div>
                    </TableCell>
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
                                type === "class" ? "class" : "experience"
                              }-provider/${item.id}`}
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
