import { format } from "date-fns"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { SelectOption } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: number) => {
  return format(new Date(date), "PPP")
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
