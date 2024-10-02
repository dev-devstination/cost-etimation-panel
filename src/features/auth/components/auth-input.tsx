import { useState } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  type: string
  placeholder?: string
  register: UseFormRegister<T>
  error?: string
}

export function AuthInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  register,
  error,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const getIcon = () => {
    switch (name) {
      case "email":
        return <Mail className="size-5 text-muted-foreground" />
      case "password":
      case "password_confirmation":
        return <Lock className="size-5 text-muted-foreground" />
      case "firstName":
      case "lastName":
        return <User className="size-5 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {getIcon()}
        </div>
        <Input
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "px-10 transition-all duration-200 ease-in-out",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          {...register(name)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
