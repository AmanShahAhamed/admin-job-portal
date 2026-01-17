import { ICategoryList } from "../../../services/job-category/job-category";


type CategoryStatus = "-1" | "0" | "1";

export interface ICategoryDropdown {
  label: string;
  value: CategoryStatus;
}

export type TCategoryListKey = keyof ICategoryList;
export type TCategoryListValue = ICategoryList[TCategoryListKey];


