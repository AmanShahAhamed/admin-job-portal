import { ICategoryDropdown } from "./category";

export const JobCategoryOptions: Array<ICategoryDropdown> = [
  { label: "All", value: "-1" },
  { label: "Active", value: "0" },
  { label: "Inactive", value: "1" },
];

export const CategoryColumns = ["Id", "Name", "Status", "Action"];
