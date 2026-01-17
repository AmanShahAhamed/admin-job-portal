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

// Type definitions
type UserType = "Academy" | "Freelancer";
type StatusType = "APPROVED" | "PENDING" | "REJECTED";

interface UserData {
  id: number | string;
  name: string;
  type: UserType;
  email: string;
  phone: string;
  region: string;
  regDate: Date | string;
  status: StatusType;
  profileImage?: string;
}

interface SimpleTableProps {
  data?: UserData[];
  type?: "class" | "experience";
}

interface ColumnConfig {
  label: string;
  key: keyof UserData | "actions";
}

interface TypeFilter {
  label: string;
  value: UserType | "all";
}

const types: TypeFilter[] = [
  { label: "All Types", value: "all" },
  { label: "Academy", value: "Academy" },
  { label: "Freelancer", value: "Freelancer" },
];

export default function SimpleTable({ data = [], type = "class" }: SimpleTableProps) {
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<UserType | "all">("all");
  const [loading, setLoading] = useState<boolean>(false);

  // Simple data structure for demo - replace with your actual data
  const demoData: UserData[] = [
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

  const tableData: UserData[] = data.length > 0 ? data : demoData;

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
  const columns: ColumnConfig[] = [
    { label: "Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Region", key: "region" },
    { label: "Reg. Date", key: "regDate" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setFilterType(value as UserType | "all");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={handleSearchChange}
            className="w-[300px]"
          />

          <Select value={filterType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((typeItem) => (
                <SelectItem key={typeItem.value} value={typeItem.value}>
                  {typeItem.label}
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