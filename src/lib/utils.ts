import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPathMatch(currentPath: string, inputPath: string) {
  const escapedCurrentPath = currentPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escapedCurrentPath}(?:\/\\d+)?(?:\/)?$`);
  return regex.test(inputPath);
}

export function formatCurrency(currency: string, amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/[^0-9,.]/g, "");
}
