import React from "react"

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea as TextareaUI } from "@/components/ui/textarea"

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  description?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, description, ...props }, ref) => {
    return (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <TextareaUI {...props} ref={ref} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )
  }
)

Textarea.displayName = "Textarea"
