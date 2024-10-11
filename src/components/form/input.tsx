import React from "react"

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input as InputUI } from "@/components/ui/input"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, ...props }, ref) => {
    return (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <InputUI {...props} ref={ref} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )
  }
)

Input.displayName = "Input"
