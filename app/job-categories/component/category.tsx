"use client";
import { UseMutateFunction, UseQueryResult } from "@tanstack/react-query";
import {
  ICategoryList,
  ICreateCategory,
  IListParam,
  IUpdateCategory,
  Status,
} from "../../../services/job-category";
import { JobCategoryOptions } from "../utils/category.constant";
import { useState } from "react";
import { CategoryStatus } from "../utils/category";
import { CustomTable, CustomTableColumn } from "../../ui/custom-table";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { DeleteAlert } from "../../ui/custom-alert";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { MutationModal } from "./mutation-modal";

const getJobCategoryLabel = (value: string) => {
  return (
    JobCategoryOptions.find((option) => option.value == value)?.label || "N/A"
  );
};

interface IJobCategoryProps {
  name: string;
  useList: (
    params?: IListParam | undefined,
  ) => UseQueryResult<ICategoryList[], Error>;
  createState: UseMutateFunction<any, Error, ICreateCategory, unknown>;
  updateState: UseMutateFunction<any, Error, IUpdateCategory, unknown>;
  deleteState: UseMutateFunction<any, Error, number, unknown>;
}
export const JobCategory: React.FC<IJobCategoryProps> = ({
  name,
  useList,
  createState,
  updateState,
  deleteState,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryStatus>("-1");
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ICategoryList | null>(
    null,
  );
  const { data: states = [], isLoading: listLoading } = useList();

  const onUpdateClick = (record: ICategoryList) => {
    setActiveCategory(record);
    setShowModal(true);
  };
  const Columns: CustomTableColumn<ICategoryList>[] = [
    {
      key: "id",
      dataIndex: "id",
      name: "ID",
    },
    {
      key: "name",
      dataIndex: "name",
      name: "Name",
    },
    {
      key: "status",
      dataIndex: "status",
      name: "Status",
      render: (record, value) => (
        <div className="flex items-center space-x-2">
          <Switch
            className="cursor-pointer"
            id="airplane-mode"
            checked={value === Status.ACTIVE}
            onCheckedChange={(checked) =>
              updateState({
                ...record,
                id: Number(record.id),
                status: checked ? Status.ACTIVE : Status.INACTIVE,
              })
            }
          />
          <Label htmlFor="airplane-mode">
            {getJobCategoryLabel(`${value}`)}
          </Label>
        </div>
      ),
    },
    {
      key: "action",
      name: "Action",
      render: (record) => (
        <div className="flex items-center space-x-4">
          <Pencil
            size={14}
            className="cursor-pointer"
            onClick={() => onUpdateClick(record)}
          />
          <DeleteAlert onConfirm={() => deleteState(record.id)}>
            <Trash2 size={14} className="cursor-pointer text-red-600" />
          </DeleteAlert>
        </div>
      ),
    },
  ];

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
        <button
          onClick={() => setShowModal((p) => !p)}
          className="flex items-center gap-1.25 bg-[#FEEA4F] hover:bg-yellow-300 text-black font-medium text-[14px] py-2 px-4 rounded-[6px] shadow-sm transition cursor-pointer"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <CustomTable isLoading={listLoading} columns={Columns} data={states} />
      {showModal && (
        <MutationModal
          name={name}
          mutation={(p) =>
            activeCategory
              ? updateState(p as IUpdateCategory)
              : createState(p as ICreateCategory)
          }
          btnLabel={activeCategory ? "Update" : "Create"}
          show={showModal}
          setShow={(val) => setShowModal(val)}
          init={activeCategory ?? undefined}
          clearState={() => setActiveCategory(null)}
        />
      )}
    </div>
  );
};
