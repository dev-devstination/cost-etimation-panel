import { Switch as SwitchUI } from "@/components/ui/switch"
import {
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from "@/components/ui/form"

interface SwitchProps extends React.ComponentProps<typeof SwitchUI> {
  label?: string
  description?: string
}

export const Switch = ({ label, description, ...props }: SwitchProps) => {
  return (
    <FormItem className="flex flex-row items-center gap-x-2 space-y-0">
      <FormControl>
        <SwitchUI {...props} />
      </FormControl>

      {label && <FormLabel className="mt-0">{label}</FormLabel>}
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  )
}
