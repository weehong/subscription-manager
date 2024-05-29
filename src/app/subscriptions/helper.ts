import { Dispatch, SetStateAction } from "react";

import { z } from "zod";

import { currencies } from "@/data/currencies";
import { formSchema } from "@/app/subscriptions/validation";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export const readData = async (url: string) =>
  await fetch(url).then((res) => {
    return res.json();
  });

export const createData = async (
  url: string,
  values: z.infer<typeof formSchema> & { userId: string }
) =>
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

export const updateData = async (
  url: string,
  values: z.infer<typeof formSchema> & { userId: string }
) =>
  await await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

export const deleteData = async (url: string) =>
  await await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateCurrencyFormat = (
  value: string,
  setMoneyFormatter: Dispatch<SetStateAction<Intl.NumberFormat>>
) => {
  const selectedCurrency = Object.values(currencies).find(
    (currency) => currency.code === value
  );

  setMoneyFormatter(() =>
    Intl.NumberFormat("en-US", {
      currency: selectedCurrency!.code,
      currencyDisplay: "code",
      currencySign: "standard",
      style: "currency",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};
