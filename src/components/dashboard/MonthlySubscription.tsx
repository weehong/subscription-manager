"use client";

import { useProfileStore } from "@/app/store/profile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MonthlySubscription() {
  const currency = useProfileStore((state) => state.user.currency);
  const [monthlyBudget, setMonthlyBudget] = useState("");

  useEffect(() => {
    setMonthlyBudget(formatCurrency(currency, Number.MAX_SAFE_INTEGER));
  }, [currency]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Fee</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-ibm-plex-mono text-right">
          <span className="block text-sm md:text-xs">{currency}</span>
          <span className="block break-words font-ibm-plex-mono text-lg md:text-base">
            {monthlyBudget}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
