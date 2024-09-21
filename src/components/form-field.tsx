import { FieldValues, Path, UseFormRegister } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  type: string
  placeholder: string
  register: UseFormRegister<T>
  error?: string
}

export function FormField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  register,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className="w-full rounded-md border px-3 py-2 transition-all hover:ring-1 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
        {...register(name)}
      />
      {error && (
        <Alert variant="destructive" role="alert" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
