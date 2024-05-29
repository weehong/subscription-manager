"use client";

import { useState } from "react";

import { Cycle } from "@prisma/client";
import useSWR from "swr";

import { readData } from "@/app/subscriptions/helper";
import { DataTable } from "@/app/subscriptions/data-table";
import { SubscriptionForm } from "@/app/subscriptions/form";

export default function Content() {
  const [formValues, setFormValues] = useState({
    name: "",
    currency: "USD",
    cycle: Cycle.MONTHLY,
    price: 0,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data, mutate, isLoading } =
    useSWR(`/api/subscriptions?page=${page}`, readData) || [];

  return (
    <div className="flex flex-col-reverse gap-y-8 lg:flex-row lg:gap-x-8">
      <DataTable
        data={data}
        mutate={mutate}
        isLoading={isLoading}
        currentPage={page}
        setPagination={setPage}
        setIsEdit={setIsEdit}
        setFormValues={setFormValues}
      />
      <SubscriptionForm
        formValues={formValues}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        mutate={mutate}
      />
    </div>
  );
}
