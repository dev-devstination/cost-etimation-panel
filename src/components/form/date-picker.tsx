import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import {
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"

interface DatePickerProps {
  label?: string
  placeholder?: string
  value?: number
  // eslint-disable-next-line no-unused-vars
  onChange: (value?: number) => void
  description?: string
  disabled?: boolean
  className?: string
}

export const DatePicker = ({
  label,
  value,
  onChange,
  placeholder,
  description,
  disabled,
  className,
}: DatePickerProps) => {
  const locale = useLocale()

  const handleSelectDate = (date?: Date) => {
    const timestamp = date?.getTime()
    onChange(timestamp)
  }

  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] text-left font-normal ltr:pl-3 rtl:pr-3",
                !value && "text-muted-foreground",
                className
              )}
            >
              {value ? format(value, "PPP") : <span>{placeholder}</span>}
              <CalendarIcon className="size-4 opacity-50 ltr:ml-auto rtl:mr-auto" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align={locale === "ar" ? "end" : "start"}
        >
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleSelectDate}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
