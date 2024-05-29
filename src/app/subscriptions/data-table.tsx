"use client";

import { Dispatch, SetStateAction, useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/app/subscriptions/column";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Subscription } from "@/types";

export function DataTable({
  data,
  mutate,
  isLoading,
  currentPage,
  setPagination,
  setIsEdit,
  setFormValues,
}: {
  data: Subscription[];
  mutate: () => void;
  isLoading: boolean;
  currentPage: number;
  setPagination: (value: SetStateAction<number>) => void;
  setIsEdit: (value: SetStateAction<boolean>) => void;
  setFormValues: any;
}) {
  const table = useReactTable({
    data: useMemo(() => data || [], [data]),
    columns: columns({
      mutate,
      setIsEdit,
      setFormValues,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col lg:flex-[30%]">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? (
                    <>
                      <Skeleton className="h-[35px] w-full rounded-sm" />
                      <Skeleton className="h-[35px] my-4 w-full rounded-sm" />
                      <Skeleton className="h-[35px] w-full rounded-sm" />
                    </>
                  ) : (
                    "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPagination((prev: number) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPagination((prev: number) => prev + 1)}
          disabled={data && data.length < 15}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
