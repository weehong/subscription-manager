import { Cycle } from "@prisma/client";
import { z } from "zod";

import { currencies } from "@/data/currencies";

export const formSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  currency: z.enum(["USD", ...Object.keys(currencies)]),
  cycle: z.enum([Cycle.MONTHLY, Cycle.YEARLY]),
  price: z.number(),
});
