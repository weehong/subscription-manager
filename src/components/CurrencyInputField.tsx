"use client";

import { useEffect, useReducer } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { get } from "http";

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  moneyFormatter: any;
  disabled?: boolean;
};

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? props.moneyFormatter.format(props.form.getValues()[props.name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return props.moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  const handleChange = (realChangeFn: Function, formattedValue: string) => {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  };

  useEffect(() => {
    setValue(initialValue);

    const digits = initialValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;

    props.form.setValue(props.name, realValue);
    props.form.trigger(props.name);
  }, [initialValue, props.form, props.name]);

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem className="min-w-[200px] max-w-[200px] lg:max-w-full">
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
                disabled={props.disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
