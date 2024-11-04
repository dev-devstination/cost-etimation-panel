import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from "@/components/ui/select"
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { SelectOption } from "@/types"

interface SelectProps extends React.ComponentProps<typeof SelectUI> {
  label?: string
  className?: string
  placeholder?: string
  options: SelectOption[]
  description?: string
}

export const Select = ({
  label,
  className,
  placeholder,
  description,
  options,
  ...props
}: SelectProps) => {
  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <SelectUI {...props}>
        <FormControl>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectUI>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
