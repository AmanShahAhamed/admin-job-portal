import { JSX } from "react";
import TableSkeleton from "../../components/table-style/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export type CustomTableColumn<T extends object> = {
  key: string;
  dataIndex?: keyof T;
  name: string;
  render?: (record: T, value?: T[keyof T]) => JSX.Element;
};

interface ICustomTableProps<T extends object> {
  isLoading: boolean;
  columns: CustomTableColumn<T>[];
  data: T[];
  rowKey?: (record: T, index: number) => string | number;
}

export const CustomTable = <T extends object>({
  isLoading,
  columns,
  data,
  rowKey,
}: ICustomTableProps<T>) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-hidden rounded-[5px] border border-[#E2E8F0]">
      <Table>
        {/* ================= HEADER ================= */}
        <TableHeader className="bg-[#F2F2F2]">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className="px-4 py-3 whitespace-nowrap">
                {col.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {data?.length ? (
            data.map((record, rowIndex) => (
              <TableRow key={rowKey ? rowKey(record, rowIndex) : rowIndex}>
                {columns.map((col) => {
                  const value = col.dataIndex
                    ? record[col.dataIndex]
                    : undefined;

                  return (
                    <TableCell
                      key={col.key}
                      className="px-4 py-3 whitespace-nowrap"
                    >
                      {col.render
                        ? col.render(record, value)
                        : String(value ?? "N/A")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
