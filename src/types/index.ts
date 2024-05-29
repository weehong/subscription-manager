import { Cycle } from "@prisma/client";

export type CurrencyType = {
  [key: string]: CurrencyAttributesType;
};

export type CurrencyAttributesType = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export type Subscription = {
  id?: string;
  name: string;
  cycle: Cycle;
  currency: string;
  price: number;
};
