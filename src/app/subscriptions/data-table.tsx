"use client";

import { useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useSWR from "swr";

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

const fetcher = async (url: string) =>
  await fetch(url).then((res) => {
    return res.json();
  });

export function DataTable() {
  const { data, isLoading } = useSWR("/api/subscriptions", fetcher) || [];

  const table = useReactTable({
    data: useMemo(() => (isLoading ? [] : data), [isLoading, data]),
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border lg:flex-[55%]">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
  );
}
