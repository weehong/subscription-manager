"use client";

import { useEffect, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cycle } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "@/app/subscriptions/validation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CurrencyInputField from "@/components/CurrencyInputField";
import { currencies } from "@/data/currencies";
import { CurrencyAttributesType } from "@/types";
import {
  createData,
  updateCurrencyFormat,
  updateData,
} from "@/app/subscriptions/helper";

export function SubscriptionForm({
  formValues,
  mutate,
  isEdit,
  setIsEdit,
}: {
  formValues: z.infer<typeof formSchema>;
  mutate: () => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}) {
  const { user } = useUser();
  const [moneyFormatter, setMoneyFormatter] = useState(
    Intl.NumberFormat("en-US", {
      currency: "USD",
      currencyDisplay: "code",
      currencySign: "standard",
      style: "currency",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let res = null;

    if (!isEdit) {
      res = await createData(`/api/subscriptions`, {
        ...values,
        userId: user!.sub!,
      });
    } else {
      res = await updateData(`/api/subscriptions/${formValues.id}`, {
        ...values,
        userId: user!.sub!,
      });
    }

    if (res.ok) {
      setIsEdit(false);
      form.reset({
        id: 0,
        name: "",
        cycle: Cycle.MONTHLY,
        currency: "",
        price: 0,
      });
      mutate();
    }
  };

  useEffect(() => {
    if (isEdit) {
      form.reset({
        id: formValues.id,
        name: formValues.name,
        cycle: Cycle[formValues.cycle as keyof typeof Cycle],
        currency: formValues.currency,
        price: formValues.price,
      });
      updateCurrencyFormat(formValues.currency, setMoneyFormatter);
    }
  }, [
    isEdit,
    form,
    formValues.id,
    formValues.name,
    formValues.price,
    formValues.currency,
    formValues.cycle,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-wrap justify-between lg:space-x-0 lg:space-y-4 lg:flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="min-w-[200px] max-w-[200px] lg:max-w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="min-w-[200px] max-w-[200px] lg:max-w-full">
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    updateCurrencyFormat(value, setMoneyFormatter);

                    return field.onChange(value);
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(currencies).map(
                        (currency: CurrencyAttributesType) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cycle"
          render={({ field }) => (
            <FormItem className="min-w-[200px] max-w-[200px] lg:max-w-full">
              <FormLabel>Billing Cycle</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={Cycle.MONTHLY}>Monthly</SelectItem>
                      <SelectItem value={Cycle.YEARLY}>Yearly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CurrencyInputField
          form={form}
          label="Price"
          name="price"
          placeholder="0.00"
          moneyFormatter={moneyFormatter!}
        />

        <div className="flex flex-row-reverse justify-end gap-x-2 pt-8">
          <Button type="submit">{isEdit ? "Edit" : "Create"}</Button>
          {isEdit && (
            <Button type="button" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
