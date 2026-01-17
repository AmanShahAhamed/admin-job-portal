import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

const TableSkeleton: FC<TableSkeletonProps> = ({ rows = 10, cols = 10 }) => {
  return (
    <div className="overflow-hidden rounded-[5px] border border-[#E2E8F0]">
      <div className="bg-[#F2F2F2] w-full flex px-4 py-3">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 w-24 mr-4 rounded" />
        ))}
      </div>

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex px-4 py-3">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 w-24 mr-4 my-2 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
