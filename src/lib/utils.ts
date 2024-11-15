import { format } from "date-fns"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { SelectOption } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: number) => {
  // Convert seconds to milliseconds if needed
  const timestamp = date.toString().length === 10 ? date * 1000 : date
  return format(new Date(timestamp), "PPP")
}

export function generateSelectOptions<T>(
  items: T[],
  { label, value }: { label: keyof T; value: keyof T }
): SelectOption[] {
  return items.map((option) => ({
    label: option[label] as string,
    value: option[value] as string,
  }))
}
