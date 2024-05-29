"use client";

import { Dispatch, SetStateAction } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { z } from "zod";

import { formSchema } from "@/app/subscriptions/validation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { Subscription } from "@/types";
import { deleteData } from "./helper";

type SubscriptionColumnProps = {
  mutate: () => void;
  setIsEdit: (value: boolean) => void;
  setFormValues: (value: z.infer<typeof formSchema>) => void;
};

export const columns = ({
  mutate,
  setIsEdit,
  setFormValues,
}: SubscriptionColumnProps): ColumnDef<Subscription>[] => [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cycle",
    header: "Cycle",
    cell: ({ row }) => (
      <>
        <span className="capitalize">{row.original.cycle.toLowerCase()}</span>
      </>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.currency}</span>
        <span className="font-ibm-plex-mono">
          {formatCurrency(row.original.currency, row.original.price)}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const subscription = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setIsEdit(true);
                setFormValues({
                  id: parseInt(subscription!.id!),
                  name: subscription.name,
                  cycle: subscription.cycle,
                  currency: subscription.currency,
                  price: subscription.price,
                });
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                const res = await deleteData(
                  `/api/subscriptions/${subscription.id!}`
                );
                if (res.ok) {
                  mutate();
                }
              }}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
